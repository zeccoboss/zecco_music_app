const bcrypt = require("bcrypt");
const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");

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

const getAllUsers = (_req, res) => {
	res.json(usersDB.users);
};

const getUser = (req, res) => {
	const id = req.params.id;
	const foundUser = usersDB.users.find((u) => u.id === id);

	if (!foundUser) {
		console.error({ message: `user with ID: "${id}" not found!` });
		return res
			.status(400)
			.json({ message: `user with ID: "${id}" not found!` });
	}

	console.log({ message: "user found!", user: foundUser });
	res.json({ message: "User found!", user: foundUser });
};

const createUser = async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !password || !email) {
		return res.status(400).json({
			message: "username, email, and password are required!",
		});
	}

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Get id
	const id = uuidv4(); // Generate id of length 5 buh will be updated to 20+ when it's time

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
			video: {
				favorites: [],
				uploaded: [],
				created: [],
			},
			images: {
				profile: "images/default_profile.png",
			},
		},
	};

	// Rewrite users
	usersDB.setUsers([...usersDB.users, newUser]); // Set new user

	// Write the updated user to JSON DB
	await fs.writeFile(
		path.join(__dirname, "..", "models", "users.json"),
		JSON.stringify([...usersDB.users], null, 3)
	);

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
};

const updateUser = (req, res) => {
	const id = req.params.id;
	const user = usersDB.users.find((u) => u.id === id);

	if (!user) {
		console.error({ message: `Coudln't find user with ID: "${id}"!` });
		return res
			.status(400)
			.json({ message: `Coudln't find user with ID: "${id}"!` });
	}

	if (req.body.username) user.username = req.body.username;
	if (req.body.email) user.username = req.body.email;

	const updatedUser = {
		id,
		...user,
	};
	const filteredUsers = usersDB.users.filter((u) => u.id !== user.id);

	usersDB.setUsers([...filteredUsers, updatedUser]);
	saveUsersToDB(usersDB.users, res);

	res.status(200).json({ message: `User with ID: "${id}" updated.` });
};

const deleteUser = (req, res) => {
	const id = req.params.id;
	const foundUser = usersDB.users.find((u) => u.id === id);
	if (!user) {
		console.error({ message: `Coudln't find user with ID: "${id}"!` });
		return res
			.status(400)
			.json({ message: `Coudln't find user with ID: "${id}"!` });
	}

	const filteredUser = usersDB.users.filter((u) => u.id !== foundUser.id);
	saveUsersToDB(filteredUser, res);
	res.status(204);
};

module.exports = { getAllUsers, createUser, deleteUser, updateUser, getUser };
