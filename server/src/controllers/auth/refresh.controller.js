const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
const { cookieOptions } = require("../../helpers/cookie-options.helper");

const handleRefreshToken = async (req, res) => {
	const refreshToken = req.cookies?.jwt;

	if (!refreshToken) {
		return res
			.status(401)
			.json({ success: false, message: "No refresh token" });
	}

	try {
		// Find user by refresh token stored in DB
		const user = await UserModel.findOne({ refreshToken }).select(
			"-password -verificationToken -passwordVerificationToken",
		);

		if (!user) {
			// Token not in DB — could be reuse attack, clear cookie
			res.clearCookie("jwt", {
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
			});
			return res.status(403).json({ success: false, message: "Forbidden" });
		}

		// Verify the token cryptographically
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, decoded) => {
				if (err || user._id.toString() !== decoded.id) {
					return res
						.status(403)
						.json({ success: false, message: "Forbidden" });
				}

				// ── Issue new access token ─────────────────────────────────────────
				const newAccessToken = jwt.sign(
					{ UserInfo: { id: user._id, roles: user.roles } },
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "15m" },
				);

				// ── Rotate refresh token (issue a new one, invalidate old) ─────────
				const newRefreshToken = jwt.sign(
					{ id: user._id },
					process.env.REFRESH_TOKEN_SECRET,
					{ expiresIn: "7d" },
				);

				// Save new refresh token to DB
				user.refreshToken = newRefreshToken;
				await user.save();

				// Set new refresh token in cookie
				res.cookie("jwt", newRefreshToken, cookieOptions);

				return res.status(200).json({
					success: true,
					accessToken: newAccessToken,
				});
			},
		);
	} catch (err) {
		console.error("[Refresh] handleRefreshToken:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

module.exports = { handleRefreshToken };
