import CreateElement from "../utils/CreateElement.js";
import { homeSvg } from "../utils/SVG_ICONS.js";

const LoginForm = () => {
	const loginForm = new CreateElement("forms");

	loginForm.addClass("login_form", "forms");
	loginForm.setId("login-form");

	loginForm.setInnerHTML(`
		<a href="/" class="form_nav_link">${homeSvg} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Zecco</span><span class="second-child">Music</span>
		</h2>
		<h4 class="form_message">Welcome back, Please login to continue.</h4>

		<label for="lg-user-name">Username or Email address:</label>
		<input type="text" name="" id="lg-user-name" class="lg_user_name" placeholder="user2313@mail.com or Username..." required />
		<label for="lg-user-pwd">Password:</label>
		<input type="password" name="password" id="lg-user-pwd" class="lg_user_pwd" placeholder="User Password" required />		
	
		<div class="form_links_wrapper">
			<a href="/forgotten_password" class="form_links lg_frgt_pwd_lnk">Fogotten passaword?</a>	
		</div>
	
		<button type="submit" id="lg-submit-btn" class="form_btn">Login</button>

		<div class="form_links_wrapper_two">
			<a href="/signup" class="form_links">Don't have accout? Sign up.</a>
		</div>
	`);

	return loginForm.getElement();
};
export default LoginForm;
