const bcrypt = require("bcrypt");
const path = require("node:path");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs/promises");

const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

// Update json file with new data
async function saveUsersToDB(updatedData, res) {
	try {
		await fs.writeFile(
			path.join(__dirname, "..", "model", "users.json"),
			JSON.stringify(updatedData, null, 3)
		);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json(err.message);
	}
}

const handleRegister = async (req, res) => {
	try {
		const { username, email, password } = req.body; // Retrive user details fron req
		// Get duplicate username and email
		const existingUsername = usersDB.users.find(
			(u) => u.username === username
		);
		const existingEmail = usersDB.users.find((u) => u.email === email);
		// Check and return appropraite error message
		if (existingUsername)
			return res.status(409).json({ error: `Username already exist` });
		if (existingEmail)
			return res.status(409).json({ error: `Email already exist` });
		if (!username || !password || !email)
			return res.status(400).json({ error: "All fields are required" });
		const hashedPassword = await bcrypt.hash(password, 10); // Hash given password
		const id = uuidv4(); // Get id
		// Create new user
		const newUser = {
			id,
			username,
			email,
			password: hashedPassword,
			roles: { User: 2442 },
			isVerified: false,
			playlist: [],
			media: {
				audios: { favorites: [], uploaded: [], created: [] },
				videos: { favorites: [], uploaded: [], created: [] },
				images: { profile: "images/users/default_profile.png" },
			},
		};
		usersDB.setUsers([...usersDB.users, newUser]); // Set new user
		// Write the updated user to JSON DB
		saveUsersToDB(usersDB.users, res);
		//
		console.log({ message: "User created succesfully." });
		// Send user back
		res.status(201).json({
			message: "user created successfully",
			user: newUser,
		});
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
		const user = usersDB.users.find(
			(u) => u.username === identifier || u.email === identifier
		);
		// Check if user exist
		if (!user) return res.status(403).json({ error: "No user found" });
		// Check if password match
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(403).json({ error: "Incorrect password!" });
		// Generate access token
		const accessToken = jwt.sign(
			{ username: user.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);
		// Generate refresh token
		const refreshToken = jwt.sign(
			{ username: user.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
		// Manage users
		const currentUser = { ...user, refreshToken }; // Current user from login
		const otherUsers = usersDB.users.filter((u) => u.id !== user.id); // Get the rest users
		usersDB.setUsers([...otherUsers, currentUser]); // Update users
		saveUsersToDB(usersDB.users, res); // Save user to DB
		// Send back processed data
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
		.json({ message: "Logout succesful" });
};

module.exports = { handleLogin, handleRegister, handleLogout };
