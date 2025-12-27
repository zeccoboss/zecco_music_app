import CreateElement from "../utils/CreateElement.js";
import { homeSvg } from "../utils/SVG_ICONS.js";

const SignpForm = () => {
	const signpForm = new CreateElement("forms");

	signpForm.addClass("signup_form", "forms");
	signpForm.setId("signup-form");

	const htmlContent = `
		<a href="/" class="form_nav_link">${homeSvg} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Zecco</span><span class="second-child">Music</span>
		</h2>
		<h4 class="form_message">Welcome! Please enter details below to continue</h4>

		<div class="user_details_container">
			<label for="signup-username">Username:</label>
			<input type="text" id="signup-username" class="signup_username" placeholder="Username" required />

			<label for="signup-email">Email Adress:</label>
			<input type="email" id="signup-email" class="signup_email" placeholder="Email address" required />
		</div>

		<div class="user_password_container">
			<label for="create-pwd-input">Create password:</label>
			<input type="password" name="password" id="create-pwd-input" class="signup_pwd_input" placeholder="Create password" required />

			<label for="confirm-pwd-input">Confirm password:</label>
			<input type="password" name="password" id="confirm-pwd-input" class="signup_pwd_input" placeholder="Confirm password" required />
		</div>

		<div class="form_links_wrapper">
			<a href="/login" class="form_links">Already have accout? Login</a>
		</div>

		<button type="submit" id="signup-next-btn" class="form_btn next_btn">Next</button>
		<button type="submit" id="signup-submit-btn" class="form_btn submit_btn">Submit</button>
		<button type="submit" id="signup-return-btn" class="form_btn return_btn">Return</button>
	`;

	signpForm.setInnerHTML(htmlContent);

	return signpForm.getElement();
};
export default SignpForm;
