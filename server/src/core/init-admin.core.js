const bcrypt = require("bcrypt");
const { rolesList } = require("../config/roles-list.config");
const Mailer = require("../services/mail.service");
const { v4: uuidV4 } = require("uuid");
const UserModel = require("../models/user.model");
const appConfig = require("../config/app.config");
const ImageModel = require("../models/image.model");
const {
	avaterImageHandler,
	bannerImageHandler,
} = require("../helpers/handle-images.helpers");

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
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(`${process.env.ADMIN_TEST_PASSWORD}`, 10),
			roles: rolesValues,
			verified: true,
			avatarImageId: null,
			coverImageId: null,
			verificationToken: "",
			// verificationTokenExpiry: Date.now(),
			// lasUserVerificationSentAt: Date.now(),
			// lastPasswordVerificationSentAt: Date.now(),
		});

		const avatarConfig = {
			id: admin._id,
			name: "admin-avatar",
			path: appConfig.local.avatarPath,
			format: `image/${imageExt(appConfig.local.avatarPath)}`,
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

		// Create instance to send email
		const adminMailer = new Mailer({
			mailAddress: admin.email,
			subjectContent: "Welcome Modafuka",
			textContent: `Hey modafuka, glad to have you on board, Just want to let you know you've been added as an admin to ZeccoMusicApp, all the best.`,
		});

		// Send a message to the admins email
		// adminMailer.welcomeAdmin(); // Send admin A mail to notify new creation

		console.log("Admin creation process successful!"); // Give confirmation message on success
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = initAdmin;
