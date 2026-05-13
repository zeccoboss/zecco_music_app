import { mobileScreen } from "@zecco/core/screen-break-points";
import { RegisterDesktop } from "./RegisterDesktop";
import { RegisterMobile } from "./RegisterMobile";

/**
 * RegisterPage — Main registration router component
 * Renders into "root" outlet (full viewport)
 * Handles multi-step registration flow
 *
 * @async
 * @param {Object} ctx - Router context
 * @returns {Promise<Element>} The register page element with __onUnmount lifecycle
 */
export const RegisterPage = async (ctx) => {
	const root = document.createDocumentFragment("section");
	root.className = "register-page";

	const { query } = ctx;

	let state = "step1"; // step1 | step2 | step3 | loading | error | success
	let isMounted = true;
	const controller = null;

	if (query.step === 1) state = "step1";
	if (query.step === 2) state = "step2";
	if (query.step === 3) state = "step3";
	if (query.step === "loading") state = "error";
	if (query.step === "success") state = "success";

	/**
	 * Render the appropriate UI based on screen size
	 */
	const renderView = async () => {
		if (!isMounted) return;

		const isMobile = mobileScreen.matches;
		const UIComponent = isMobile ? RegisterMobile : RegisterDesktop;

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

export default RegisterPage;
