import appConfig from "../config/AppConfig";
import handleFormNavigation from "../helpers/handleFormNavigation";
import { overlayInstance } from "../layouts/Overlay";
import { forgotPasswordFormPageInstance } from "../pages/ForgotPasswordFormPage";

// Render Register form
const RenderResetPasswordPage = async () => {
	appConfig.pageTitle = "Reset Password";

	// Show loading spinner before
	handleFormNavigation(2500, forgotPasswordFormPageInstance, "reset");
};

export default RenderResetPasswordPage;
