import handleFormNavigation from "../helpers/handleFormNavigation.js";
import { formPageInstance } from "../pages/FormPage.js";
import { router } from "../routes/router.js";
import CreateElement from "../utils/CreateElement.js";
import { homeSvg } from "../utils/SVG_ICONS.js";
import { validateRegister } from "../validators/validateRegister.js";

const registerFormInstance = new CreateElement("forms");

const RegisterForm = () => {
	registerFormInstance.addClass("signup_form", "forms");
	registerFormInstance.setId("register-form");

	registerFormInstance.innerHTML = `
		<a href="/"  id="form-nav-link" class="form_nav_link form_links">${homeSvg} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Zecco</span><span class="second-child">Music</span>
		</h2>
		<h4 class="form_message">Welcome! Please enter details below to continue</h4>

		<div class="user_details_container">
			<label for="register-username">Username:</label>
			<input type="text" id="register-username" class="signup_username" placeholder="Username" required />

			<label for="register-email">Email Address:</label>
			<input type="email" id="register-email" class="signup_email" placeholder="youremail@example.com" required />
		</div>

		<div class="user_password_container">
			<label for="create-pwd-input">Create password:</label>
			<input type="password" name="password" id="create-pwd-input" class="signup_pwd_input" placeholder="Create password" required />

			<label for="confirm-pwd-input">Confirm password:</label>
			<input type="password" name="password" id="confirm-pwd-input" class="signup_pwd_input" placeholder="Confirm password" required />
		</div>

		<div class="form_links_wrapper">
			<a href="/login" class="form_links">Already have account? Login</a>
		</div>

		<button type="submit" id="register-next-btn" class="form_btn next_btn">Next</button>
		<button type="submit" id="register-submit-btn" class="form_btn submit_btn">Submit</button>
		<button type="submit" id="register-return-btn" class="form_btn return_btn">Return</button>
	`;

	// Handle user register
	validateRegister(registerFormInstance);

	// Return the created element
	return registerFormInstance.getElement();
};
export { registerFormInstance, RegisterForm };
