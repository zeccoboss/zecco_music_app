import handleFormNavigation from "../helpers/handleFormNavigation.js";
import { forgotPasswordFormPageInstance } from "../pages/ForgotPasswordFormPage.js";
import { router } from "../routes/router.js";
import CreateElement from "../utils/CreateElement";
import { homeSvg } from "../utils/SVG_ICONS.js";

const resetPasswordFormInstance = new CreateElement("form");

const ResetPasswordForm = () => {
	resetPasswordFormInstance.addClass("frt_pwd_frm");
	resetPasswordFormInstance.setId("frt-pwd-frm");

	// resetPasswordFormInstance.addClass("signup_form", "forms");
	// resetPasswordFormInstance.setId("register-form");

	resetPasswordFormInstance.innerHTML = `
		<a href="/"  id="form-nav-link" class="form_nav_link form_links">${homeSvg} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Reset Password</span>
		</h2>
		<h4 class="form_message">Fill required data to continue reset</h4>

		<div class="">
			<label for="reset-email">Email Address:</label>
			<input type="email" id="reset-email-input	" class="reset_email" placeholder="youremail@example.com" required />
		</div>

		<button type="submit" id="reset-next-btn" class="form_btn re_next_btn">Next</button>
		<button type="submit" id="reset-submit-btn" class="form_btn re_submit_btn">Submit</button>
		<button type="submit" id="reset-return-btn" class="form_btn re_return_btn">Return</button>	
	`;

	const links = resetPasswordFormInstance.getChildren("a", "element");

	// for (const link of links) {
	// 	link.addEventListener("click", (e) => {
	// 		e.preventDefault();
	// 		const currentTarget = e.currentTarget;
	// 		const href = currentTarget.getAttribute("href");
	// 		if (currentTarget.id === "form-nav-link") {
	// 			handleFormNavigation(1500, forgotPasswordFormPageInstance, "home");
	// 			console.log("///");

	// 			// defaultLayout();
	// 			router.navigateTo(href);
	// 			return;
	// 		}
	// 		// router.navigateTo(href);
	// 	});
	// }

	return resetPasswordFormInstance.getElement();
};
export { resetPasswordFormInstance, ResetPasswordForm };
