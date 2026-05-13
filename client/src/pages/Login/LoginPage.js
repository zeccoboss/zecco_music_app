import { mobileScreen } from "@zecco/core/screen-break-points";
import { LoginDesktop } from "./LoginDesktop";
import { LoginMobile } from "./LoginMobile";

/**
 * LoginPage — Main login router component
 * Renders into "root" outlet (full viewport)
 * Handles responsive switching between desktop (brand + form) and mobile (form only)
 *
 * @async
 * @param {Object} ctx - Router context
 * @returns {Promise<Element>} The login page element with __onUnmount lifecycle
 */
export const LoginPage = async (ctx) => {
	const root = document.createElement("div");
	root.className = "login-page-root";

	let state = "form"; // form | loading | error
	let isMounted = true;
	let controller = null; // For request cancellation

	/**
	 * Render the appropriate UI based on screen size
	 */
	const renderView = async () => {
		if (!isMounted) return;

		const isMobile = mobileScreen.matches;
		const UIComponent = isMobile ? LoginMobile : LoginDesktop;

		// Call async component
		const view = await UIComponent({
			state,
			ctx,
		});

		if (!isMounted) return;

		// Replace DOM
		root.replaceChildren(view);
	};

	// ── Initial render ──
	await renderView();

	// ── Lifecycle cleanup ──
	root.__onUnmount = () => {
		isMounted = false;
		controller?.abort(); // Cancel in-flight requests
	};

	return root;
};

export default LoginPage;
