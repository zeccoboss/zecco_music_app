import {
	ResetPasswordForm,
	resetPasswordFormInstance,
} from "../components/ResetPasswordForm.js";
import handleFormNavigation from "../helpers/handleFormNavigation.js";
import { router } from "../routes/router.js";
import CreateElement from "../utils/CreateElement.js";

const forgotPasswordFormPageInstance = new CreateElement("div");
forgotPasswordFormPageInstance.addClass("frt_pwd_frm_page");
forgotPasswordFormPageInstance.setId("frt-pwd-frm-page");

const ForgotPasswordFormPage = () => {
	const container = new CreateElement("div");

	container.addClass("frt_pwd_ctn");
	container.setId("frt-pwd-ctn");

	container.innerHTML = `
		An email has been sent to example@example.com
	`;

	const links = resetPasswordFormInstance.getChildren("a", "element");

	for (const link of links) {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const currentTarget = e.currentTarget;
			const href = currentTarget.getAttribute("href");
			if (currentTarget.id === "form-nav-link") {
				handleFormNavigation(1500, form, "reset");
				// defaultLayout();
				router.navigateTo(href);
				return;
			}
			router.navigateTo(href);
		});
	}

	forgotPasswordFormPageInstance.append(
		ResetPasswordForm(),
		container.getElement(),
	);
	return forgotPasswordFormPageInstance.getElement();
};
export { forgotPasswordFormPageInstance, ForgotPasswordFormPage };
