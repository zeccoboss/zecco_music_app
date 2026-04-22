import appConfig from "../config/app-config.js";
import { setActivePage } from "../helpers/active-page-helpers.js";

const RenderLoginForm = () => {
	appConfig.page_title = "Login";

	// const loginPage = document.getElementById
	// loginPage.classList.add("active-app-page");
	const page = document.getElementById("login-page");

	// Show the page
	setActivePage(page, "active-app-page");
};

export default RenderLoginForm;
