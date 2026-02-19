const bcrypt = require("bcrypt");
const { rolesList } = require("../config/roles-list.config");
const Mailer = require("../services/mail.service");
const MinIOService = require("../services/minio.service");
const { v4: uuidV4 } = require("uuid");
const path = require("node:path");
const UserModel = require("../models/user.model");

const initAdmin = async () => {
	// const imgPath = path.join(
	// 	__dirname,
	// 	"..",
	// 	"public",
	// 	"images",
	// 	"admin-avatar.png",
	// );

	try {
		const adminExists = await UserModel.findOne({
			"roles.Admin": rolesList.Admin,
		});
		if (adminExists) return console.log(" Admin already exists!");
		const uploadProfile = new MinIOService("image-files", "image/jpeg");

		const profileUrl = await uploadProfile.uploadProfileImg({
			fileName: uuidV4(),
			extension: "jpeg",
			path: imgPath,
			flag: "Path",
		});

		console.log("Creating Admin...");
		const x = await User.create({
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(`${process.env.ADMIN_TEST_PASSWORD}`, 10),
			roles: { ...ROLES_LIST },
			verified: true,

			verificationToken: null,
			verificationTokenExpiry: null,
		});

		const admin = await User.create({
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(`${process.env.ADMIN_TEST_PASSWORD}`, 10),
			roles: { ...rolesList },
			verified: true,

			refreshToken: "",
			avatarImageId: { type: String, required: false },
			coverImageId: { type: String, required: false },
			playlistIds: [],
			verificationToken: String,
			verificationTokenExpiry: Date,
			lasUserVerificationSentAt: Date,
			lastPasswordVerificationSentAt: Date,
		});

		const ownerId = admin._id;

		const banner = await ImageModel.create({
			ownerId,
			name: coverName,
			category: "cover",
			path: coverPath,
			format: cover?.format,
			createdAt: Date.now(),
		});

		const avatar = await ImageModel.create({
			ownerId,
			name: coverName,
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

		const userId = admin._id;
		const media = await UserMedia.create({
			owner: userId,
		});

		// adminMailer.welcomeAdmin();
		console.log("Admin created successfully!");
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = initAdmin;
