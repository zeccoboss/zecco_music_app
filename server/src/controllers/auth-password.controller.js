const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const UserModel = require("../models/user.model");
const {
	sendVerificationMail,
} = require("../helpers/send-verification-mail.helpers");

const handleForgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email)
			return res.status(400).json({ error: "No or invalid email address" });

		const user = await UserModel.findOne({ email });
		if (!user) return res.status(404).json({ error: "User not found" });
		if (!user.verified)
			return res.status(400).json({ error: "User not verified" });

		const token = crypto.randomBytes(32).toString("hex");
		const hashedToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		user.passwordVerificationToken = hashedToken;
		user.passwordVerificationTokenExpiry = Date.now() + 5 * 60 * 1000;
		user.lastPasswordVerificationSentAt = Date.now();

		await user.save();

		sendVerificationMail(email, token); // To be removed later

		// sendPasswordResetMail(email, token);
		res.status(200).json({ message: "Password reset email sent" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Password reset failed" });
	}
};

const handleResetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		if (!password)
			return res.status(400).json({ error: "Password required" });

		const hashedToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		const user = await UserModel.findOne({
			passwordVerificationToken: hashedToken,
			passwordVerificationTokenExpiry: { $gt: Date.now() },
		});

		if (!user)
			return res.status(400).json({ error: "Invalid or expired token" });
		if (!user.verified)
			return res.status(400).json({
				error: "Unverified account, complete registration process",
			});

		user.password = await bcrypt.hash(password, 10);
		user.passwordVerificationToken = undefined;
		user.passwordVerificationTokenExpiry = undefined;

		await user.save();

		res.status(200).json({ message: "Password reset successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Password reset failed" });
	}
};

module.exports = { handleResetPassword, handleForgotPassword };
