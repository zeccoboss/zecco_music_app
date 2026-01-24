import { loginFormInstance } from "../components/LoginForm";
import { registerFormInstance } from "../components/RegisterForm.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { forgotPasswordFormPageInstance } from "../pages/ForgotPasswordFormPage.js";
import { formPageInstance as formPage } from "../pages/FormPage.js";
import loadingImg from "../assets/images/logo.jpg";

const handleFormNavigation = (duration, formPageInstance, flag) => {
	// Make overlay visible
	overlayInstance.addClass("show_overlay");

	// Clear Overlay
	overlayInstance.innerHTML = "";

	// Add content to overlay
	overlayInstance.innerHTML = `
		<div class="overlay_logo_container">
			<img src="${loadingImg}" alt="" height="300" width="300" class="overlay_logo"/>
		</div>
	`;

	// Hide the passed form page
	formPageInstance.removeClass("show_form_page");

	const forms = document.querySelectorAll(".forms");

	// Loop and hide all forms on the form page
	for (const form of forms) form.classList.remove("active_form");

	// Navigate on flag match
	switch (flag) {
		case "login":
			loginFormInstance.addClass("active_form");

			setTimeout(() => {
				overlayInstance.removeClass("show_overlay");
				formPageInstance.addClass("show_form_page");
			}, duration);

			break;
		case "register":
			registerFormInstance.addClass("active_form");

			setTimeout(() => {
				overlayInstance.removeClass("show_overlay");
				formPageInstance.addClass("show_form_page");
			}, duration);

			break;
		case "reset":
			formPageInstance.removeClass("show_form_page");

			setTimeout(() => {
				overlayInstance.removeClass("show_overlay");
				formPageInstance.addClass("show_form_page");
			}, duration);

			break;
		case "home":
			setTimeout(() => {
				overlayInstance.removeClass("show_overlay");
				forgotPasswordFormPageInstance.removeClass("show_form_page");
				formPage.removeClass("show_form_page");
				console.log(formPageInstance);
			}, duration);
			break;
		default:
			console.error(
				"Can't navigate form, no flag passed! Required ('login' || 'home' || 'register' || 'reset')",
			);

			break;
	}
};

export default handleFormNavigation;
