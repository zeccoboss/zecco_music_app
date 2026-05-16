import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Password.styles.css";

/**
 * PasswordDesktop — Desktop forgot password view
 *
 * Steps via ?step=1|2|3|4|5:
 *   1 → email input
 *   2 → check inbox + resend + countdown
 *   3 → new password + confirm (arrived via email link with token)
 *   4 → success
 *   5 → token expired
 *
 * Same two-column layout as Login/Register.
 *
 * @async
 * @param {Object} props
 * @param {number} props.step
 * @param {string} props.dir      — "forward" | "back"
 * @param {string} props.state    — "idle" | "loading" | "error"
 * @param {string} props.error
 * @param {Object} props.draft    — { email, token }
 * @param {Object} props.ctx
 * @returns {Promise<Element>}
 */
export const PasswordDesktop = async ({
	step = 1,
	dir = "forward",
	state = "idle",
	error = "",
	draft = {},
	ctx,
}) => {
	const root = new CreateElement("section");
	root.addClass("pwd-page").setId("password-page");

	// ── Step indicator (steps 1–3 only, not shown on 4/5) ───
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

	// ── Step 1 — Email ───────────────────────────────────────
	const step1 = () => `
		<div class="pwd-slide" data-step="1">
			<div class="pwd-step-icon pwd-step-icon--blue">
				<i class="bi bi-envelope"></i>
			</div>
			<h2 class="pwd-heading">Forgot your password?</h2>
			<p class="pwd-sub">
				No worries. Enter your email and we'll send you a reset link.
			</p>

			<div class="pwd-form" id="pwd-form-1">
				<div class="pwd-field">
					<label class="pwd-label" for="pwd-email">Email address</label>
					<input
						class="pwd-input ${state === "error" ? "pwd-input--error" : ""}"
						id="pwd-email"
						type="email"
						placeholder="ada@example.com"
						autocomplete="email"
						value="${draft.email ?? ""}"
						${state === "loading" ? "disabled" : ""}
					/>
				</div>

				<div class="pwd-field-error ${state === "error" && error ? "" : "hidden"}"
					id="pwd-step1-error" role="alert">
					<i class="bi bi-exclamation-circle"></i>
					<span>${error || ""}</span>
				</div>

				<button class="pwd-submit-btn" id="pwd-send-btn" type="button"
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

	// ── Step 2 — Check inbox ─────────────────────────────────
	const step2 = () => `
		<div class="pwd-slide" data-step="2">
			<div class="pwd-step-icon pwd-step-icon--green">
				<i class="bi bi-send-check"></i>
			</div>
			<h2 class="pwd-heading">Check your inbox</h2>
			<p class="pwd-sub">
				We sent a password reset link to
				<strong class="pwd-email-highlight">${draft.email ?? "your email"}</strong>.
				It expires in 15 minutes.
			</p>

			<div class="pwd-inbox-actions">
				<p class="pwd-resend-note">
					Didn't get it? Check your spam folder or
				</p>
				<button class="pwd-resend-btn" id="pwd-resend-btn" type="button">
					<i class="bi bi-arrow-clockwise"></i>
					Resend email
					<span class="pwd-countdown hidden" id="pwd-countdown">(60s)</span>
				</button>
			</div>

			<button class="pwd-ghost-btn" id="pwd-back-to-email" type="button">
				<i class="bi bi-arrow-left"></i> Use a different email
			</button>
		</div>
	`;

	// ── Step 3 — New password ────────────────────────────────
	const step3 = () => `
		<div class="pwd-slide" data-step="3">
			<div class="pwd-step-icon pwd-step-icon--purple">
				<i class="bi bi-lock"></i>
			</div>
			<h2 class="pwd-heading">Create new password</h2>
			<p class="pwd-sub">
				Choose a strong password for your account.
			</p>

			<div class="pwd-form" id="pwd-form-3">
				<div class="pwd-field">
					<label class="pwd-label" for="pwd-new">New password</label>
					<div class="pwd-input-eye-wrap">
						<input
							class="pwd-input"
							id="pwd-new"
							type="password"
							placeholder="Create a new password"
							autocomplete="new-password"
							${state === "loading" ? "disabled" : ""}
						/>
						<button class="pwd-eye-btn" id="pwd-new-eye" type="button"
							aria-label="Toggle visibility">
							<i class="bi bi-eye"></i>
						</button>
					</div>
					<div class="pwd-strength" id="pwd-strength">
						<div class="pwd-strength-bars">
							<div class="pwd-strength-bar" id="psb-1"></div>
							<div class="pwd-strength-bar" id="psb-2"></div>
							<div class="pwd-strength-bar" id="psb-3"></div>
							<div class="pwd-strength-bar" id="psb-4"></div>
						</div>
						<span class="pwd-strength-label" id="pwd-strength-label">Enter a password</span>
					</div>
				</div>

				<div class="pwd-field">
					<label class="pwd-label" for="pwd-confirm">Confirm password</label>
					<div class="pwd-input-eye-wrap">
						<input
							class="pwd-input"
							id="pwd-confirm"
							type="password"
							placeholder="Repeat your password"
							autocomplete="new-password"
							${state === "loading" ? "disabled" : ""}
						/>
						<button class="pwd-eye-btn" id="pwd-confirm-eye" type="button"
							aria-label="Toggle visibility">
							<i class="bi bi-eye"></i>
						</button>
					</div>
				</div>

				<div class="pwd-field-error ${state === "error" && error ? "" : "hidden"}"
					id="pwd-step3-error" role="alert">
					<i class="bi bi-exclamation-circle"></i>
					<span>${error || ""}</span>
				</div>

				<button class="pwd-submit-btn" id="pwd-update-btn" type="button"
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

	// ── Step 4 — Success ─────────────────────────────────────
	const step4 = () => `
		<div class="pwd-slide pwd-slide--centered" data-step="4">
			<div class="pwd-success-ring">
				<i class="bi bi-check-lg"></i>
			</div>
			<h2 class="pwd-heading">Password updated!</h2>
			<p class="pwd-sub">
				Your password has been changed successfully.
				You can now sign in with your new password.
			</p>
			<a href="/auth/login" class="pwd-submit-btn" data-replace>
				Go to Login <i class="bi bi-arrow-right"></i>
			</a>
		</div>
	`;

	// ── Step 5 — Token expired ───────────────────────────────
	const step5 = () => `
		<div class="pwd-slide pwd-slide--centered" data-step="5">
			<div class="pwd-expired-icon">
				<i class="bi bi-clock-history"></i>
			</div>
			<h2 class="pwd-heading">Link expired</h2>
			<p class="pwd-sub">
				This password reset link has expired or already been used.
				Request a new one and try again.
			</p>
			<button class="pwd-submit-btn" id="pwd-request-new-btn" type="button">
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
		<div class="pwd-layout">

			<!-- ── Branded left panel ── -->
			<div class="pwd-brand-panel">
				<div class="pwd-brand-content">
					<div class="pwd-brand-icon">
						<i class="bi bi-music-note-beamed"></i>
					</div>
					<h1 class="pwd-brand-name">Soniq<span>Stream</span></h1>
					<p class="pwd-brand-tag">
						Upload, discover and share African music
						with a global community of artists and fans.
					</p>
					<div class="pwd-brand-pills">
						<span class="pwd-brand-pill"><i class="bi bi-shield-check"></i> Secure accounts</span>
						<span class="pwd-brand-pill"><i class="bi bi-envelope-check"></i> Email verified</span>
						<span class="pwd-brand-pill"><i class="bi bi-lock"></i> Encrypted data</span>
					</div>
				</div>
				<div class="pwd-vinyl" aria-hidden="true"></div>
			</div>

			<!-- ── Form right panel ── -->
			<div class="pwd-form-panel">
				<a href="/auth/login" class="pwd-back-link" data-replace>
					<i class="bi bi-arrow-left"></i> Back to Login
				</a>

				${stepIndicator()}

				<div class="pwd-slide-container" id="pwd-slide-container"
					data-step="${step}" data-dir="${dir}">
					${getStepContent()}
				</div>
			</div>

		</div>
	`),
	);

	return root.getElement();
};
