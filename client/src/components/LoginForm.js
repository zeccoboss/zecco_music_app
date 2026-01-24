import CreateElement from "../utils/CreateElement.js";
import { homeSvg } from "../utils/SVG_ICONS.js";
import { validateLogin } from "../validators/validateLogin.js";

const loginFormInstance = new CreateElement("forms");

const LoginForm = () => {
	loginFormInstance.addClass("login_form", "forms");
	loginFormInstance.setId("login-form");

	loginFormInstance.innerHTML = `
		<a href="/" id="form-nav-link" class="form_nav_link form_links">${homeSvg} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Zecco</span><span class="second-child">Music</span>
		</h2>
		<h4 class="form_message">Welcome back, Please login to continue.</h4>

		<label for="lg-user-name">Email address:</label>
		<input type="text" name="" id="lg-user-name" class="lg_user_name" placeholder="youremail@example.com" required />
		<label for="lg-user-pwd">Password:</label>
		<input type="password" name="password" id="lg-user-pwd" class="lg_user_pwd" placeholder="Enter Password" required />
	
		<div class="form_links_wrapper">
			<a href="/password/reset" class="form_links lg_frgt_pwd_lnk" id="lg-frgt-pwd-lnk">Forgotten password?</a>	
		</div>
	
		<button type="submit" id="lg-submit-btn" class="form_btn">Login</button>

		<div class="form_links_wrapper_two">
			<a href="/register" class="form_links">Don't have account? Sign up.</a>
		</div>
	`;

	validateLogin(loginFormInstance); // Handle user login

	return loginFormInstance.getElement();
};
export { loginFormInstance, LoginForm };
