const bcrypt = require("bcrypt");
const path = require("node:path");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const usersDB = {
	users: require("../models/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

// Update json file with new data
async function saveUsersToDB(updatedData, res) {
	try {
		await fsPromises.writeFile(
			path.join(__dirname, "..", "models", "users.json"),
			JSON.stringify(updatedData, null, 3)
		);
	} catch (err) {
		console.error("Error:", err);
		res.status(500).json(err.message);
	}
}

const handleRegister = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !password || !email) {
			return res.status(400).json({
				error: "username, email, and password are required!",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		// Get id
		// const id = uuidv4(); // Generate id of length 5 buh will be updated to 20+ when it's time
		const id = nanoid(4); // To be deleted later need short id for now to test routes

		const accessToken = jwt.sign(
			{ username: foundUser.username },
			process.env.ACCESS_TOKEN,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN,
			{ expiresIn: "15m" }
		);

		// Create new user
		const newUser = {
			id,
			username,
			email,
			password: hashedPassword,
			roll: "user",
		};

		// Rewrite users
		usersDB.setUsers([...usersDB.users, newUser]); // Set new user

		// Write the updated user to JSON DB
		saveUsersToDB(usersDB.users, res);

		//
		console.log({
			message: "User created succesfully.",
			user: {
				user: { id, username, email },
			},
		});

		// Send user back
		res.status(201).json({
			message: "user logged in successfully",
			user: { id, username, email },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const handleLogin = async (req, res) => {
	try {
		const { user_name_or_email, password } = req.body;
		const foundUser = userDB.users.find(
			(u) =>
				u.username === user_name_or_email || u.email === user_name_or_email
		);

		// Check if user exist
		if (!foundUser) return res.sendStatus(403);

		// Check if password match
		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) return res.sendStatus(403);

		const accessToken = jwt.sign(
			{ username: foundUser.username },
			process.env.ACCESS_TOKEN,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN,
			{ expiresIn: "5d" }
		);

		// Current user from login
		const currentUser = {
			...foundUser,
			refreshToken,
		};

		// Get the rest users
		const otherUsers = userDB.users.filter((u) => u.id !== foundUser.id);

		// Update users
		userDB.setUsers([...otherUsers, currentUser]);

		// Save user to DB
		saveUsersToDB(userDB.users, res);

		res.status(202).json({
			message: "user logged in successfully",
			user: foundUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

const handleLogout = (req, res) => {};

module.exports = { handleLogin, handleRegister, handleLogout };
