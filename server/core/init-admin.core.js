const bcrypt = require("bcrypt");
const { rolesList } = require("../config/roles-list.config");
const Mailer = require("../services/mail.service");
const { v4: uuidV4 } = require("uuid");
const UserModel = require("../models/user.model");
const appConfig = require("../config/app.config");
const ImageModel = require("../models/image.model");

const initAdmin = async () => {
	try {
		const adminExists = await UserModel.findOne({
			"roles.Admin": rolesList.Admin,
		});
		if (adminExists) return console.log(" Admin already exists!");

		console.log("Creating Admin...");
		const admin = await UserModel.create({
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			createdAt: appConfig.date(),
			password: await bcrypt.hash(`${process.env.ADMIN_TEST_PASSWORD}`, 10),
			roles: { ...rolesList },
			verified: true,
			refreshToken: "",
			avatarImageId: null,
			coverImageId: null,
			playlistIds: [],
			verificationToken: "",
			// verificationTokenExpiry: Date.now(),
			// lasUserVerificationSentAt: Date.now(),
			// lastPasswordVerificationSentAt: Date.now(),
		});

		const banner = await ImageModel.create({
			ownerId: admin._id,
			name: appConfig.imageName("banner"),
			category: "cover",
			path: coverPath,
			format: cover?.format,
			createdAt: Date.now(),
		});

		const avatar = await ImageModel.create({
			ownerId: admin._id,
			name: appConfig.imageName("avatar"),
			category: "cover",
			path: coverPath,
			format: cover?.format,
			createdAt: Date.now(),
		});

		const adminMailer = new Mailer({
			mailAddress: admin.email,
			subjectContent: "Welcome Modafuka",
			textContent: `Hey modafuka, glad to have you on board, Just want to let you know you've been added as an admin to ZeccoMusicApp, all the best.`,
		});

		// adminMailer.welcomeAdmin(); // Send admin A mail to notify new creation
		console.log("Admin created successfully!");
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = initAdmin;
