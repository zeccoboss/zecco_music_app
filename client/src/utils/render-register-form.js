import appConfig from "../config/app-config.js";
import handleFormNavigation from "../helpers/handle-form-navigation.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { formPageInstance } from "../pages/FormPage.js";
import { validateRegister } from "../validators/validate-register.js";

// Render Register form
const RenderRegisterForm = async () => {
	appConfig.pageTitle = "Register User";

	// Show loading spinner before
	handleFormNavigation(1500, formPageInstance, "register");
};

export default RenderRegisterForm;
