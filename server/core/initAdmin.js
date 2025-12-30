const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs/promises");
const path = require("node:path");
const { ROLES_LIST } = require("../config/roles_list");

const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (users) {
		this.users = users;
	},
};

const initAdmin = async () => {
	try {
		const adminExists = usersDB.users.find((user) =>
			Object.values(user.roles).includes(ROLES_LIST.Admin)
		);
		if (adminExists) return console.log("Admin already exists!");
		console.log("Creating Admin...");
		const admin = {
			id: uuidv4(),
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(process.env.ADMIN_TEST_PASSWORD, 10),
			roles: { ...ROLES_LIST },
			isVerified: true,
			playlist: [],
			media: {
				audios: { favorites: [], uploaded: [], created: [] },
				videos: { favorites: [], uploaded: [], created: [] },
				images: { profile: "images/admin/admin_img.PNG" },
			},
		};
		usersDB.setUsers([admin, ...usersDB.users]);
		await fs.writeFile(
			path.join(__dirname, "..", "model", "users.json"),
			JSON.stringify([...usersDB.users], null, 3)
		);
		console.log("Admin created!");
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = initAdmin;
