const bcrypt = require("bcrypt");
const { rolesList } = require("../config/roles-list.config");
const { v4: uuidV4 } = require("uuid");
const UserModel = require("../models/user.model");
const appConfig = require("../config/app.config");
const {
	avaterImageHandler,
	bannerImageHandler,
	getImageExtension,
} = require("../helpers/handle-images.helpers");
const { welcomeAdmin } = require("../helpers/mailer.helper");
const {
	getLocalMediaSize,
	getLocalImageDimensions,
} = require("../helpers/media.helpers");
const SettingsModel = require("../models/settings.model");

const initAdmin = async () => {
	try {
		// Query if theres an existing admin
		const adminExists = await UserModel.findOne({
			roles: { $in: [rolesList.Admin] },
		});
		// Stop the process if admin is DB
		if (adminExists) return console.log(" Admin already exists!");

		// Get the keys for the admin avatar and banner images from the app config
		const adminAvatarKey = appConfig.local.adminAvatarKey;
		const adminBannerKey = appConfig.local.bannerKey;

		// Get dimensions of the admin avatar and banner images
		const adminAvatarDimensions =
			await getLocalImageDimensions(adminAvatarKey);
		const adminBannerDimensions =
			await getLocalImageDimensions(adminBannerKey);

		// Check if dimensions were successfully retrieved before proceeding
		if (!adminAvatarDimensions || !adminBannerDimensions) {
			console.error(
				"Error retrieving image dimensions. Please check the image paths and formats.",
			);
			return;
		}

		// Get all values of the roles object
		const rolesValues = Object.values(rolesList);

		// Show status of creation
		console.log("Creating Admin...");

		// Create the admin user with the details from the environment variables and the retrieved image dimensions and sizes
		const admin = await UserModel.create({
			uuid: uuidV4(),
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10),
			roles: rolesValues,
			verified: true,
			avatar: null,
			cover: null,
			verificationToken: "",
			verificationTokenExpiry: undefined,
			lasUserVerificationSentAt: undefined,
			lastPasswordVerificationSentAt: undefined,
		});

		// Prepare the configuration for the admin avatar and banner images using the retrieved dimensions and sizes
		const avatarConfig = {
			user: admin._id,
			format: `image/${getImageExtension(adminAvatarKey)}`,
			size: getLocalMediaSize(adminAvatarKey),
			dimensions: adminAvatarDimensions,
			storage: {
				key: adminAvatarKey,
				baseUrl: appConfig.base,
				type: "local",
			},
		};
		const bannerConfig = {
			user: admin._id,
			format: `image/${getImageExtension(adminBannerKey)}`,
			size: getLocalMediaSize(adminBannerKey),
			dimensions: adminBannerDimensions,
			storage: {
				key: adminBannerKey,
				baseUrl: appConfig.base,
				type: "local",
			},
		};

		// Create the admin avatar and banner images using the prepared configuration and retrieve the created image documents to get their ids for the admin document
		const [banner, avatar] = await Promise.all([
			avaterImageHandler(avatarConfig),
			bannerImageHandler(bannerConfig),
		]);

		// add the missing id to the admin field
		admin.cover = banner._id;
		admin.avatar = avatar._id;

		// Create default settings for the new user
		const newSettings = await SettingsModel.create({ user: admin._id });
		admin.settingsId = newSettings._id;

		// Save the updated field
		await admin.save();

		// Send a message to the admins email
		const info = await welcomeAdmin(admin.email);
		console.log("[ADMIN_MAILER] :", info.accepted);

		console.log("Admin created successfully!"); // Give confirmation message on success
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = { initAdmin };
