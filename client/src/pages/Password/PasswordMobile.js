import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Password.styles.css";

/**
 * PasswordMobile — Mobile forgot password view
 *
 * Same 5 steps as desktop, single-column full viewport.
 *
 * @async
 * @param {Object} props
 * @param {number} props.step
 * @param {string} props.dir
 * @param {string} props.state
 * @param {string} props.error
 * @param {Object} props.draft
 * @param {Object} props.ctx
 * @returns {Promise<Element>}
 */
export const PasswordMobile = async ({
	step = 1,
	dir = "forward",
	state = "idle",
	error = "",
	draft = {},
	ctx,
}) => {
	const root = new CreateElement("section");
	root.addClass("pwd-mob-page").setId("password-page-mobile");

	const stepIndicator = () => {
		if (step >= 4) return "";
		return `
			<div class="pwd-steps" aria-label="Password reset progress">
				${[1, 2, 3]
					.map(
						(n) => `
					<div class="pwd-step ${n === step ? "active" : n < step ? "done" : ""}"
						aria-label="Step ${n}"></div>
				`,
					)
					.join("")}
			</div>
		`;
	};

	// ── Step 1 ───────────────────────────────────────────────
	const step1 = () => `
		<div class="pwd-slide" data-step="1">
			<div class="pwd-step-icon pwd-step-icon--blue">
				<i class="bi bi-envelope"></i>
			</div>
			<h2 class="pwd-heading">Forgot your password?</h2>
			<p class="pwd-sub">
				Enter your email and we'll send you a reset link.
			</p>

			<div class="pwd-form" id="pwd-mob-form-1">
				<div class="pwd-field">
					<label class="pwd-label" for="pwd-mob-email">Email address</label>
					<input
						class="pwd-input ${state === "error" ? "pwd-input--error" : ""}"
						id="pwd-mob-email"
						type="email"
						placeholder="ada@example.com"
						autocomplete="email"
						value="${draft.email ?? ""}"
						${state === "loading" ? "disabled" : ""}
					/>
				</div>

				<div class="pwd-field-error ${state === "error" && error ? "" : "hidden"}"
					id="pwd-mob-step1-error" role="alert">
					<i class="bi bi-exclamation-circle"></i>
					<span>${error || ""}</span>
				</div>

				<button class="pwd-submit-btn" id="pwd-mob-send-btn" type="button"
					${state === "loading" ? "disabled" : ""}>
					${
						state === "loading"
							? `<svg class="pwd-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"
									stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
							</svg> Sending...`
							: `Send Reset Link <i class="bi bi-arrow-right"></i>`
					}
				</button>
			</div>

			<p class="pwd-switch">
				Remember your password? <a href="/auth/login" data-replace>Sign in</a>
			</p>
		</div>
	`;

	// ── Step 2 ───────────────────────────────────────────────
	const step2 = () => `
		<div class="pwd-slide" data-step="2">
			<div class="pwd-step-icon pwd-step-icon--green">
				<i class="bi bi-send-check"></i>
			</div>
			<h2 class="pwd-heading">Check your inbox</h2>
			<p class="pwd-sub">
				We sent a reset link to
				<strong class="pwd-email-highlight">${draft.email ?? "your email"}</strong>.
				It expires in 15 minutes.
			</p>

			<div class="pwd-inbox-actions">
				<p class="pwd-resend-note">Didn't get it? Check your spam or</p>
				<button class="pwd-resend-btn" id="pwd-mob-resend-btn" type="button">
					<i class="bi bi-arrow-clockwise"></i>
					Resend email
					<span class="pwd-countdown hidden" id="pwd-mob-countdown">(60s)</span>
				</button>
			</div>

			<button class="pwd-ghost-btn" id="pwd-mob-back-to-email" type="button">
				<i class="bi bi-arrow-left"></i> Use a different email
			</button>
		</div>
	`;

	// ── Step 3 ───────────────────────────────────────────────
	const step3 = () => `
		<div class="pwd-slide" data-step="3">
			<div class="pwd-step-icon pwd-step-icon--purple">
				<i class="bi bi-lock"></i>
			</div>
			<h2 class="pwd-heading">Create new password</h2>
			<p class="pwd-sub">Choose a strong password for your account.</p>

			<div class="pwd-form" id="pwd-mob-form-3">
				<div class="pwd-field">
					<label class="pwd-label" for="pwd-mob-new">New password</label>
					<div class="pwd-input-eye-wrap">
						<input
							class="pwd-input"
							id="pwd-mob-new"
							type="password"
							placeholder="Create a new password"
							autocomplete="new-password"
							${state === "loading" ? "disabled" : ""}
						/>
						<button class="pwd-eye-btn" id="pwd-mob-new-eye" type="button"
							aria-label="Toggle visibility">
							<i class="bi bi-eye"></i>
						</button>
					</div>
					<div class="pwd-strength" id="pwd-mob-strength">
						<div class="pwd-strength-bars">
							<div class="pwd-strength-bar" id="psb-mob-1"></div>
							<div class="pwd-strength-bar" id="psb-mob-2"></div>
							<div class="pwd-strength-bar" id="psb-mob-3"></div>
							<div class="pwd-strength-bar" id="psb-mob-4"></div>
						</div>
						<span class="pwd-strength-label" id="pwd-mob-strength-label">Enter a password</span>
					</div>
				</div>

				<div class="pwd-field">
					<label class="pwd-label" for="pwd-mob-confirm">Confirm password</label>
					<div class="pwd-input-eye-wrap">
						<input
							class="pwd-input"
							id="pwd-mob-confirm"
							type="password"
							placeholder="Repeat your password"
							autocomplete="new-password"
							${state === "loading" ? "disabled" : ""}
						/>
						<button class="pwd-eye-btn" id="pwd-mob-confirm-eye" type="button"
							aria-label="Toggle visibility">
							<i class="bi bi-eye"></i>
						</button>
					</div>
				</div>

				<div class="pwd-field-error ${state === "error" && error ? "" : "hidden"}"
					id="pwd-mob-step3-error" role="alert">
					<i class="bi bi-exclamation-circle"></i>
					<span>${error || ""}</span>
				</div>

				<button class="pwd-submit-btn" id="pwd-mob-update-btn" type="button"
					${state === "loading" ? "disabled" : ""}>
					${
						state === "loading"
							? `<svg class="pwd-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"
									stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
							</svg> Updating...`
							: `Update Password <i class="bi bi-check-lg"></i>`
					}
				</button>
			</div>
		</div>
	`;

	// ── Step 4 ───────────────────────────────────────────────
	const step4 = () => `
		<div class="pwd-slide pwd-slide--centered" data-step="4">
			<div class="pwd-success-ring">
				<i class="bi bi-check-lg"></i>
			</div>
			<h2 class="pwd-heading">Password updated!</h2>
			<p class="pwd-sub">
				Your password has been changed. You can now sign in.
			</p>
			<a href="/auth/login" class="pwd-submit-btn" data-replace>
				Go to Login <i class="bi bi-arrow-right"></i>
			</a>
		</div>
	`;

	// ── Step 5 ───────────────────────────────────────────────
	const step5 = () => `
		<div class="pwd-slide pwd-slide--centered" data-step="5">
			<div class="pwd-expired-icon">
				<i class="bi bi-clock-history"></i>
			</div>
			<h2 class="pwd-heading">Link expired</h2>
			<p class="pwd-sub">
				This reset link has expired or already been used.
				Request a new one below.
			</p>
			<button class="pwd-submit-btn" id="pwd-mob-request-new-btn" type="button">
				<i class="bi bi-arrow-clockwise"></i> Request New Link
			</button>
			<p class="pwd-switch">
				<a href="/auth/login" data-replace>Back to Login</a>
			</p>
		</div>
	`;

	const getStepContent = () => {
		switch (step) {
			case 2:
				return step2();
			case 3:
				return step3();
			case 4:
				return step4();
			case 5:
				return step5();
			default:
				return step1();
		}
	};

	root.append(
		buildNode(`
		<div class="pwd-mob-layout">

			<!-- Top bar -->
			<div class="pwd-mob-topbar">
				<div class="pwd-mob-brand">
					<div class="pwd-mob-brand-icon">
						<i class="bi bi-music-note-beamed"></i>
					</div>
					<span class="pwd-mob-brand-name">Zecco<span>Stream</span></span>
				</div>
				<a href="/auth/login" class="pwd-mob-back-link" data-replace>
					<i class="bi bi-arrow-left"></i> Login
				</a>
			</div>

			${stepIndicator()}

			<div class="pwd-slide-container" id="pwd-mob-slide-container"
				data-step="${step}" data-dir="${dir}">
				${getStepContent()}
			</div>

		</div>
	`),
	);

	return root.getElement();
};
