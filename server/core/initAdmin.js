const bcrypt = require("bcrypt");
const { ROLES_LIST } = require("../config/roles_list");
const User = require("../models/User");
const UserMedia = require("../models/UserMedia");
const Mailer = require("../services/MailService");

const initAdmin = async () => {
	try {
		const adminExists = await User.findOne({
			"roles.Admin": ROLES_LIST.Admin,
		});
		if (adminExists) return console.log(" Admin already exists!");
		console.log("Creating Admin...");
		const admin = await User.create({
			fullname: process.env.ADMIN_FULLNAME,
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			password: await bcrypt.hash(`${process.env.ADMIN_TEST_PASSWORD}`, 10),
			roles: { ...ROLES_LIST },
			isVerified: true,
			playlist: [],
			profile: {
				path: "http://localhost:7830/images/admin/admin_img.PNG",
			},
			verificationToken: undefined,
			verificationTokenExpiry: undefined,
		});
		const adminMailer = new Mailer({
			mailAddress: admin.email,
			subjectContent: "Welcome Modafuka",
			textContent: `Hey modafuka, glad to have you on board, Just want to let you know you've been added as an admin to ZeccoMusicApp, all the best.`,
		});
		console.log(admin);

		const userId = admin._id;
		const media = await UserMedia.create({
			owner: userId,
		});
		adminMailer.welcomeAdmin();
		console.log("Admin created successfully!");
	} catch (err) {
		console.error("error:", err);
	}
};

module.exports = initAdmin;
