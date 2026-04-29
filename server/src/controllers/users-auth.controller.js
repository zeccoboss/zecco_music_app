const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { rolesList } = require("../config/roles-list.config");
const crypto = require("node:crypto");
const { sendVerificationMail } = require("../helpers/mailer.helper");
const UserModel = require("../models/user.model");
const { v4: uuidV4 } = require("uuid");

const {
	cookieOptions,
	clearOptions,
} = require("../helpers/cookie-options.helper");

const handleRegister = async (req, res) => {
	try {
		const { username, email, password } = req.body; // Retrieve user details from req
		const existingEmail = await UserModel.findOne({ email: email });

		if (!username || !password || !email)
			return res.status(400).json({ error: "All fields are required" });

		// Check if email already exist in FB
		if (existingEmail)
			return res.status(409).json({ error: `Email already exist` });

		const token = crypto.randomBytes(32).toString("hex");
		// Hash the generated token for security
		const hashedToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		// Create the admin user with the details from the environment variables and the retrieved image dimensions and sizes
		const user = await UserModel.create({
			uuid: uuidV4(),
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
		const info = await sendVerificationMail(user.email, token);
		console.log("[USER_MAILER] :", info.accepted);

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

		// Check if all fields are provided
		if (!identifier || !password)
			return res.status(400).json({ error: "All fields are required" });

		// Find the user by email or username
		const foundUser = await UserModel.findOne({
			$or: [{ email: identifier }, { username: identifier }],
		});
		if (!foundUser) return res.status(403).json({ error: "No user found" });

		// Check if the password matches
		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) return res.status(403).json({ error: "Incorrect password!" });

		const roles = Object.values(rolesList);

		// Create JWTs
		const accessToken = jwt.sign(
			{ UserInfo: { roles, id: foundUser._id } },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" },
		);

		const refreshToken = jwt.sign(
			{ id: foundUser._id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "7d" },
		);

		// Save refresh token to DB
		foundUser.refreshToken = refreshToken;
		await foundUser.save();

		// Send access token in cookie and response
		res.status(202)
			.cookie("jwt", refreshToken, cookieOptions)
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
