import { buttonLoadingSpinner } from "../components/ButtonLoadingSpinner.js";
import { showFormFeed } from "../helpers/showFormFeed.js";
import { loginAccountService } from "../services/loginAccountService.js";
import CreateElement from "../utils/CreateElement.js";

<<<<<<< HEAD:client/src/validators/validateLogin.js
let loginData = null;

const validateLogin = () => {
=======
const handleLogin = () => {
>>>>>>> 37aca4b9e6d5b949d248445e1381ee2af1dadb09:client/src/events/handleLogin.js
	const loginForm = document.querySelector("#login-form");
	const passwordInput = document.querySelector(".lg_user_pwd");
	const identifierInput = document.querySelector(".lg_user_name");
	const submitBtn = document.querySelector("#lg-submit-btn");

	// Create element that holds feed for form validation
	const feedHolder = new CreateElement("span", "Feed holder"); // Create elemet
	feedHolder.addClass("feed_holder"); // Add the class

	// Url to make POST request
	const url = new URL("http://localhost:5200/auth/login");

	submitBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		// Get values from inputs
		const identifier = identifierInput.value.trim().toLocaleLowerCase();
		const userPassword = passwordInput.value.trim().toLocaleLowerCase();

		if (!identifier) {
			showFormFeed(
				`All feilds are required!`,
				feedHolder.getElement(),
				loginForm,
				identifierInput
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			identifierInput.style.outline = `1px solid var(--error-border)`;
			return;
		} else {
			feedHolder.remove();
			identifierInput.style.outline =
				"1px solid var(--clear-border-warning)";
		}

		if (!userPassword) {
			showFormFeed(
				`All feilds are required!`,
				feedHolder.getElement(),
				loginForm,
				passwordInput
			);

			feedHolder.addClass("error_color");
			feedHolder.removeClass("warning_color");

			passwordInput.style.outline = `1px solid var(--error-border)`;
			return;
		} else {
			feedHolder.remove();
			passwordInput.style.outline = "1px solid var(--clear-border-warning)";
		}

		if (identifier && userPassword) {
			const user = { identifier, password: userPassword };

			submitBtn.disabled = true;
			submitBtn.appendChild(buttonLoadingSpinner.getElement());

			const axiosDetails = await loginAccountService(url, user); // Call service function to send request

			setTimeout(() => {
				submitBtn.disabled = false;
				buttonLoadingSpinner.remove();

				if (axiosDetails.status === 404) {
					feedHolder.removeClass("form_feed");

					showFormFeed(
						axiosDetails.data.error,
						feedHolder.getElement(),
						loginForm,
						passwordInput
					);

					feedHolder.getElement().style = "text-align: center";

					passwordInput.style.outline = `1px solid var(--error-border)`;
					identifierInput.style.outline = `1px solid var(--error-border)`;

					feedHolder.addClass("error_color");
					feedHolder.removeClass("warning_color");
					return;
				} else if (axiosDetails.status === 403) {
					feedHolder.removeClass("form_feed");

					showFormFeed(
						axiosDetails.data.error,
						feedHolder.getElement(),
						loginForm,
						passwordInput
					);

					passwordInput.style.outline = `1px solid var(--error-border)`;
					identifierInput.style.outline = `1px solid var(--error-border)`;

					feedHolder.addClass("error_color");
					feedHolder.removeClass("warning_color");
					return;
				} else if (axiosDetails.status === 400) {
					showFormFeed(
						axiosDetails.data.error,
						feedHolder.getElement(),
						loginForm,
						passwordInput
					);

					feedHolder.removeClass("error_color");
					feedHolder.addClass("warning_color");
					return;
				} else if (axiosDetails.status === 500) {
					showFormFeed(
						`500 internal server error`,
						feedHolder.getElement(),
						loginForm,
						passwordInput
					);

					feedHolder.removeClass("error_color");
					feedHolder.addClass("warning_color");
					return;
				} else if (axiosDetails.status === 202) {
					showFormFeed(
						`Processing... Login successful`,
						feedHolder.getElement(),
						loginForm,
						passwordInput
					);

					passwordInput.style.outline = `1px solid var(--clear-border-warning)`;
					identifierInput.style.outline = `1px solid var(--clear-border-warning)`;
					feedHolder.addClass("clear_error_color");

					renderAccountLogin(axiosDetails.data);
				}
			}, 1000);
		}
	});
};

function renderAccountLogin(data) {
	console.log(data.user);
}

export { validateLogin };
