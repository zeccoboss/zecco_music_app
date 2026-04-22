import { homeSvg } from "../../assets/svgs/svg-icons";
import { buildNode } from "../../utils/build-node";
import CreateElement from "../../utils/create-element";

const MobileRegisterPage = () => {
	const page = new CreateElement("div");

	page
		.addClass(
			"register-page",
			"mob-auth-page",
			"mobile-form-page",
			"app-page",
		)
		.setId("register-page");

	const state = {
		get header() {
			const html = `
				<header class="mob-auth-top">
					<div class="mob-brand">
						<div class="mob-brand-icon">🎵</div>
						<div class="mob-brand-text">
							Zecco<span>Stream</span>
						</div>
					</div>
					<a href="/" class="mob-home-link">${homeSvg}</a>
				</header>
			`;
			return buildNode(html);
		},
		get step_one() {
			const html = `
					<div class="auth-steps-ctn">
						<div class="mob-steps">
							<div class="mob-step active"></div>
							<div class="mob-step"></div>
						</div>

						<div class="mob-auth-heading">Create account</div>
						<div class="mob-auth-sub">
							Step 1 of 2 — Your details
						</div>

						<div class="mob-oauth">
							<button class="mob-oauth-btn">
								<span class="oauth-icon">G</span> Sign up with
								Google
							</button>
							<button class="mob-oauth-btn">
								<span class="oauth-icon">⌥</span> Sign up with
								GitHub
							</button>
						</div>

						<div class="mob-divider">
							<div class="mob-divider-line"></div>
							<span class="mob-divider-text">or use email</span>
							<div class="mob-divider-line"></div>
						</div>

						<div class="mob-field">
							<label class="mob-field-label">Username</label>
							<input
								class="mob-input"
								placeholder="Choose a username"
							/>
						</div>
						<div class="mob-field">
							<label class="mob-field-label">Email address</label>
							<input
								class="mob-input"
								placeholder="youremail@example.com"
								type="email"
							/>
						</div>

						<button class="mob-submit-btn" style="margin-top: 8px">
							Next →
						</button>
						<div class="mob-switch">
							Already have an account? <a href="/login">Login</a>
						</div>
					</div>
				`;
			return buildNode(html);
		},
		get step_two() {
			const html = `
				<div class="auth-steps-ctn">
					<div class="mob-steps">
						<div class="mob-step done"></div>
						<div class="mob-step active"></div>
					</div>

					<div class="mob-auth-heading">Set password</div>
					<div class="mob-auth-sub">
						Step 2 of 2 — Secure your account
					</div>

					<div class="mob-field">
						<label class="mob-field-label">Password</label>
						<input
							class="mob-input"
							placeholder="Create a password"
							type="password"
						/>
					</div>
					<div class="pwd-strength">
						<div class="pwd-bars">
							<div class="pwd-bar medium"></div>
							<div class="pwd-bar medium"></div>
							<div class="pwd-bar"></div>
							<div class="pwd-bar"></div>
						</div>
						<span class="pwd-label medium"
							>Medium — add numbers or symbols</span
						>
					</div>

					<div class="mob-field">
						<label class="mob-field-label"
							>Confirm password</label
						>
						<input class="mob-input" placeholder="Repeat your password" type="password"/>
					</div>

					<button class="mob-submit-btn" style="margin-top: 8px">
						Create Account
					</button>
					<div class="mob-switch" style="cursor: pointer">
						← Back to step 1
					</div>
				</div>
			`;
			return buildNode(html);
		},
	};

	page.append(state.header, state.step_one, state.step_two);
	return page.getElement();
};

export { MobileRegisterPage };
