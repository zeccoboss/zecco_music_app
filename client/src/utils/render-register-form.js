import appConfig from "../config/app-config.js";
import { setActivePage } from "../helpers/active-page-helpers.js";

// Render Register form
const RenderRegisterForm = async () => {
	appConfig.page_title = "Register User";

	const page = document.getElementById("register-page");
	setActivePage(page, "active-app-page");
};

export default RenderRegisterForm;
