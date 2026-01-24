function transformMail(mail) {
	if (!mail || !mail.includes("@")) {
		console.error("[Prompt Config:Error] Valid email required!");
		return null;
	}

	const startIndex = 2;
	const name = mail.slice(0, mail.indexOf("@"));
	const protocol = mail.slice(mail.indexOf("@"), mail.indexOf("."));
	const ext = mail.slice(mail.indexOf("."));
	const firstPrt = name.slice(0, startIndex);
	const lastPrt = name.slice(startIndex);
	const hashedPart = lastPrt
		.split("")
		.map((_l, i, a) => (i < a.length - 1 ? "*" : a[i]))
		.join("");

	const email = `${firstPrt}${hashedPart}${protocol}${ext}`;
	return email;
}

const promptsConfig = {
	regFormConn: {
		id: "reg-form-prompt",
		class: "reg_form_prompt",
		title: `Signup success`,
		success: true,
		_mail: null,
		set mail(value) {
			console.log(value);

			if (!value || !value.includes("@")) {
				console.error("[Prompt Config:Error] Not a valid mail!");
				return;
			}
			this._mail = value;
		},
		get mail() {
			return transformMail(this._mail);
		},
		get message() {
			return `Your account was created successfully and a mail has been sent to ${this.mail}.`;
		},
		actions: [
			// { label: "Login", to: "/login" },
			{ label: "Resend email", to: "#" },
		],
	},
};

// const email = "obangezekiel@gmail";
// console.log(transformMail(email));

export default promptsConfig;
