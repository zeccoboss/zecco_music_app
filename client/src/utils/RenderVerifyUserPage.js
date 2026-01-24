import appConfig from "../config/AppConfig";
import { verificationService } from "../services/verificationService";

// Render Register form
const RenderVerifyUserPage = async () => {
	appConfig.pageTitle = "Verify User";
	const token = location.pathname;
	const data = await verificationService("/auth/verify", token);
};

export default RenderVerifyUserPage;
