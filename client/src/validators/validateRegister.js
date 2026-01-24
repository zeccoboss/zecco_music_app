import { buttonLoadingSpinner } from "../components/ButtonLoadingSpinner.js";
import promptsConfig from "../config/promptsConfig.js";
import { showFormFeed } from "../helpers/showFormFeed.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { signupAccountService } from "../services/signupAccountService.js";
import CreateElement from "../utils/CreateElement.js";
import { PromptManager } from "../utils/PromptManager.js";

// overlayInstance.addClass("show_overlay");
// const registerPrompt = new PromptManager();
// overlayInstance.append(registerPrompt.open(promptsConfig.regFormConn));

const validateRegister = async (formInstance) => {
	const registerPrompt = new PromptManager();

	// Select element
	const nextBtn = formInstance.getChild("#register-next-btn", "id");
	const submitBtn = formInstance.getChild("#register-submit-btn", "id");
	const returnBtn = formInstance.getChild("#register-return-btn", "id");
	const userDetContainer = formInstance.getChild(
		".user_details_container",
		"class",
	);
	const userPwdContainer = formInstance.getChild(
		".user_password_container",
		"class",
	);

	const signupUsernameInput = formInstance.getChild(
		".signup_username",
		"class",
	);
	const signupEmailInput = formInstance.getChild(".signup_email", "class");

	const createPwdInput = formInstance.getChild("#create-pwd-input", "id");
	const confirmPwdInput = formInstance.getChild("#confirm-pwd-input", "id");

	// Create element that holds feed for form validation
	const feedHolder = new CreateElement("span", "Feed holder");
	feedHolder.addClass("feed_holder");

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
				e.currentTarget,
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
				e.currentTarget,
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
				signupUsernameInput,
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
				signupEmailInput,
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
			nextBtn.disabled = true;
			e.currentTarget.appendChild(buttonLoadingSpinner.getElement());
		}

		setTimeout(() => {
			nextBtn.disabled = false;
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
		const createdPwd = createPwdInput.value.trim();
		const confirmedPwd = confirmPwdInput.value.trim();

		if (createdPwd !== confirmedPwd) {
			showFormFeed(
				`Password don't match`,
				feedHolder.getElement(),
				userPwdContainer,
				confirmPwdInput,
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			createPwdInput.style.outline = "1px solid var(--error-border)";
			confirmPwdInput.style.outline = `1px solid var(--error-border)`;
			return;
		}

		if (!createdPwd || !confirmedPwd) {
			showFormFeed(
				`Password is required!`,
				feedHolder.getElement(),
				userPwdContainer,
				confirmPwdInput,
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			createPwdInput.style.outline = "1px solid var(--error-border)";
			confirmPwdInput.style.outline = `1px solid var(--error-border)`;
			return;
		}

		const pwd = createdPwd === confirmedPwd ? confirmedPwd : null;

		if (username && useremail && pwd) {
			feedHolder.remove();

			const user = {
				email: useremail,
				username: username,
				password: pwd,
			};

			submitBtn.disabled = true;
			submitBtn.appendChild(buttonLoadingSpinner.getElement());

			const axiosDetails = await signupAccountService(
				"/auth/register",
				user,
			); // Call service function to send request

			setTimeout(() => {
				submitBtn.disabled = false;
				buttonLoadingSpinner.remove();

				if (axiosDetails.status === 409) {
					submitBtn.disabled = false;

					feedHolder.style("text-align: center");
					showFormFeed(
						axiosDetails.data.error,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput,
					);

					feedHolder.addClass("warning_color");
					submitBtn.style.display = "none";
					returnBtn.style.display = "inline-block";
				} else if (axiosDetails.status === 400) {
					showFormFeed(
						axiosDetails.data.error,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput,
					);

					feedHolder.addClass("error_color");
					feedHolder.removeClass("warning_color");
				} else if (axiosDetails.status === 500) {
					showFormFeed(
						`Network error`,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput,
					);
					feedHolder.removeClass("error_color");
					feedHolder.addClass("warning_color");
				} else if (axiosDetails.status === 201) {
					// overlayInstance.style("opacity", "0.8");
					document.querySelector(".overlay").innerHTML = ``;

					const email = axiosDetails?.data?.email;
					if (!email) return console.error("Can't get the email address");
					const { regFormConn } = promptsConfig;
					const { modal } = registerPrompt.open(regFormConn, email);
					// overlayInstance.addClass("show_overlay");
					// overlayInstance.append(modal);

					console.log(axiosDetails.data.email);

					nextBtn.disabled = false;
					feedHolder.style = "text-align: unset";
					feedHolder.removeClass("warning_color");
					feedHolder.removeClass("error_color");
					feedHolder.addClass("clear_error_color");
					console.log(axiosDetails);
					showFormFeed(
						`${axiosDetails?.data?.message ?? "Registration successful."}`,
						feedHolder.getElement(),
						userPwdContainer,
						confirmPwdInput,
					);
					renderAccountCreation(axiosDetails.data);
				}
			}, 1000);
		}

		returnBtn.addEventListener("click", (e) => {
			nextBtn.disabled = false;
			submitBtn.disabled = false;
			returnBtn.disabled = true;

			e.currentTarget.appendChild(buttonLoadingSpinner.getElement());

			setTimeout(() => {
				createPwdInput.value = "";
				confirmPwdInput.value = "";
				returnBtn.disabled = false;
				buttonLoadingSpinner.remove();
				userDetContainer.style.display = "grid";
				userPwdContainer.style.display = "none";
				submitBtn.style.display = "none";
				returnBtn.style.display = "none";
				nextBtn.style.display = "inline-block";
			}, 1000);
		});
	});
};

function renderAccountCreation(data) {
	console.log(data.user);
}

export { validateRegister };
