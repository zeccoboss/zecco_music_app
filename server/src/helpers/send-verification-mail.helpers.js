const appConfig = require("../config/app.config");
const Mailer = require("../services/mail.service");

function sendVerificationMail(email, token) {
	const mailerArgs = {
		mailAddress: email,
		subjectContent: "Verify your email",
	};
	const verificationMailer = new Mailer(mailerArgs);
	verificationMailer.verificationToken(
		`${appConfig.client}user/verify/${token}`,
	);
}

// /auth/verify/:token
module.exports = { sendVerificationMail };
