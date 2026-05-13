import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Login.styles.css";

/**
 * LoginDesktop — Desktop login view component
 * Renders full viewport form with brand messaging
 * @async
 * @param {Object} props
 * @param {string} props.state - "form" | "loading" | "error"
 * @param {Object} props.ctx - Router context
 * @returns {Promise<Element>} The login page element
 */
export const LoginDesktop = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root
		.addClass("login-page", "desktop-form-page", "app-page")
		.setId("login-page-desktop");

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
					<h2 class="brand-headline">Your music.<br>Your world.</h2>
					<p class="brand-tagline">
						Stream millions of tracks, upload your own music and follow the artists you love.
					</p>
					<div class="brand-features">
						<div class="brand-feature">
							<i class="bi bi-vinyl-fill"></i>
							<span>Millions of tracks</span>
						</div>
						<div class="brand-feature">
							<i class="bi bi-cloud-upload-fill"></i>
							<span>Upload your music</span>
						</div>
						<div class="brand-feature">
							<i class="bi bi-people-fill"></i>
							<span>Follow artists</span>
						</div>
					</div>
				</div>
			</section>
		`);

	// ── Form side ──
	const formSide = () => {
		const isLoading = state === "loading";
		const isError = state === "error";

		return buildNode(`
			<section class="form-side" id="login-form-side">
				${
					isLoading
						? `
					<div class="auth-loading-overlay" id="login-loading-overlay">
						<svg width="28" height="28" fill="none" viewBox="0 0 24 24" class="auth-spinner">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
						</svg>
						<span>Signing you in...</span>
					</div>
				`
						: ""
				}
				<div class="form-scroll">
					<div class="form-card">
						<h1 class="form-heading">Welcome back</h1>
						<p class="form-sub">Sign in to continue to your music</p>

						${
							isError
								? `
							<div class="form-error-banner" id="login-error-banner">
								<i class="bi bi-exclamation-circle-fill"></i>
								<span id="login-error-msg">Invalid email or password.</span>
							</div>
						`
								: ""
						}

						<div class="oauth-btns">
							<a href="/api/auth/google" class="oauth-btn" id="login-google-btn">
								<i class="bi bi-google"></i>
								Continue with Google
							</a>
							<a href="/api/auth/github" class="oauth-btn" id="login-github-btn">
								<i class="bi bi-github"></i>
								Continue with GitHub
							</a>
						</div>

						<div class="form-divider"><span>or sign in with email</span></div>

						<div class="form-field">
							<label class="form-field-label" for="login-email">Email address</label>
							<div class="form-input-wrap">
								<i class="bi bi-envelope form-input-icon"></i>
								<input
									type="email"
									id="login-email"
									class="form-input"
									placeholder="youremail@example.com"
									autocomplete="email"
									${isLoading ? "disabled" : ""}
								/>
							</div>
						</div>

						<div class="form-field">
							<div class="form-field-head">
								<label class="form-field-label" for="login-password">Password</label>
								<a href="/auth/forgot-password" class="form-forgot-link">Forgot password?</a>
							</div>
							<div class="form-input-wrap">
								<i class="bi bi-lock form-input-icon"></i>
								<input
									type="password"
									id="login-password"
									class="form-input"
									placeholder="Enter your password"
									autocomplete="current-password"
									${isLoading ? "disabled" : ""}
								/>
								<button class="form-pwd-toggle" id="login-pwd-toggle" type="button" tabindex="-1">
									<i class="bi bi-eye" id="login-pwd-icon"></i>
								</button>
							</div>
						</div>

						<button class="form-submit-btn" id="login-submit-btn" ${isLoading ? "disabled" : ""}>
							${isLoading ? "Signing in..." : "Sign In"}
						</button>

						<p class="form-switch">
							Don't have an account?
							<a href="/auth/register" class="form-switch-link">Create one</a>
						</p>
					</div>
				</div>
			</section>
		`);
	};

	root.append(brandSide(), formSide());
	return root.getElement();
};
