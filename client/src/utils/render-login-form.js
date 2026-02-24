import appConfig from "../config/app-config.js";
import handleFormNavigation from "../helpers/handle-form-navigation.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { formPageInstance } from "../pages/FormPage.js";

const RenderLoginForm = () => {
	appConfig.pageTitle = "Login";
	// Clear from page and add a new form to the DOM

	// Show loading spinner before
	handleFormNavigation(1500, formPageInstance, "login");
};

export default RenderLoginForm;
