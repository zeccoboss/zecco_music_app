import CreateElement from "../utils/CreateElement.js";

const SignpForm = () => {
	const signpForm = new CreateElement("forms");

	signpForm.addClass("signup_form", "forms");
	signpForm.setId("signup-form");

	const htmlContent = `
		<h3>Signup To Continue</h3>

		<input type="text" id="signup-username" class="signup_username" placeholder="Username" required />

		<input type="email" id="signup-email" class="signup_email" placeholder="Email address" required />

		<input type="password" name="password" id="create-pwd-input" class="signup_pwd_input" placeholder="Create password" required />
		<input type="password" name="password" id="confirm-pwd-input" class="signup_pwd_input" placeholder="Confirm password" required />

		<div>
			<a href="/" class="su_frm_rtn_link">Navigate Home</a>
			<p class="su_p">Already have accout ? <a href="/login">Login</a></p>
		</div>

		<button type="submit" id="signup-submit-btn" class="signup_submit_btn"> 
			Sign Up
		</button>
	`;

	signpForm.setInnerHTML(htmlContent);

	return signpForm.getElement();
};
export default SignpForm;
