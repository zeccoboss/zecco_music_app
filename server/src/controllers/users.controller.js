const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

// GET /users
const getAllUsers = async (_req, res) => {
	try {
		const users = await UserModel.find().select(
			"-password -refreshToken -verificationToken",
		);
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// GET /users/:id
const getUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await UserModel.findById(id).select(
			"-password -refreshToken -verificationToken",
		);

		if (!user)
			return res
				.status(404)
				.json({ error: `User with ID: "${id}" not found` });

		res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// POST /users  (admin creates a user directly, no verification flow)
const createUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password)
			return res
				.status(400)
				.json({ error: "username, email, and password are required" });

		const existingEmail = await UserModel.findOne({ email });
		if (existingEmail)
			return res.status(409).json({ error: "Email already exists" });

		const user = await UserModel.create({
			username,
			email,
			password: await bcrypt.hash(password, 10),
			roles: ["user"],
			verified: true, // admin-created users skip verification
			avatarImageId: null,
			coverImageId: null,
		});

		res.status(201).json({
			message: "User created successfully",
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// PATCH /users/:id
const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email } = req.body;

		const user = await UserModel.findById(id);
		if (!user)
			return res
				.status(404)
				.json({ error: `User with ID: "${id}" not found` });

		// Check new email isn't already taken by someone else
		if (email && email !== user.email) {
			const emailTaken = await UserModel.findOne({ email });
			if (emailTaken)
				return res.status(409).json({ error: "Email already in use" });
			user.email = email;
		}

		if (username) user.username = username;

		await user.save();

		res.status(200).json({
			message: `User with ID: "${id}" updated`,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await UserModel.findByIdAndDelete(id);
		if (!user)
			return res
				.status(404)
				.json({ error: `User with ID: "${id}" not found` });

		res.status(200).json({ message: `User with ID: "${id}" deleted` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
module.exports = { getAllUsers, createUser, deleteUser, updateUser, getUser };
