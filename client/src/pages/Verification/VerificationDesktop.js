import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Verification.styles.css";

/**
 * VerificationDesktop — Desktop email verification view component
 * @async
 * @param {Object} props
 * @param {string} props.state - "pending" | "verified" | "error" | "expired"
 * @param {Object} props.ctx - Router context
 * @returns {Promise<Element>} The verification page element
 */
export const VerificationDesktop = async ({ state, ctx }) => {
	const root = new CreateElement("div");
	root
		.addClass("verification-page", "desktop-form-page", "app-page")
		.setId("verification-page-desktop");

	const isPending = state === "pending" || !state;
	const isVerified = state === "verified";
	const isError = state === "error";
	const isExpired = state === "expired";

	const content = buildNode(`
		<section class="verification-container">
			${
				isPending
					? `
				<div class="verification-pending">
					<div class="verification-spinner">
						<svg width="48" height="48" fill="none" viewBox="0 0 24 24" class="auth-spinner">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
						</svg>
					</div>
					<h1>Verifying your email</h1>
					<p>Please wait while we verify your email address...</p>
				</div>
			`
					: isVerified
						? `
				<div class="verification-success">
					<i class="bi bi-check-circle-fill"></i>
					<h1>Email verified!</h1>
					<p>Your email has been successfully verified.</p>
					<p class="verification-redirect">Redirecting to your account...</p>
				</div>
			`
						: isError
							? `
				<div class="verification-error">
					<i class="bi bi-exclamation-circle-fill"></i>
					<h1>Verification failed</h1>
					<p>Something went wrong while verifying your email.</p>
					<a href="/auth/register" class="form-submit-btn">Try again</a>
				</div>
			`
							: isExpired
								? `
				<div class="verification-expired">
					<i class="bi bi-clock-history"></i>
					<h1>Link expired</h1>
					<p>This verification link has expired or is invalid.</p>
					<a href="/auth/register" class="form-submit-btn">Create new account</a>
				</div>
			`
								: ""
			}
		</section>
	`);

	root.append(content);
	return root.getElement();
};
