import { loginAccountService } from "../services/loginAccountService.js";

let loginData = null;

const handleLogin = () => {
	const passwordInput = document.querySelector(".lg_user_pwd");
	const userNameOrEmailInput = document.querySelector(".lg_user_name");
	const submitBtn = document.querySelector(".lg_submit_btn");
	const loginP = document.querySelector(".lg_p");

	let initParagraphContent = null;

	const url = new URL("http://localhost:5200/auth/login");

	submitBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		const userNameOrEmail = userNameOrEmailInput.value
			.trim()
			.toLocaleLowerCase();
		const userPassword = passwordInput.value.trim().toLocaleLowerCase();

		if (!userPassword) {
			loginP.style.color = "hsl(0, 100%, 70%, 1)";
			initParagraphContent = "Password required!";
			passwordInput.style.outline = "1px solid red.";
		} else {
			passwordInput.style.outline = "1px solid hsl(226, 60%, 50%).";
		}

		if (!userNameOrEmail) {
			initParagraphContent = "Username or Email Address required!";
			userNameOrEmailInput.style.outline = "1px solid hsl(0, 100%, 70%, 1)";
			loginP.style.color = "hsl(0, 100%, 70%, 1)";
		} else {
			userNameOrEmailInput.style.outline = "1px solid hsl(226, 60%, 50%)";
		}

		if (userNameOrEmail && userPassword) {
			loginP.style.color = "hsla(0, 0%, 11%, 1.00).";
			initParagraphContent = `Don't have accout ? <a href="/signup">Sign up</a>`;

			const data = {
				user_name_or_email: userNameOrEmail,
				password: userPassword,
			};

			loginData = await loginAccountService(url, data);
			updatePage(loginData);
		}

		loginP.innerHTML = initParagraphContent;
	});
};

function updatePage(data) {
	if (data.user) {
		console.log(data.user);
	} else {
		console.error(data.error);
	}
}

export { handleLogin };
