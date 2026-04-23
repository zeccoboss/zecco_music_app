import appConfig from "../config/app-config.js";
import { setActivePage } from "../helpers/active-page-helpers.js";

// Render Register form
const RenderRegisterForm = async () => {
	appConfig.page_title = "Register";

	const page = document.getElementById("register-page");
	setActivePage(page, "active-app-page");
};

const hideFormCtn = () => {
	const ctn = document.querySelector("show-auth-steps-ctn");
	if (ctn) ctn.classList.remove("show-auth-steps-ctn");
};

const RenderRegisterStepOne = () => {
	appConfig.page_title = "Create account";

	const page = document.getElementById("register-page");
	setActivePage(page, "active-app-page");

	// Hide form page
	hideFormCtn();

	const formCtn = document.querySelector("#register-step-one");
	formCtn.classList.add("show-auth-steps-ctn");
};

const RenderRegisterStepTwo = () => {
	appConfig.page_title = "Create password";

	const page = document.getElementById("register-page");
	setActivePage(page, "active-app-page");

	// Hide form page
	hideFormCtn();

	const formCtn = document.querySelector("#register-step-two");
	formCtn.classList.add("show-auth-steps-ctn");
};

export { RenderRegisterStepOne, RenderRegisterStepTwo };
