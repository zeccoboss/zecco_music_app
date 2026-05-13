/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <explanation> */
import { writeToSessionStorage } from "@zecco/services/storage/session-storage.js";
// import "./VerificationPage.s.css";
import { buildNode } from "@zecco/utils/dom/build-node";
import CreateElement from "@zecco/utils/dom/create-element";

// ── Tab communication via BroadcastChannel ────────────────────────────────────
// When the email link opens this page in a new tab, it:
//   1. Verifies the token server-side
//   2. On success — broadcasts the result to any existing app tab, then closes itself
//   3. If no app tab is open — stays open and shows a redirect button
//   4. On failure — stays open and shows the error + options
//
// The main app listens on the same channel and reacts accordingly
// (show stepThree on PasswordPage, or auto-login on RegisterPage)

const CHANNEL_NAME = "soniqstream_verify";

// ── Sub-section IDs ──────────────────────────────────────────────────────────
const IDS = {
	loading: "verify-loading",
	success: "verify-success",
	error: "verify-error",
};

const VerificationPage = () => {
	const page = new CreateElement("div");
	page.setId("verification-page");
	page.addClass("verification-page", "app-page");

	// ── Private view factories ───────────────────────────────────────────────

	// Always visible shell — background blobs etc
	const shell = () =>
		buildNode(`
			<div class="verify-shell">
				<div class="verify-blob verify-blob--1"></div>
				<div class="verify-blob verify-blob--2"></div>

				<div class="verify-logo">
					<div class="verify-logo-icon">
						<i class="bi bi-music-note"></i>
					</div>
					<span class="verify-logo-text">Soniq<span>Stream</span></span>
				</div>
			</div>
		`);

	// STATE 1 — verifying (shown immediately on mount)
	const loadingState = () =>
		buildNode(`
			<div class="verify-sub-section" id="${IDS.loading}" data-content="loading">
				<div class="verify-card">
					<div class="verify-spinner-wrap">
						<svg width="40" height="40" fill="none" viewBox="0 0 24 24" class="verify-spinner">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"
								stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
						</svg>
					</div>
					<h2 class="verify-card-title">Verifying your link</h2>
					<p class="verify-card-sub">
						Please wait while we validate your link.
						This tab will close automatically if successful.
					</p>
					<div class="verify-token-display" id="verify-token-display">
						<i class="bi bi-key"></i>
						<span id="verify-token-text">Reading token...</span>
					</div>
				</div>
			</div>
		`);

	// STATE 2 — verified successfully (shown briefly before tab closes)
	const successState = () =>
		buildNode(`
			<div class="verify-sub-section" id="${IDS.success}" data-content="success">
				<div class="verify-card verify-card--success">
					<div class="verify-state-icon verify-state-icon--success">
						<i class="bi bi-check-lg"></i>
					</div>
					<h2 class="verify-card-title">Link verified!</h2>
					<p class="verify-card-sub" id="verify-success-msg">
						Your link is valid. Returning you to the app now.
						This tab will close in a moment.
					</p>
					<div class="verify-closing-note" id="verify-closing-note">
						<i class="bi bi-x-circle"></i>
						Closing tab...
					</div>
					<!-- Fallback — shown only if window.close() is blocked -->
					<div id="verify-success-fallback" hidden>
						<p class="verify-fallback-note">
							Couldn't close this tab automatically.
						</p>
						<a href="/" class="verify-redirect-btn" id="verify-go-home-btn">
							<i class="bi bi-house"></i>
							Open App
						</a>
					</div>
				</div>
			</div>
		`);

	// STATE 3 — error (invalid / expired token, stays open)
	const errorState = () =>
		buildNode(`
			<div class="verify-sub-section" id="${IDS.error}" data-content="error">
				<div class="verify-card verify-card--error">
					<div class="verify-state-icon verify-state-icon--error">
						<i class="bi bi-x-lg"></i>
					</div>
					<h2 class="verify-card-title">Invalid link</h2>
					<p class="verify-card-sub" id="verify-error-msg">
						This link is invalid or has already been used.
						Go back to the app and request a new one.
					</p>

					<div class="verify-error-detail" id="verify-error-detail">
						<i class="bi bi-shield-x"></i>
						<span id="verify-error-reason">Token expired or already used.</span>
					</div>

					<!-- Primary CTA — sends message to app tab then closes this one -->
					<button class="verify-redirect-btn verify-redirect-btn--primary" id="verify-request-new-btn">
						<i class="bi bi-arrow-clockwise"></i>
						Request New Link
					</button>

					<p class="verify-or-note">or</p>

					<a href="/" class="verify-redirect-btn verify-redirect-btn--ghost" id="verify-open-app-btn">
						<i class="bi bi-house"></i>
						Open App
					</a>

					<p class="verify-close-note" id="verify-close-note">
						Clicking "Request New Link" will send a message to the app tab then close this tab.
					</p>
				</div>
			</div>
		`);

	// ── Assemble ─────────────────────────────────────────────────────────────
	page.append(shell(), loadingState(), successState(), errorState());

	// ── Verification logic (runs after DOM is assembled) ─────────────────────
	// Uses a microtask so the element is returned and appended to #app first
	Promise.resolve().then(() => initVerification(page.getElement()));

	return page.getElement();
};

