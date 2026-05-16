import { mobileScreen } from "@zecco/core/screen-break-points.js";
import { VerificationDesktop } from "./VerificationDesktop.js";
import { VerificationMobile } from "./VerificationMobile.js";
import { verificationEvents } from "@zecco/features/verification/verification-events.js";

/**
 * VerificationPage — Email verification orchestrator
 *
 * Route:   /auth/verify?token=xxx&type=reset|register  (outlet: "root")
 * Purpose: Opens in a NEW TAB from the email link.
 *
 * State machine:
 *   verifying → API call → success | error
 *
 * On success:
 *   Broadcasts result to original tab via BroadcastChannel("soniqstream_verify")
 *   then auto-closes this tab after 2s.
 *
 * On error:
 *   Broadcasts VERIFY_FAILED, shows error state with retry action.
 *
 * @async
 * @param {Object} ctx - Router context { query: { token, type } }
 * @returns {Promise<Element>}
 */
export const VerificationPage = async (ctx) => {
	const root = document.createElement("section");
	root.className = "verify-page-root";

	let state = "verifying";
	let errorMsg = "";
	let isMounted = true;

	const token = ctx?.query?.token ?? null;
	const type = ctx?.query?.type === "reset" ? "reset" : "register";

	// ── BroadcastChannel ─────────────────────────────────────
	// Sends results back to the original app tab
	const channel = new BroadcastChannel("soniqstream_verify");

	const isMobile = mobileScreen.matches;
	const UI = isMobile ? VerificationMobile : VerificationDesktop;

	// ── Render ───────────────────────────────────────────────
	// Delegates entirely to Desktop or Mobile view.
	// Same pattern as every other page in the app.
	const render = async () => {
		if (!isMounted) return;
		const view = await UI({ state, type, error: errorMsg, ctx });
		root.replaceChildren(view);
		verificationEvents(root, {
			state,
			type,
			closeTab,
		});
	};

	// ── State updater ────────────────────────────────────────
	const setState = async (newState, msg = "") => {
		state = newState;
		errorMsg = msg;
		await render();
	};

	// ── Close tab helper ─────────────────────────────────────
	const closeTab = () => {
		try {
			window.close();
			// Fallback if window.close() is blocked
			setTimeout(() => {
				document.title = "You can close this tab";
			}, 300);
		} catch {
			/* ignore */
		}
	};

	// ── Token validation ─────────────────────────────────────
	const verifyToken = async () => {
		try {
			if (!isMounted) return;

			// No token — fail immediately
			if (!token) {
				channel.postMessage({
					type: "VERIFY_FAILED",
					reason: "No token provided",
				});
				await setState(
					"error",
					"No verification token was found in the link.",
				);
				return;
			}

			// TODO: replace with real API call
			// const res = await authService.verifyToken({ token, type });
			// if (!res.ok) throw new Error(res.message ?? "Verification failed");

			// Simulated async — remove when wiring real API
			await new Promise((r) => setTimeout(r, 1200));

			if (!isMounted) return;

			// Broadcast result to original tab
			if (type === "reset") {
				channel.postMessage({ type: "RESET_VERIFIED", token });
			} else {
				channel.postMessage({ type: "REGISTER_VERIFIED" });
			}

			// Tell original tab to focus itself
			channel.postMessage({ type: "FOCUS_APP" });

			await setState("success");

			// Auto-close after user sees success state
			setTimeout(() => closeTab(), 2000);
		} catch (err) {
			if (!isMounted) return;
			const reason = err?.message ?? "Verification failed";
			channel.postMessage({ type: "VERIFY_FAILED", reason });
			await setState("error", reason);
		}
	};

	// ── Boot ─────────────────────────────────────────────────
	await render(); // show spinner immediately
	await verifyToken(); // then validate in background

	// ── Lifecycle ────────────────────────────────────────────
	root.__onUnmount = () => {
		isMounted = false;
		channel.close();
	};

	return root;
};

/**
 * initVerifyListener — Boot-time listener for the ORIGINAL app tab.
 *
 * Call once in main.js after the router is initialised.
 * Stays open for the entire app session listening for messages
 * broadcast from any verification tab.
 *
 * Messages handled:
 *   REGISTER_VERIFIED → refresh user, go home
 *   RESET_VERIFIED    → navigate to /auth/forgot-password?step=3&token=xxx
 *   VERIFY_FAILED     → show toast error
 *   FOCUS_APP         → window.focus()
 *
 * @param {Object} deps
 * @param {Object}   deps.router
 * @param {Object}   deps.store
 * @param {Function} [deps.showToast]  — (message, type) => void
 * @returns {Function} cleanup — closes the channel
 */
export const initVerifyListener = ({ router, store, showToast }) => {
	const channel = new BroadcastChannel("soniqstream_verify");

	channel.onmessage = async ({ data }) => {
		switch (data?.type) {
			case "REGISTER_VERIFIED": {
				// Account now active — refresh user and redirect home
				try {
					// const user = await authService.refreshUser();
					// store.user = user;
				} catch {
					/* best effort */
				}
				showToast?.("Account verified! Welcome 🎉", "success");
				router.replace("/");
				break;
			}

			case "RESET_VERIFIED": {
				// Token confirmed — send to password step 3 with token
				const t = data.token ?? "";
				router.navigate(
					`/auth/forgot-password?step=3&token=${encodeURIComponent(t)}`,
				);
				break;
			}

			case "VERIFY_FAILED": {
				showToast?.(data.reason ?? "Verification failed", "error");
				break;
			}

			case "FOCUS_APP": {
				try {
					window.focus();
				} catch {
					/* ignore */
				}
				break;
			}
		}
	};

	return () => channel.close();
};
