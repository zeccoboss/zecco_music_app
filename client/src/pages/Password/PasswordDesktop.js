import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Password.styles.css";
import { appConfig } from "@zecco/config/app.config";

/**
 * PasswordDesktop — Desktop forgot password view component
 * Multi-step: Email → Code verification → Reset form
 * @async
 * @param {Object} props
 * @param {string} props.state - "email" | "code" | "reset" | "loading" | "success" | "error"
 * @param {Object} props.ctx - Router context
 * @returns {Promise<Element>} The password reset page element
 */
export const PasswordDesktop = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root
		.addClass("password-page", "desktop-form-page", "app-page")
		.setId("password-page-desktop");

	// ── Brand side ──
	const brandSide = () =>
		buildNode(`
			<section class="brand-side">
				<div class="brand-glow brand-glow--1"></div>
				<div class="brand-glow brand-glow--2"></div>
				<div class="brand-logo">
					<div class="brand-logo-icon">
						<i class="bi bi-music-note"></i>
					</div>
					<span class="brand-logo-text">Soniq<span>Stream</span></span>
				</div>
				<div class="brand-body">
					<h2 class="brand-headline">Need help?</h2>
					<p class="brand-tagline">
						Reset your password to regain access to your music account.
					</p>
					<div class="brand-features">
						<div class="brand-feature">
							<i class="bi bi-shield-check"></i>
							<span>Secure process</span>
						</div>
						<div class="brand-feature">
							<i class="bi bi-lightning"></i>
							<span>Quick recovery</span>
						</div>
						<div class="brand-feature">
							<i class="bi bi-key"></i>
							<span>New password</span>
						</div>
					</div>
				</div>
			</section>
		`);

	// ── Form side ──
	const formSide = () => {
		const isLoading = state === "loading";
		const isEmail = state === "email" || !state;
		const isCode = state === "code";
		const isReset = state === "reset";
		const isSuccess = state === "success";
		const isError = state === "error";

		return buildNode(`
			<section class="form-side" id="password-form-side">
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

						<!-- STEP 1: Email -->
						${
							isEmail
								? `
							<h1 class="form-heading">Forgot password?</h1>
							<p class="form-sub">Enter your email address and we'll send you a reset code</p>

							${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Error sending reset code</span></div>` : ""}

							<div class="form-field">
								<label class="form-field-label" for="pwd-email">Email address</label>
								<div class="form-input-wrap">
									<i class="bi bi-envelope form-input-icon"></i>
									<input type="email" id="pwd-email" class="form-input" placeholder="youremail@example.com" autocomplete="email" />
								</div>
							</div>

							<button class="form-submit-btn" id="pwd-email-btn" ${isLoading ? "disabled" : ""}>
								Send reset code
							</button>

							<p class="form-switch">
								<a href="/auth/login" class="form-switch-link">Back to sign in</a>
							</p>
						`
								: ""
						}

						<!-- STEP 2: Code verification -->
						${
							isCode
								? `
							<button class="form-back-btn" id="pwd-back-code" type="button">
								<i class="bi bi-arrow-left"></i> Back
							</button>

							<h1 class="form-heading">Verify code</h1>
							<p class="form-sub">Enter the code we sent to your email</p>

							${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Invalid code</span></div>` : ""}

							<div class="form-field">
								<label class="form-field-label" for="pwd-code">Reset code</label>
								<div class="form-input-wrap">
									<i class="bi bi-check-circle form-input-icon"></i>
									<input type="text" id="pwd-code" class="form-input" placeholder="000000" maxlength="6" inputmode="numeric" />
								</div>
								<span class="form-field-hint">6-digit code</span>
							</div>

							<button class="form-submit-btn" id="pwd-code-btn" ${isLoading ? "disabled" : ""}>
								Verify code
							</button>

							<p class="form-resend">
								Didn't receive it?
								<button class="form-resend-btn" id="pwd-resend-btn" type="button">Resend code</button>
							</p>
						`
								: ""
						}

						<!-- STEP 3: Reset password -->
						${
							isReset
								? `
							<button class="form-back-btn" id="pwd-back-reset" type="button">
								<i class="bi bi-arrow-left"></i> Back
							</button>

							<h1 class="form-heading">Create new password</h1>
							<p class="form-sub">Make it strong and unique</p>

							${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Password reset failed</span></div>` : ""}

							<div class="form-field">
								<label class="form-field-label" for="pwd-new">New password</label>
								<div class="form-input-wrap">
									<i class="bi bi-lock form-input-icon"></i>
									<input type="password" id="pwd-new" class="form-input" placeholder="Create a strong password" autocomplete="new-password" ${isLoading ? "disabled" : ""} />
									<button class="form-pwd-toggle" id="pwd-new-toggle" type="button" tabindex="-1">
										<i class="bi bi-eye"></i>
									</button>
								</div>
							</div>

							<div class="form-field">
								<label class="form-field-label" for="pwd-confirm">Confirm password</label>
								<div class="form-input-wrap">
									<i class="bi bi-lock-fill form-input-icon"></i>
									<input type="password" id="pwd-confirm" class="form-input" placeholder="Repeat password" autocomplete="new-password" ${isLoading ? "disabled" : ""} />
								</div>
							</div>

							<button class="form-submit-btn" id="pwd-reset-btn" ${isLoading ? "disabled" : ""}>
								${isLoading ? "Resetting..." : "Reset password"}
							</button>
						`
								: ""
						}

						<!-- SUCCESS -->
						${
							isSuccess
								? `
							<div class="success-state">
								<i class="bi bi-check-circle-fill"></i>
								<h2>Password reset!</h2>
								<p>Your password has been updated. Redirecting to login...</p>
							</div>
						`
								: ""
						}
					</div>
				</div>
			</section>
		`);
	};

	root.append(brandSide(), formSide());
	return root.getElement();
};
