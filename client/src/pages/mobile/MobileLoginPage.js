import { homeSvg } from "../../assets/svgs/svg-icons";
import CreateElement from "../../utils/create-element";

const MobileLoginPage = () => {
	const page = new CreateElement("div");

	page
		.addClass("login-page", "mobile-form-page", "app-page")
		.setId("login-page").innerHTML = `
		<div class="mob-auth-page">
			<div class="mob-auth-top">
				<div class="mob-brand">
					<div class="mob-brand-icon">🎵</div>
					<div class="mob-brand-text">
						Zecco<span>Stream</span>
					</div>
				</div>
				<a href="/" class="mob-home-link">${homeSvg}</a>
			</div>
			<div class="mob-auth-heading">Welcome back</div>
			<div class="mob-auth-sub">
				Login to continue to ZeccoStream
			</div>

			<div class="mob-oauth">
				<button class="mob-oauth-btn">
					<span class="oauth-icon">G</span> Continue with
					Google
				</button>
				<button class="mob-oauth-btn">
					<span class="oauth-icon">⌥</span> Continue with
					GitHub
				</button>
			</div>

			<div class="mob-divider">
				<div class="mob-divider-line"></div>
				<span class="mob-divider-text"
					>or continue with email</span
				>
				<div class="mob-divider-line"></div>
			</div>

			<div class="mob-field">
				<label class="mob-field-label">Email address</label>
				<input
					class="mob-input"
					placeholder="youremail@example.com"
					type="email"
				/>
			</div>
			<div class="mob-field">
				<label class="mob-field-label">Password</label>
				<input
					class="mob-input"
					placeholder="Enter password"
					type="password"
				/>
			</div>

			<a href="/forgot-password" class="mob-forgot"
				style="display:block;"
			>Forgot password?</a>

			<button class="mob-submit-btn">Login</button>
			<div class="mob-switch">
				Don't have an account? <a href="/register">Sign up</a>
			</div>
		</div>
	`;

	return page.getElement();
};

export { MobileLoginPage };
