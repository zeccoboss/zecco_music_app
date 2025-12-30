import { buttonLoadingSpinner } from "../components/ButtonLoadingSpinner.js";
import { showFormFeed } from "../helpers/showFormFeed.js";
import { signupAccountService } from "../services/signupAccountService.js";
import CreateElement from "../utils/CreateElement.js";

const validateRegister = async () => {
	// Select element
	const nextBtn = document.querySelector("#signup-next-btn");
	const submitBtn = document.querySelector("#signup-submit-btn");
	const returnBtn = document.querySelector("#signup-return-btn");
	const userDetContainer = document.querySelector(".user_details_container");
	const userPwdContainer = document.querySelector(".user_password_container");

	const signupUsernameInput = document.querySelector(".signup_username");
	const signupEmailInput = document.querySelector(".signup_email");

	const createPwdInput = document.querySelector("#create-pwd-input");
	const confirmPwdInput = document.querySelector("#confirm-pwd-input");

	// Create element that holds feed for form validation
	const feedHolder = new CreateElement("span", "Feed holder");
	feedHolder.addClass("feed_holder");

	const url = new URL("http://localhost:5200/auth/register");
	const inputErrorBorder = `hsl(0, 100%, 70%, 1)`;

	function validatePassword(e) {
		const userCrtPassword = createPwdInput.value.trim().toLocaleLowerCase();
		const userCfmPassword = confirmPwdInput.value.trim().toLocaleLowerCase();
		const pwdMinLength = 6;

		//  || userCfmPassword < pwdMinLength
		if (userCrtPassword.length < pwdMinLength) {
			// signupP.innerHTML = `Password must be more than ${pwdMinLength} characters!`;
			showFormFeed(
				`Password must be more than ${pwdMinLength} characters!`,
				feedHolder.getElement(),
				userPwdContainer,
				e.currentTarget
			);

			feedHolder.addClass("warning_color");
			feedHolder.removeClass("error_color");

			createPwdInput.style.outline = `1px solid var(--warning-border)`;
			confirmPwdInput.style.outline = `1px solid var(--warning-border)`;
			return;
		} else {
			// signupP.style.color = "hsl(0, 0%, 90%)";
			feedHolder.remove();
			createPwdInput.style.outline = "1px solid var(--clear-border-warning)";
			confirmPwdInput.style.outline =
				"1px solid var(--clear-border-warning)";
		}

		if (userCrtPassword !== userCfmPassword) {
			// signupP.innerHTML = `Password don't match`;
			showFormFeed(
				`Password don't match`,
				feedHolder.getElement(),
				userPwdContainer,
				e.currentTarget
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			// signupP.style.color = `${inputErrorBorder}`;
			createPwdInput.style.outline = `1px solid var(--error-border)`;
			confirmPwdInput.style.outline = `1px solid var(--error-border)`;
			return;
		} else {
			feedHolder.remove();
			createPwdInput.style.outline = "1px solid var(--clear-border-warning)";
			confirmPwdInput.style.outline =
				"1px solid var(--clear-border-warning)";
		}
	}

	createPwdInput.addEventListener("input", validatePassword);
	confirmPwdInput.addEventListener("input", validatePassword);

	// function handleNext() {
	nextBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const useremail = signupEmailInput.value.trim().toLocaleLowerCase();
		const username = signupUsernameInput.value.trim().toLocaleLowerCase();

		if (!username) {
			showFormFeed(
				"Username required!",
				feedHolder.getElement(),
				userDetContainer,
				signupUsernameInput
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");
			signupUsernameInput.style.outline = `1px solid var(--error-border)`;
			return;
		} else {
			feedHolder.remove();
			signupUsernameInput.style.outline = "1px solid hsl(226, 60%, 50%)";
		}

		if (!useremail) {
			showFormFeed(
				"Email Address required!",
				feedHolder.getElement(),
				userDetContainer,
				signupEmailInput
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			signupEmailInput.style.outline = `1px solid var(--error-border)`;
			return;
		} else {
			// signupEmailInput.style.outline = "1px solid hsl(226, 60%, 50%)";
			signupEmailInput.style.outline =
				"1px solid var(--clear-border-warning)";
		}

		if (username && useremail) {
			nextBtn.disabled = "true";
			e.currentTarget.appendChild(buttonLoadingSpinner.getElement());
		}

		setTimeout(() => {
			nextBtn.disabled = "false";
			buttonLoadingSpinner.remove();

			userDetContainer.style.display = "none";
			userPwdContainer.style.display = "grid";
			submitBtn.style.display = "inline-block";
			nextBtn.style.display = "none";
		}, 1000);
	});
	// }

	submitBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		const useremail = signupEmailInput.value.trim().toLocaleLowerCase();
		const username = signupUsernameInput.value.trim().toLocaleLowerCase();
		submitBtn.disabled = "true";

		if (!createPwdInput.value.trim() || !confirmPwdInput.value.trim()) {
			showFormFeed(
				`Password is required!`,
				feedHolder.getElement(),
				userPwdContainer,
				signupEmailInput
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			createPwdInput.style.outline = "1px solid var(--error-border)";
			confirmPwdInput.style.outline = `1px solid var(--error-border)`;
			return;
		}

		const pwd = createPwdInput.value.trim().toLocaleLowerCase();

		if (
			(username && useremail && createPwdInput.value.trim()) ===
			confirmPwdInput.value.trim()
		) {
			feedHolder.remove();

			const user = {
				email: useremail,
				username: username,
				password: pwd,
			};

			const axiosDetails = await signupAccountService(url, user); // Call service function to send request
			submitBtn.disabled = "true";
			e.currentTarget.appendChild(buttonLoadingSpinner.getElement());

			setTimeout(() => {
				submitBtn.disabled = "false";
				buttonLoadingSpinner.remove();

				if (axiosDetails.status === 409) {
					submitBtn.disabled = "false";

					feedHolder.style("text-align: center");
					showFormFeed(
						`Username "${username}" already exist`,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput
					);
					feedHolder.addClass("warninig_color");
					// userPwdContainer.style.display = "none";
					// userDetContainer.style.display = "grid";
					submitBtn.style.display = "none";
					returnBtn.style.display = "inline-block";
				} else if (axiosDetails.status === 400) {
					showFormFeed(
						`All fileds are required`,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput
					);

					feedHolder.addClass("error_color");
					feedHolder.removeClass("warning_color");
				} else if (axiosDetails.status === 500) {
					showFormFeed(
						`Somethin went wrong.`,
						feedHolder.getElement(),
						loginForm,
						passwordInput
					);
					feedHolder.removeClass("error_color");
					feedHolder.addClass("warning_color");
				} else {
					nextBtn.disabled = "false";
					feedHolder.style("text-align: unset");
					feedHolder.removeClass("warning_color");
					feedHolder.removeClass("error_color");
					feedHolder.addClass("clear_error_color");

					showFormFeed(
						`Processing...`,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput
					);

					renderAccountCreation(axiosDetails);
				}
			}, 1000);
		}

		returnBtn.addEventListener("click", (e) => {
			returnBtn.disabled = "true";

			nextBtn.disabled = "true";
			e.currentTarget.appendChild(buttonLoadingSpinner.getElement());

			setTimeout(() => {
				returnBtn.disabled = "false";
				nextBtn.disabled = "false";
				buttonLoadingSpinner.remove();

				userDetContainer.style.display = "grid";
				userPwdContainer.style.display = "none";
				submitBtn.style.display = "none";
				returnBtn.style.display = "none";
				nextBtn.style.display = "inline-block";
				console.log("We are there!");
			}, 1000);
		});
	});
};

function renderAccountCreation(data) {
	console.log(data.message);
}

export { validateRegister };
