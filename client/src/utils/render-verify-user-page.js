import appConfig from "../config/app-config.js";
import { verificationService } from "../services/verification-service.js";

// Render Register form
const RenderVerifyUserPage = async () => {
	appConfig.page_title = "Verify User";
	const token = location.pathname;
	const data = await verificationService("/auth/verify", token);
};

export default RenderVerifyUserPage;
