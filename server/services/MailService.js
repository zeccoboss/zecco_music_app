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

	verificationToken(verificationUrl) {
		this.mailOptions.html = `<p>Click <a href="${verificationUrl}">here</a> to verify your account</p>`;
		this.#sendMail(this.mailOptions);
	}

	welcomeAdmin() {
		this.#sendMail(this.mailOptions);
	}
}

module.exports = Mailer;
