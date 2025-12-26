const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs/promises");
const path = require("node:path");

const usersDB = {
	users: require("../models/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const initAdmin = async () => {
	try {
		const adminExists = usersDB.users.find((u) => u.role === "admin");
		if (adminExists) return console.log("Admin already exists!");
		console.log("Creating Admin...");

		const admin = {
			id: uuidv4(),
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(process.env.ADMIN_TEST_PASSWORD, 10),
			role: process.env.ADMIN_ROLL,
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

		usersDB.setUsers([admin, ...usersDB.users]);
		await fs.writeFile(
			path.join(__dirname, "..", "models", "users.json"),
			JSON.stringify([...usersDB.users], null, 3)
		);
		console.log("Admin created!");
	} catch (err) {
		console.error("Error:", err);
	}
};

module.exports = initAdmin;
