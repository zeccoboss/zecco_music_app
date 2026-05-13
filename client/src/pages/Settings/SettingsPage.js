import { mobileScreen } from "@zecco/core/screen-break-points.js";
import { SettingsDesktop } from "./SettingsDesktop.js";
import { SettingsMobile } from "./SettingsMobile.js";
import { settingsEvents } from "@zecco/features/settings/settings.events.js";

/**
 * SettingsPage — Main settings orchestrator
 *
 * State machine:
 *   skeleton → (user loaded) → auth | content
 *   content  → (save)        → loading → content | error
 *   error    → (retry)       → loading → content | error
 *
 * @async
 * @param {Object} ctx - Router context
 * @returns {Promise<Element>} Root element with __onUnmount lifecycle
 */
export const SettingsPage = async (ctx) => {
	const root = document.createElement("section");
	root.className = "settings-page";

	let state = "skeleton";
	let isMounted = true;
	let controller = null;

	const isMobile = mobileScreen.matches;
	const UI = isMobile ? SettingsMobile : SettingsDesktop;

	// ── Render ───────────────────────────────────────────────
	const render = async () => {
		if (!isMounted) return;
		const view = await UI({ state, ctx });
		root.replaceChildren(view);
		// Bind events to fresh DOM every render
		settingsEvents(root, { state, setState });
	};

	// ── State updater ────────────────────────────────────────
	// Exposed to events file so it can trigger state transitions
	// e.g. setState("loading") before an API call,
	//      setState("content") on success,
	//      setState("error")   on failure
	const setState = async (newState) => {
		state = newState;
		await render();
	};

	// ── Data loader ──────────────────────────────────────────
	const loadData = async () => {
		try {
			if (!isMounted) return;

			// Show skeleton immediately
			state = "skeleton";
			await render();

			// Check auth
			const user = JSON.parse(localStorage.getItem("user") || "null");
			if (!user) {
				state = "auth";
				setState("skeleton"); // TODO: remove later

				await render();
				return;
			}

			// TODO: fetch user preferences / settings from API
			// controller = new AbortController();
			// const settings = await settingsService.get(user.id, {
			//   signal: controller.signal
			// });

			if (!isMounted) return;

			state = "content";
			await render();
		} catch (err) {
			if (err?.name !== "AbortError" && isMounted) {
				console.error("[SettingsPage] Load error:", err);
				state = "error";
				await render();
			}
		}
	};

	// ── Boot ─────────────────────────────────────────────────
	await loadData();

	// ── Lifecycle ────────────────────────────────────────────
	root.__onUnmount = () => {
		isMounted = false;
		controller?.abort();
	};

	return root;
};
