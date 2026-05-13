import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Register.styles.css";

/**
 * RegisterMobile — Mobile register view component
 * @async
 * @param {Object} props
 * @param {string} props.state - "step-1" | "step-2" | "step-3" | "loading" | "success" | "error"
 * @param {Object} props.ctx - Router context
 * @returns {Promise<Element>} The register page element
 */
export const RegisterMobile = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root
		.addClass("register-page", "register-page-mobile")
		.setId("register-page-mobile");

	const getFormContent = (state) => {
		switch (state) {
			case "step-2":
				return buildNode(`
					<div class="auth-form-card-mobile">
						<h1>Create Password</h1>
						<form id="register-step2-form-mobile" class="auth-form-mobile">
							<div class="form-group">
								<label for="reg-password-mobile">Password</label>
								<input type="password" id="reg-password-mobile" placeholder="••••••••" required />
							</div>
							<div class="form-group">
								<label for="reg-confirm-mobile">Confirm</label>
								<input type="password" id="reg-confirm-mobile" placeholder="••••••••" required />
							</div>
							<button type="submit" class="btn-primary">Next</button>
						</form>
					</div>
				`);
			case "step-3":
				return buildNode(`
					<div class="auth-form-card-mobile">
						<h1>Complete Profile</h1>
						<form id="register-step3-form-mobile" class="auth-form-mobile">
							<div class="form-group">
								<label for="reg-username-mobile">Username</label>
								<input type="text" id="reg-username-mobile" placeholder="Username" required />
							</div>
							<div class="form-group">
								<label for="reg-bio-mobile">Bio</label>
								<textarea id="reg-bio-mobile" placeholder="About you" rows="2"></textarea>
							</div>
							<button type="submit" class="btn-primary">Create Account</button>
						</form>
					</div>
				`);
			case "loading":
				return buildNode(`
					<div class="auth-loading-state">
						<div class="auth-spinner"></div>
						<p>Creating...</p>
					</div>
				`);
			case "success":
				return buildNode(`
					<div class="auth-success-state">
						<div class="success-icon"><i class="bi bi-check-circle-fill"></i></div>
						<h3>Welcome!</h3>
						<p>Account created.</p>
						<a href="/" class="btn-primary">Start Listening</a>
					</div>
				`);
			case "error":
				return buildNode(`
					<div class="auth-error-state">
						<div class="error-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
						<h3>Failed</h3>
						<p id="auth-error-msg-mobile">Try again.</p>
						<button class="btn-accent" id="auth-retry-btn-mobile">Retry</button>
					</div>
				`);
			default:
				return buildNode(`
					<div class="auth-form-card-mobile">
						<div class="auth-mobile-logo">
							<div class="auth-logo-icon"><i class="bi bi-music-note"></i></div>
							<span>Soniq<span>Stream</span></span>
						</div>
						<h1>Create Account</h1>
						<p class="auth-form-sub-mobile">Step 1 of 3</p>
						<form id="register-step1-form-mobile" class="auth-form-mobile">
							<div class="form-group">
								<label for="reg-email-mobile">Email</label>
								<input type="email" id="reg-email-mobile" placeholder="your@email.com" required />
							</div>
							<button type="submit" class="btn-primary">Next</button>
						</form>
						<p class="auth-footer-mobile">
							Have an account? <a href="/auth/login" class="auth-link">Sign in</a>
						</p>
					</div>
				`);
		}
	};

	root.append(getFormContent(state));
	return root.getElement();
};
