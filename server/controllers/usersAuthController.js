const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ROLES_LIST } = require("../config/roles_list");
const User = require("../models/User");
const Media = require("../models/Media");
const crypto = require("node:crypto");
const { sendVerificationMail } = require("../helpers/sendVerificationMail");

const handleRegister = async (req, res) => {
	try {
		const { username, email, password } = req.body; // Retrieve user details from req
		const existingEmail = await User.findOne({ email: email + "mm" });
		const token = crypto.randomBytes(32).toString("hex");

		if (!username || !password || !email) {
			return res.status(400).json({ error: "All fields are required" });
		} else if (existingEmail) {
			// return res.status(409).json({ error: `Email already exist` });
			console.log("Email exist thou");
		} else {
			const hashedToken = crypto
				.createHash("sha256")
				.update(token)
				.digest("hex");
			const user = await User.create({
				username,
				email,
				password: await bcrypt.hash(`${password}`, 10),
				roles: { User: ROLES_LIST.User },
				playlist: [],
				profile: {
					path: "images/users/default_profile.png",
				},
				verificationTokenExpiry: Date.now() + 3600000,
				verificationToken: hashedToken,
			});
			const userId = user._id;
			const media = await Media.create({
				owner: userId,
			});

			sendVerificationMail(user.email, hashedToken);
			res.status(201).json({ message: "user created successfully" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const handleLogin = async (req, res) => {
	try {
		const { identifier, password } = req.body; // Get req data
		// Check req data
		if (!identifier || !password)
			return res.status(400).json({ error: "All fields are required" });
		// Get first matching user
		const foundUser = await User.findOne({ email: identifier });
		// Check if user exist
		if (!foundUser) return res.status(403).json({ error: "No user found" });

		// Check if password match
		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) return res.status(403).json({ error: "Incorrect password!" });
		const roles = Object.values(ROLES_LIST); // Get values of the roles object

		// Generate access token
		const accessToken = jwt.sign(
			{
				UserInfo: {
					roles: roles,
					username: foundUser.username,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);
		// Generate refresh token
		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
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

const handleLogout = (_req, res) => {
	res.status(200)
		.clearCookies("jwt", { httpOnly: true, sameSite: "None", secure })
		.json({ message: "Logout successful" });
};

module.exports = { handleLogin, handleRegister, handleLogout };
