const bcrypt = require("bcrypt");
const { rolesList } = require("../config/roles-list.config");
const { v4: uuidV4 } = require("uuid");
const UserModel = require("../models/user.model");
const appConfig = require("../config/app.config");
const {
	avaterImageHandler,
	bannerImageHandler,
} = require("../helpers/handle-images.helpers");
const { welcomeAdmin } = require("../helpers/mailer.helper");
const { transporter } = require("../services/mailer.service");

// Get the image extension by giving file path then use for banner & avater format field
const imageExt = (path) => path.slice(path.lastIndexOf(".") + 1);

const initAdmin = async () => {
	try {
		// Querry if theres an existing admin
		const adminExists = await UserModel.findOne({
			roles: { $in: [rolesList.Admin] },
		});
		// Stop the process if admin is DB
		if (adminExists) return console.log(" Admin already exists!");

		// Get all values of the roles object
		const rolesValues = Object.values(rolesList);

		// Show status of creation
		console.log("Creating Admin...");
		const admin = await UserModel.create({
			uuid: uuidV4(),
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(`${process.env.ADMIN_TEST_PASSWORD}`, 10),
			roles: rolesValues,
			verified: true,
			avatarImageId: null,
			coverImageId: null,
			verificationToken: "",
			verificationTokenExpiry: undefined,
			lasUserVerificationSentAt: undefined,
			lastPasswordVerificationSentAt: undefined,
		});

		const avatarConfig = {
			id: admin._id,
			name: "admin-avatar",
			path: appConfig.local.adminAvatarPath,
			format: `image/${imageExt(appConfig.local.adminAvatarPath)}`,
		};

		const bannerConfig = {
			id: admin._id,
			name: "admin-banner",
			path: appConfig.local.bannerPath,
			format: `image/${imageExt(appConfig.local.bannerPath)}`,
		};

		const [banner, avatar] = await Promise.all([
			avaterImageHandler(avatarConfig),
			bannerImageHandler(bannerConfig),
		]);

		// add the missing id to the admin field
		admin.coverImageId = banner._id;
		admin.avatarImageId = avatar._id;

		// Save the updated field
		await admin.save();

		// Send a message to the admins email
		const info = await welcomeAdmin(admin.email);
		console.log(info.accepted);

		console.log("Admin created successfully!"); // Give confirmation message on success
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = initAdmin;
