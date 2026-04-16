const crypto = require("node:crypto");
const UserModel = require("../models/user.model");
const {
	sendVerificationMail,
} = require("../helpers/send-verification-mail.helpers");

const handleVerifyEmail = async (req, res) => {
	const { token } = req.params; // raw token from the email link

	// Hash it and look it up
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

	const user = await UserModel.findOne({
		verificationToken: hashedToken,
		verificationTokenExpiry: { $gt: Date.now() },
	});

	if (!user)
		return res.status(400).json({ error: "Invalid or expired token" });

	user.verified = true;
	user.verificationToken = undefined;
	user.verificationTokenExpiry = undefined;
	await user.save();

	res.status(200).json({ message: "Email verified successfully" });
};

const handleResendEmailVerification = async (req, res) => {
	const user = await UserModel.findOne({ email: req.body.email });

	if (!user) return res.status(404).json({ error: "User not found" });
	if (user?.verified) res.status(400).json({ error: "Already verified" });

	const cooldown = 60 * 1000; // 1 minutes between resend
	const timeLastSent = Date.now() - user.lastUserVerificationSentAt;

	if (timeLastSent < cooldown)
		return res.status(429).json({
			error: "Please wait before requesting another email",
		});

	// Generate a fresh token
	const token = crypto.randomBytes(32).toString("hex");
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

	user.verificationToken = hashedToken;
	user.verificationTokenExpiry = Date.now() + 3600000;
	user.lastUserVerificationSentAt = Date.now();

	await user.save();

	// call Send verification email
	sendVerificationMail(user.email, token);
	res.status(200).json({ message: "Verification email resent" });
};

module.exports = { handleVerifyEmail, handleResendEmailVerification };