// ── Core verification logic ──────────────────────────────────────────────────
function initVerification(root) {
	const $ = (id) => root.querySelector(`#${id}`);

	// helpers — show/hide sub-sections
	const show = (id) => {
		root
			.querySelectorAll(".verify-sub-section")
			.forEach((el) => el.classList.remove("active-verify-section"));
		$(id)?.classList.add("active-verify-section");
	};

	// Parse token + type from URL
	// Expected: /auth/verify?token=xxx&type=reset|register
	const params = new URLSearchParams(window.location.search);
	const token = params.get("token") || "";
	const type = params.get("type") || "register"; // "reset" | "register"

	// Show token preview in loading card
	const tokenText = $("verify-token-text");
	if (tokenText) tokenText.textContent = `token: ${token.slice(0, 16)}...`;

	// Start in loading state
	show(IDS.loading);

	// Open BroadcastChannel to talk to the existing app tab
	let channel = null;
	try {
		channel = new BroadcastChannel(CHANNEL_NAME);
	} catch (_) {}

	// ── Attempt verification ─────────────────────────────────────────────────
	verifyToken(token, type)
		.then((result) => {
			if (result.ok) {
				handleSuccess(result, type);
			} else {
				handleError(result.message);
			}
		})
		.catch(() => handleError("Network error. Please try again."));

	// ── Success handler ──────────────────────────────────────────────────────
	function handleSuccess(result, type) {
		show(IDS.success);

		const msg = $("verify-success-msg");
		if (msg) {
			msg.textContent =
				type === "reset"
					? "Your reset link is valid. Returning you to the app to set your new password."
					: "Email verified! Logging you in now.";
		}

		// Broadcast to the app tab
		channel?.postMessage({
			type: type === "reset" ? "RESET_VERIFIED" : "REGISTER_VERIFIED",
			token: result.resetToken || token,
			userId: result.userId || null,
			session: result.session || null,
		});

		// Try to close this tab after a short delay
		setTimeout(() => {
			try {
				window.close();
				// If still open after 800ms, show fallback button
				setTimeout(() => {
					const fallback = $("verify-success-fallback");
					const closing = $("verify-closing-note");
					if (document.visibilityState !== "hidden") {
						if (fallback) fallback.removeAttribute("hidden");
						if (closing) closing.style.display = "none";
					}
				}, 800);
			} catch (_) {
				// window.close() blocked — show fallback
				const fallback = $("verify-success-fallback");
				const closing = $("verify-closing-note");
				if (fallback) fallback.removeAttribute("hidden");
				if (closing) closing.style.display = "none";
			}
		}, 1400);
	}

	// ── Error handler ────────────────────────────────────────────────────────
	function handleError(message) {
		show(IDS.error);

		const reason = $("verify-error-reason");
		if (reason)
			reason.textContent = message || "Token expired or already used.";

		// "Request New Link" — broadcast to app tab then close
		$("verify-request-new-btn")?.addEventListener("click", () => {
			channel?.postMessage({ type: "VERIFY_FAILED", reason: message });
			// Give message time to land before closing
			setTimeout(() => {
				try {
					window.close();
				} catch (_) {
					// If can't close redirect to app
					window.location.href = "/";
				}
			}, 400);
		});

		// "Open App" fallback link
		$("verify-open-app-btn")?.addEventListener("click", (e) => {
			// If an app tab already exists, focus it via channel then close
			channel?.postMessage({ type: "FOCUS_APP" });
			// Let the link navigate if channel didn't work
		});
	}
}

// ── Token verification API call ──────────────────────────────────────────────
// Replace the URL with your actual API endpoint
async function verifyToken(token, type) {
	if (!token) return { ok: false, message: "No token provided." };

	const endpoint =
		type === "reset"
			? `/api/auth/verify-reset?token=${encodeURIComponent(token)}`
			: `/api/auth/verify-email?token=${encodeURIComponent(token)}`;

	const res = await fetch(endpoint);
	return res.json();
}

// ── Main app tab — listen for messages from verification tab ─────────────────
// Call this once in your init-app.js so the app reacts when the verify tab posts
export function initVerifyListener() {
	let channel = null;
	try {
		channel = new BroadcastChannel(CHANNEL_NAME);
	} catch (_) {
		return;
	}

	channel.addEventListener("message", (e) => {
		const { type, token, userId, session } = e.data;

		switch (type) {
			case "RESET_VERIFIED":
				// Navigate the app to the forgot-password page and show step 3
				import("../../routes/router.js").then(({ router }) => {
					router.navigate("/auth/forgot-password");
					// Show step 3 after a tick so the page is mounted
					requestAnimationFrame(() => {
						document
							.querySelectorAll(".pwd-step")
							.forEach((el) => el.classList.remove("active-pwd-step"));
						document
							.getElementById("pwd-step-three")
							?.classList.add("active-pwd-step");
						// Store token so step-3 submit can use it
						sessionStorage.setItem("resetToken", token);
					});
				});
				break;

			case "REGISTER_VERIFIED":
				// User is verified — auto-login using session from API response
				// then redirect to home
				if (session) {
					// store session / token however your auth service works
					// sessionStorage.setItem("session", JSON.stringify(session));
					writeToSessionStorage("session", session);
				}
				import("../../routes/router.js").then(({ router }) => {
					router.navigate("/");
				});
				break;

			case "VERIFY_FAILED":
				// Verification tab told us it failed — navigate to forgot-password
				// and show the token-expired step
				import("../../routes/router.js").then(({ router }) => {
					router.navigate("/auth/forgot-password");
					requestAnimationFrame(() => {
						document
							.querySelectorAll(".pwd-step")
							.forEach((el) => el.classList.remove("active-pwd-step"));
						document
							.getElementById("pwd-step-five")
							?.classList.add("active-pwd-step");
					});
				});
				break;

			case "FOCUS_APP":
				// Verification tab wants to bring this window into focus
				window.focus();
				break;
		}
	});
}

export { VerificationPage };
