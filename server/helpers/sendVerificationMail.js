const { CLIENT } = require("../config/CLIENT");
const Mailer = require("../services/MailService");

function sendVerificationMail(email, token) {
	const mailerArgs = {
		mailAddress: email,
		subjectContent: "Verify your email",
	};
	const verificationMailer = new Mailer(mailerArgs);
	verificationMailer.verificationToken(`${CLIENT.DEV_URL}verify/${token}`);
}

module.exports = { sendVerificationMail };
