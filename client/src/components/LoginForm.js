import CreateElement from "../utils/CreateElement.js";

const LoginForm = () => {
	const loginForm = new CreateElement("forms");

	loginForm.addClass("login_form", "forms");
	loginForm.setId("login-form");

	const htmlContent = `
		<h3>Login To Continue</h3>

		<input type="text" name="" id="lg-user-name" class="lg_user_name" placeholder="Email address or Username" required />

		<input type="password" name="password" id="lg-user-pwd" class="lg_user_pwd" placeholder="User Password" required />		
	
		<div >
			<a href="/" class="lg_frm_rtn_link">Navigate Home</a>	
			<p class="lg_p">Don't have accout ? <a href="/signup">Sign up</a></p>
			<a href="/password" class="lg_frgt_pwd_lnk">Fogotten passaword ?</a>	
		</div>
	
		<button type="submit" id="lg-submit-btn" class="lg_submit_btn">Login
		</button>
	`;

	loginForm.setInnerHTML(htmlContent);

	return loginForm.getElement();
};
export default LoginForm;
