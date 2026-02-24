import appConfig from "../config/app-config.js";
import handleFormNavigation from "../helpers/handle-form-navigation.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { forgotPasswordFormPageInstance } from "../pages/ForgotPasswordFormPage.js";

// Render Register form
const RenderResetPasswordPage = async () => {
	appConfig.pageTitle = "Reset Password";

	// Show loading spinner before
	handleFormNavigation(1500, forgotPasswordFormPageInstance, "reset");
};

export default RenderResetPasswordPage;
