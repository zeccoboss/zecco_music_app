const nodemailer = require("nodemailer");

class Mailer {
	constructor({ mailAddress, subjectContent, textContent, htmlContent }) {
		this.email = mailAddress;
		this.subject = subjectContent;
		this.html = htmlContent;
		this.text = textContent;

		// Define default va;lues for mail options
		this.mailOptions = {
			from: process.env.MAIL_USER,
			to: this.email,
			subject: this.subject,
			text: this.text,
		};
	}

	#transporter = new nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_APP_PASSWORD,
		},
	});

	#sendMail(mailOptions) {
		this.#transporter.sendMail(mailOptions, (err, info) => {
			if (err) return console.error(`[ERROR]: ${err}`);
			console.log(`Email sent: ${info.response}`);
		});
	}

	//
	verificationToken(verificationUrl) {
		this.mailOptions.html = `<p>Click <a href="${verificationUrl}">here</a> to verify your account</p>`;
		this.#sendMail(this.mailOptions);
		return this.mailOptions.html;
	}

	//
	welcomeAdmin() {
		this.#sendMail(this.mailOptions);
		const adminMailer = new Mailer({
			mailAddress: admin.email,
			subjectContent: "Welcome Modafuka",
			textContent: `Hey modafuka, glad to have you on board, Just want to let you know you've been added as an admin to ZeccoMusicApp, all the best.`,
		});
	}
}

module.exports = Mailer;
