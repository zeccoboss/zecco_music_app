import { signupAccountService } from "../services/signupAccountService.js";

const handleSignup = async () => {
	const signupUsernameInput = document.querySelector(".signup_username");
	const signupEmailInput = document.querySelector(".signup_email");

	const createPwdInput = document.querySelector("#create-pwd-input");
	const confirmPwdInput = document.querySelector("#confirm-pwd-input");

	const signupP = document.querySelector(".su_p");

	const submitBtn = document.querySelector(".signup_submit_btn");

	// let initParagraphContent = null;

	const url = new URL("http://localhost:5200/register");
	const inputErrorBorder = `hsl(0, 100%, 70%, 1)`;

	function validatePassword() {
		const userCrtPassword = createPwdInput.value.trim().toLocaleLowerCase();
		const userCfmPassword = confirmPwdInput.value.trim().toLocaleLowerCase();
		const pwdMinLength = 8;

		//  || userCfmPassword < pwdMinLength
		if (userCrtPassword.length < pwdMinLength) {
			signupP.innerHTML = `Password must be more than ${pwdMinLength} characters!`;
			signupP.style.color = `${inputErrorBorder}`;
			createPwdInput.style.outline = `1px solid ${inputErrorBorder}`;
			confirmPwdInput.style.outline = `1px solid ${inputErrorBorder}`;
			return;
		} else {
			signupP.style.color = "hsl(0, 0%, 90%)";
			createPwdInput.style.outline = "1px solid hsl(226, 60%, 50%)";
			confirmPwdInput.style.outline = "1px solid hsl(226, 60%, 50%)";
		}

		if (userCrtPassword !== userCfmPassword) {
			signupP.innerHTML = `Password don't match`;
			signupP.style.color = `${inputErrorBorder}`;
			createPwdInput.style.outline = `1px solid ${inputErrorBorder}`;
			confirmPwdInput.style.outline = `1px solid ${inputErrorBorder}`;
			return;
		} else {
			signupP.style.color = "hsl(0, 0%, 90%)";
			createPwdInput.style.outline = "1px solid hsl(226, 60%, 50%)";
			confirmPwdInput.style.outline = "1px solid hsl(226, 60%, 50%)";
		}
	}

	createPwdInput.addEventListener("input", validatePassword);
	confirmPwdInput.addEventListener("input", validatePassword);

	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const useremail = signupEmailInput.value.trim().toLocaleLowerCase();
		const username = signupUsernameInput.value.trim().toLocaleLowerCase();

		if (!username) {
			signupP.style.color = `${inputErrorBorder}`;
			signupP.innerHTML = "Username required!";
			signupUsernameInput.style.outline = `1px solid ${inputErrorBorder}`;
			return;
		} else {
			signupUsernameInput.style.outline = "1px solid hsl(226, 60%, 50%)";
		}

		if (!useremail) {
			signupP.innerHTML = "Email Address required!";
			signupEmailInput.style.outline = `1px solid ${inputErrorBorder}`;
			signupP.style.color = `${inputErrorBorder}`;
			return;
		} else {
			signupEmailInput.style.outline = "1px solid hsl(226, 60%, 50%)";
		}

		if (!createPwdInput.value.trim() || !confirmPwdInput.value.trim()) {
			signupP.innerHTML = `Password is required!`;
			signupP.style.color = `${inputErrorBorder}`;
			createPwdInput.style.outline = `1px solid ${inputErrorBorder}`;
			confirmPwdInput.style.outline = `1px solid ${inputErrorBorder}`;
			return;
		}

		const pwd = createPwdInput.value.trim().toLocaleLowerCase();

		if (
			(username && useremail && createPwdInput.value.trim()) ===
			confirmPwdInput.value.trim()
		) {
			signupP.style.color = "hsl(0, 0%, 90%)";
			signupP.innerHTML = `Don't have accout ? <a href="/signup">Sign up</a>`;

			const data = {
				email: useremail,
				username: username,
				password: pwd,
			};

			signupAccountService(url, data);
		}

		//  = initParagraphContent;
	});
};

export { handleSignup };
