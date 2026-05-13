import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Login.styles.css";

/**
 * LoginMobile — Mobile login view component
 * Full form, no brand side (renders into root outlet)
 *
 * @async
 * @param {Object} props
 * @param {string} props.state - "form" | "loading" | "error"
 * @param {Object} props.ctx - Router context (optional)
 * @returns {Promise<Element>} The login page element
 */
export const LoginMobile = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root.addClass("login-page", "login-page-mobile").setId("login-page-mobile");

	const formContent = (() => {
		switch (state) {
			case "loading":
				return buildNode(`
					<div class="auth-loading-state">
						<div class="auth-spinner"></div>
						<p>Signing you in...</p>
					</div>
				`);
			case "error":
				return buildNode(`
					<div class="auth-error-state">
						<div class="error-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
						<h3>Login failed</h3>
						<p id="auth-error-msg-mobile">Check your credentials.</p>
						<button class="btn-accent" id="auth-retry-btn-mobile">Try Again</button>
					</div>
				`);
			default:
				return buildNode(`
					<div class="auth-form-card-mobile">
						<div class="auth-mobile-logo">
							<div class="auth-logo-icon"><i class="bi bi-music-note"></i></div>
							<span class="auth-logo-text-mobile">Soniq<span>Stream</span></span>
						</div>
						<h1 class="auth-form-heading-mobile">Welcome back</h1>
						<p class="auth-form-sub-mobile">Sign in to continue</p>

						<form id="login-form-mobile" class="auth-form-mobile">
							<div class="form-group">
								<label for="login-email-mobile">Email</label>
								<input type="email" id="login-email-mobile" placeholder="your@email.com" required />
							</div>
							<div class="form-group">
								<label for="login-password-mobile">Password</label>
								<input type="password" id="login-password-mobile" placeholder="••••••••" required />
							</div>
							<button type="submit" class="btn-primary auth-submit-btn-mobile">Sign In</button>
						</form>

						<div class="auth-divider-mobile">Or</div>

						<div class="auth-oauth-btns-mobile">
							<button class="auth-oauth-btn-mobile" id="login-google-btn-mobile">
								<i class="bi bi-google"></i>
							</button>
							<button class="auth-oauth-btn-mobile" id="login-github-btn-mobile">
								<i class="bi bi-github"></i>
							</button>
						</div>

						<p class="auth-footer-mobile">
							Don't have an account? <a href="/auth/register" class="auth-link">Sign up</a>
						</p>
						<p class="auth-footer-mobile">
							<a href="/auth/forgot-password" class="auth-link">Forgot password?</a>
						</p>
					</div>
				`);
		}
	})();

	root.append(formContent);
	return root.getElement();
};
