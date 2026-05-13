import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Register.styles.css";
import { appConfig } from "@zecco/config/app.config";

/**
 * RegisterDesktop — Desktop registration view component
 * Multi-step form: Name/Username/Email → Password → Preferences
 * @async
 * @param {Object} props
 * @param {string} props.state - "step1" | "step2" | "step3" | "loading" | "error" | "success"
 * @param {Object} props.ctx - Router context
 * @returns {Promise<Element>} The register page element
 */ 2;
export const RegisterDesktop = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root
		.addClass("register-page", "desktop-form-page", "app-page")
		.setId("register-page-desktop");

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
					<h2 class="brand-headline">Join the<br>stream.</h2>
					<p class="brand-tagline">
						Create your free account and start listening, uploading and discovering new music today.
					</p>
					<div class="brand-features">
						<div class="brand-feature">v
							<i class="bi bi-headphones"></i>
							<span>Stream for free</span>
						</div>
						<div class="brand-feature">
							<i class="bi bi-cloud-upload-fill"></i>
							<span>Upload your tracks</span>
						</div>
						<div class="brand-feature">
							<i class="bi bi-heart-fill"></i>
							<span>Build your library</span>
						</div>
					</div>
				</div>
			</section>
		`);

	// ── Form side with multi-step ──
	const formSide = () => {
		const isLoading = state === "loading";
		const isStep1 = state === "step1" || !state;
		const isStep2 = state === "step2";
		const isStep3 = state === "step3";
		const isError = state === "error";
		const isSuccess = state === "success";

		return buildNode(`
			<section class="form-side" id="register-form-side">
				${
					isLoading
						? `
					<div class="auth-loading-overlay" id="register-loading-overlay">
						<svg width="28" height="28" fill="none" viewBox="0 0 24 24" class="auth-spinner">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
						</svg>
						<span>Creating your account...</span>
					</div>
				`
						: ""
				}
				<div class="form-scroll">
					<div class="form-card">
						<!-- Step indicator -->
						<div class="form-steps" id="register-steps">
							<div class="form-step ${isStep1 ? "active" : ""}" data-step="1"></div>
							<div class="form-step ${isStep2 ? "active" : ""}" data-step="2"></div>
							<div class="form-step ${isStep3 ? "active" : ""}" data-step="3"></div>
						</div>

						<!-- STEP 1: Who are you? -->
						${
							isStep1
								? `
							<h1 class="form-heading">Create account</h1>
							<p class="form-sub">Step 1 of 3 — Start with your name</p>

							<div class="oauth-btns">
								<a href="${appConfig.API_BASE_URL}/oauth/google" class="oauth-btn"  target="_blank" rel="noopener noreferrer">
									<i class="bi bi-google"></i>
									Sign up with Google
								</a>
								<a href="${appConfig.API_BASE_URL}/oauth/github" class="oauth-btn" target="_blank" rel="noopener noreferrer">
									<i class="bi bi-github"></i>
									Sign up with GitHub
								</a>
							</div>

							<div class="form-divider"><span>or continue with email</span></div>

							${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Validation error</span></div>` : ""}

							<div class="form-field">
								<label class="form-field-label" for="reg-fullname">Full name</label>
								<div class="form-input-wrap">
									<i class="bi bi-person form-input-icon"></i>
									<input type="text" id="reg-fullname" class="form-input" placeholder="Your full name" autocomplete="name" />
								</div>
							</div>

							<div class="form-field">
								<label class="form-field-label" for="reg-username">Username</label>
								<div class="form-input-wrap">
									<i class="bi bi-at form-input-icon"></i>
									<input type="text" id="reg-username" class="form-input" placeholder="yourhandle" autocomplete="username" spellcheck="false" />
								</div>
								<span class="form-field-hint">Letters, numbers and underscores only</span>
							</div>

							<div class="form-field">
								<label class="form-field-label" for="reg-email">Email address</label>
								<div class="form-input-wrap">
									<i class="bi bi-envelope form-input-icon"></i>
									<input type="email" id="reg-email" class="form-input" placeholder="youremail@example.com" autocomplete="email" />
								</div>
							</div>

							<button class="form-submit-btn" id="reg-s1-btn" ${isLoading ? "disabled" : ""}>
								Continue <i class="bi bi-arrow-right"></i>
							</button>

							<p class="form-switch">
								Already have an account?
								<a href="/auth/login" class="form-switch-link">Sign in</a>
							</p>
						`
								: ""
						}

						<!-- STEP 2: Secure account -->
						${
							isStep2
								? `
							<button class="form-back-btn" id="reg-s2-back" type="button">
								<i class="bi bi-arrow-left"></i> Back
							</button>

							<h1 class="form-heading">Secure your account</h1>
							<p class="form-sub">Step 2 of 3 — Create a strong password</p>

							${isError ? `<div class="form-error-banner"><i class="bi bi-exclamation-circle-fill"></i><span>Password validation error</span></div>` : ""}

							<div class="form-field">
								<label class="form-field-label" for="reg-password">Password</label>
								<div class="form-input-wrap">
									<i class="bi bi-lock form-input-icon"></i>
									<input type="password" id="reg-password" class="form-input" placeholder="Create a strong password" autocomplete="new-password" ${isLoading ? "disabled" : ""} />
									<button class="form-pwd-toggle" id="reg-pwd-toggle" type="button" tabindex="-1">
										<i class="bi bi-eye" id="reg-pwd-icon"></i>
									</button>
								</div>
								<div class="form-pwd-strength" id="reg-pwd-strength">
									<div class="form-pwd-bars">
										<div class="form-pwd-bar"></div>
										<div class="form-pwd-bar"></div>
										<div class="form-pwd-bar"></div>
										<div class="form-pwd-bar"></div>
									</div>
									<span class="form-pwd-label">Enter a password</span>
								</div>
							</div>

							<div class="form-field">
								<label class="form-field-label" for="reg-confirm">Confirm password</label>
								<div class="form-input-wrap">
									<i class="bi bi-lock-fill form-input-icon"></i>
									<input type="password" id="reg-confirm" class="form-input" placeholder="Repeat your password" autocomplete="new-password" ${isLoading ? "disabled" : ""} />
								</div>
							</div>

							<button class="form-submit-btn" id="reg-s2-btn" ${isLoading ? "disabled" : ""}>
								Continue <i class="bi bi-arrow-right"></i>
							</button>
						`
								: ""
						}

						<!-- STEP 3: Preferences -->
						${
							isStep3
								? `
							<button class="form-back-btn" id="reg-s3-back" type="button">
								<i class="bi bi-arrow-left"></i> Back
							</button>

							<h1 class="form-heading">Almost done</h1>
							<p class="form-sub">Step 3 of 3 — Personalise your experience</p>

							<div class="form-field">
								<label class="form-field-label" for="reg-dob">Date of birth</label>
								<div class="form-input-wrap">
									<i class="bi bi-calendar3 form-input-icon"></i>
									<input type="date" id="reg-dob" class="form-input" />
								</div>
								<span class="form-field-hint">You must be at least 13 to use SoniqStream</span>
							</div>

							<div class="form-field">
								<label class="form-field-label">Gender (optional)</label>
								<div class="form-gender-row">
									<button class="form-gender-btn" data-gender="male" type="button">
										<i class="bi bi-gender-male"></i> Male
									</button>
									<button class="form-gender-btn" data-gender="female" type="button">
										<i class="bi bi-gender-female"></i> Female
									</button>
									<button class="form-gender-btn" data-gender="other" type="button">
										<i class="bi bi-three-dots"></i> Other
									</button>
								</div>
							</div>

							<div class="form-field">
								<label class="form-field-label">
									<input type="checkbox" id="reg-newsletter" class="form-checkbox" />
									Send me news and special offers
								</label>
							</div>

							<button class="form-submit-btn" id="reg-s3-btn" ${isLoading ? "disabled" : ""}>
								${isLoading ? "Creating account..." : "Create Account"}
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
								<h2>Account created!</h2>
								<p>Welcome to SoniqStream. Redirecting...</p>
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
