import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Password.styles.css";

/**
 * PasswordMobile — Mobile forgot password view component
 * @async
 * @param {Object} props
 * @param {string} props.state - "email" | "code" | "reset" | "loading" | "success" | "error"
 * @param {Object} props.ctx - Router context
 * @returns {Promise<Element>} The password reset page element
 */
export const PasswordMobile = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root
		.addClass("password-page", "mobile-form-page", "app-page")
		.setId("password-page-mobile");

	const isLoading = state === "loading";
	const isEmail = state === "email" || !state;
	const isCode = state === "code";
	const isReset = state === "reset";
	const isSuccess = state === "success";
	const isError = state === "error";

	const formContent = buildNode(`
		<section class="form-side-mobile" id="password-form-side-mobile">
			${
				isLoading
					? `
				<div class="auth-loading-overlay" id="password-loading-overlay">
					<svg width="28" height="28" fill="none" viewBox="0 0 24 24" class="auth-spinner">
						<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
					</svg>
					<span>Processing...</span>
				</div>
			`
					: ""
			}
			<div class="form-scroll">
				<div class="form-card">

					<!-- Progress -->
					<div class="form-steps-mobile">
						<div class="form-step-mobile ${isEmail ? "active" : ""}"></div>
						<div class="form-step-mobile ${isCode ? "active" : ""}"></div>
						<div class="form-step-mobile ${isReset ? "active" : ""}"></div>
					</div>

					<!-- Email step -->
					${
						isEmail
							? `
						<div class="form-header-mobile">
							<i class="bi bi-key" style="font-size: 2rem; color: var(--accent);"></i>
							<h1 class="form-heading">Forgot password?</h1>
							<p class="form-sub">Enter your email</p>
						</div>

						${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Error</span></div>` : ""}

						<div class="form-field">
							<label class="form-field-label" for="pwd-email-mobile">Email</label>
							<div class="form-input-wrap">
								<i class="bi bi-envelope form-input-icon"></i>
								<input type="email" id="pwd-email-mobile" class="form-input" placeholder="you@example.com" autocomplete="email" />
							</div>
						</div>

						<button class="form-submit-btn" id="pwd-email-btn-mobile" ${isLoading ? "disabled" : ""}>
							Send code
						</button>

						<p class="form-switch">
							<a href="/auth/login" class="form-switch-link">Back to sign in</a>
						</p>
					`
							: ""
					}

					<!-- Code step -->
					${
						isCode
							? `
						<button class="form-back-btn" id="pwd-back-code-mobile" type="button">
							<i class="bi bi-arrow-left"></i> Back
						</button>

						<h1 class="form-heading">Verify code</h1>
						<p class="form-sub">Check your email</p>

						${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Invalid</span></div>` : ""}

						<div class="form-field">
							<label class="form-field-label" for="pwd-code-mobile">Code</label>
							<div class="form-input-wrap">
								<i class="bi bi-check-circle form-input-icon"></i>
								<input type="text" id="pwd-code-mobile" class="form-input" placeholder="000000" maxlength="6" inputmode="numeric" />
							</div>
						</div>

						<button class="form-submit-btn" id="pwd-code-btn-mobile" ${isLoading ? "disabled" : ""}>
							Verify
						</button>

						<p class="form-resend">
							<button class="form-resend-btn" id="pwd-resend-btn-mobile" type="button">Resend</button>
						</p>
					`
							: ""
					}

					<!-- Reset step -->
					${
						isReset
							? `
						<button class="form-back-btn" id="pwd-back-reset-mobile" type="button">
							<i class="bi bi-arrow-left"></i> Back
						</button>

						<h1 class="form-heading">New password</h1>
						<p class="form-sub">Make it strong</p>

						${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Error</span></div>` : ""}

						<div class="form-field">
							<label class="form-field-label" for="pwd-new-mobile">Password</label>
							<div class="form-input-wrap">
								<i class="bi bi-lock form-input-icon"></i>
								<input type="password" id="pwd-new-mobile" class="form-input" placeholder="Strong password" autocomplete="new-password" ${isLoading ? "disabled" : ""} />
								<button class="form-pwd-toggle" id="pwd-new-toggle-mobile" type="button" tabindex="-1">
									<i class="bi bi-eye"></i>
								</button>
							</div>
						</div>

						<div class="form-field">
							<label class="form-field-label" for="pwd-confirm-mobile">Confirm</label>
							<div class="form-input-wrap">
								<i class="bi bi-lock-fill form-input-icon"></i>
								<input type="password" id="pwd-confirm-mobile" class="form-input" placeholder="Repeat" autocomplete="new-password" ${isLoading ? "disabled" : ""} />
							</div>
						</div>

						<button class="form-submit-btn" id="pwd-reset-btn-mobile" ${isLoading ? "disabled" : ""}>
							${isLoading ? "Resetting..." : "Reset"}
						</button>
					`
							: ""
					}

					<!-- Success -->
					${
						isSuccess
							? `
						<div class="success-state">
							<i class="bi bi-check-circle-fill"></i>
							<h2>Done!</h2>
							<p>Redirecting to login...</p>
						</div>
					`
							: ""
					}
				</div>
			</div>
		</section>
	`);

	root.append(formContent);
	return root.getElement();
};
