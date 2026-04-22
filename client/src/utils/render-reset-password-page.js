import appConfig from "../config/app-config.js";
import { setActivePage } from "../helpers/active-page-helpers.js";

// Render Register form
const RenderResetPasswordPage = async () => {
	appConfig.page_title = "Reset Password";

	const page = document.getElementById("reset-password-page");

	// Show the page
	setActivePage(page, "active-app-page");
};

export default RenderResetPasswordPage;
