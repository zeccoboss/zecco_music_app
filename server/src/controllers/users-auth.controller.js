const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { rolesList } = require("../config/roles-list.config");
const crypto = require("node:crypto");
const {
	sendVerificationMail,
} = require("../helpers/send-verification-mail.helpers");
const appConfig = require("../config/app.config");
const UserModel = require("../models/user.model");

const handleRegister = async (req, res) => {
	const { username, email, password } = req.body; // Retrieve user details from req
	const existingEmail = await UserModel.findOne({ email: email });

	if (!username || !password || !email)
		return res.status(400).json({ error: "All fields are required" });

	try {
		// Check if email already exist in FB
		if (existingEmail)
			return res.status(409).json({ error: `Email already exist` });

		const token = crypto.randomBytes(32).toString("hex");
		// Hash the generated token for security
		const hashedToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		// Create new user
		const user = await UserModel.create({
			username,
			email,
			password: await bcrypt.hash(`${password}`, 10),
			roles: [rolesList.User],
			verified: false,
			avatarImageId: null,
			coverImageId: null,
			verificationTokenExpiry: Date.now() + 3600000,
			verificationToken: hashedToken,
			lastUserVerificationSentAt: Date.now(),
		});

		// call Send verification email
		sendVerificationMail(user.email, token);

		res.status(201).json({
			message: "user created, check your email for verification...",
			email: user.email,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const handleLogin = async (req, res) => {
	try {
		const { identifier, password } = req.body;

		if (!identifier || !password)
			return res.status(400).json({ error: "All fields are required" });

		const foundUser = await UserModel.findOne({ email: identifier });
		if (!foundUser) return res.status(403).json({ error: "No user found" });

		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) return res.status(403).json({ error: "Incorrect password!" });

		const roles = Object.values(rolesList);

		const accessToken = jwt.sign(
			{ UserInfo: { roles, id: foundUser._id } },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" },
		);

		const refreshToken = jwt.sign(
			{ id: foundUser._id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" },
		);

		// Save refresh token to DB
		foundUser.refreshToken = refreshToken;
		await foundUser.save();

		res.status(202)
			.cookie("jwt", refreshToken, {
				httpOnly: true,
				path: "/",
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
				sameSite: "None",
			})
			.json({ accessToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const handleLogout = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;
	const user = await UserModel.findOne({ refreshToken });

	const clearOptions = {
		httpOnly: true,
		sameSite: "None", // matches login
		secure: true,
	};

	if (!user) {
		res.clearCookie("jwt", clearOptions);
		return res.sendStatus(204);
	}

	user.refreshToken = null;
	await user.save();

	res.clearCookie("jwt", clearOptions);
	res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { handleLogin, handleRegister, handleLogout };
