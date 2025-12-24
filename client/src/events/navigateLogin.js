import { navigationSpinner } from "../core/loadingSpinner.js";

const navigateLogin = () => {
	const extraContent = document.querySelector(".extra_content");
	const overlay = document.querySelector(".overlay");
	const signupForm = document.querySelector(".signup_form");
	const loginForm = document.querySelector(".login_form");

	extraContent.classList.remove("show_extra_content");
	overlay.classList.add("show_overlay");

	const formsToRender = [
		{ render: false, element: signupForm },
		{ render: true, element: loginForm },
	];

	navigationSpinner(overlay, extraContent, 2500, formsToRender);
};

export default navigateLogin;
