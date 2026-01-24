import appConfig from "../config/AppConfig.js";
import handleFormNavigation from "../helpers/handleFormNavigation.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { formPageInstance } from "../pages/FormPage.js";
import { validateRegister } from "../validators/validateRegister.js";

// Render Register form
const RenderRegisterForm = async () => {
	appConfig.pageTitle = "Register User";

	// Show loading spinner before
	handleFormNavigation(2500, formPageInstance, "register");
};

export default RenderRegisterForm;
