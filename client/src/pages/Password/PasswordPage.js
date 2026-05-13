import { mobileScreen } from "@zecco/core/screen-break-points";
import { PasswordDesktop } from "./PasswordDesktop";
import { PasswordMobile } from "./PasswordMobile";

/**
 * PasswordPage — Main forgot password router component
 * Renders into "root" outlet (full viewport)
 *
 * @async
 * @param {Object} ctx - Router context
 * @returns {Promise<Element>} The password reset page element with __onUnmount lifecycle
 */
export const PasswordPage = async (ctx) => {
	const root = document.createElement("section");
	root.className = "password-page";

	let state = "email"; // email | code | reset | loading | success | error
	let isMounted = true;
	let controller = null;

	/**
	 * Render the appropriate UI based on screen size
	 */
	const renderView = async () => {
		if (!isMounted) return;

		const isMobile = mobileScreen.matches;
		const UIComponent = isMobile ? PasswordMobile : PasswordDesktop;

		const view = await UIComponent({
			state,
			ctx,
		});

		if (!isMounted) return;
		root.replaceChildren(view);
	};

	// ── Initial render ──
	await renderView();

	// ── Lifecycle cleanup ──
	root.__onUnmount = () => {
		isMounted = false;
		controller?.abort();
	};

	return root;
};

export default PasswordPage;
