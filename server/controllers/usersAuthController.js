const bcrypt = require("bcrypt");
const path = require("node:path");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const fs = require("node:fs/promises");

const usersDB = {
	users: require("../models/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

// Update json file with new data
async function saveUsersToDB(updatedData, res) {
	try {
		await fs.writeFile(
			path.join(__dirname, "..", "models", "users.json"),
			JSON.stringify(updatedData, null, 3)
		);
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json(err.message);
	}
}

const handleRegister = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const userExist = usersDB.users.find((u) => u.username === username);
		if (userExist) return res.status(409).json({ message: `username exist` });

		if (!username || !password || !email)
			return res.status(400).json({ message: "all fields are required" });

		const hashedPassword = await bcrypt.hash(password, 10);

		// Get id
		// const id = uuidv4(); // Generate id of length 5 buh will be updated to 20+ when it's time
		const id = nanoid(4); // To be deleted later need short id for now to test routes

		// Create new user
		const newUser = {
			id,
			username,
			email,
			password: hashedPassword,
			roll: "user",
			media: {
				audios: {
					favorites: [],
					uploaded: [],
					created: [],
				},
				videos: {
					favorites: [],
					uploaded: [],
					created: [],
				},
				images: {
					profile: "images/default_profile.png",
				},
			},
		};

		const accessToken = jwt.sign(
			{ username: newUser.username },
			process.env.ACCESS_TOKEN,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ username: newUser.username },
			process.env.REFRESH_TOKEN,
			{ expiresIn: "15m" }
		);

		// Rewrite users
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
		res.status(500).json({ message: error.message });
	}
};

const handleLogin = async (req, res) => {
	try {
		const { identifier, password } = req.body;
		if (!identifier || !password)
			return res.status(400).json({ message: "all fields are required" });

		const user = usersDB.users.find(
			(u) => u.username === identifier || u.email === identifier
		);

		// Check if user exist
		if (!user) return res.status(403).json({ message: "no user found" });

		// Check if password match
		const match = await bcrypt.compare(password, user.password);
		if (!match)
			return res.status(403).json({ message: "passwords don't match" });

		const accessToken = jwt.sign(
			{ username: user.username },
			process.env.ACCESS_TOKEN,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ username: user.username },
			process.env.REFRESH_TOKEN,
			{ expiresIn: "5d" }
		);

		// Current user from login
		const currentUser = {
			...user,
			refreshToken,
		};

		// Get the rest users
		const otherUsers = usersDB.users.filter((u) => u.id !== user.id);

		// Update users
		usersDB.setUsers([...otherUsers, currentUser]);

		// Save user to DB
		saveUsersToDB(usersDB.users, res);

		res.status(202).json({
			message: "user logged in successfully",
			user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const handleLogout = (req, res) => {};

module.exports = { handleLogin, handleRegister, handleLogout };
