import { mobileScreen } from "@zecco/core/screen-break-points";
import { getTag } from "@zecco/helpers/dom-helper";
import { router } from "@zecco/routes/router";

/**
 * Middleware to toggle body classes based on the route's target outlet.
 * Ensures the CSS Grid adapts to "main" (layout) or "root" (full-screen).
 */
export const layoutSwitcher = async (ctx, next) => {
	const root = getTag("#app");

	// 1. Find the target outlet for this path
	const match = router.match(ctx.path);
	const leaf = match?.stack.at(-1);
	const outlet = leaf?.outlet ?? "main";

	// 2. Clear out any old layout classes
	root.classList.remove("layout-main", "layout-root", "layout-mobile");

	if (mobileScreen.matches) {
		// If it's a full-screen root page (like login) on mobile, use layout-root.
		// Otherwise, use layout-mobile for the standard shell.
		const activeClass = outlet === "root" ? "layout-root" : "layout-mobile";
		root.classList.add(activeClass);
	} else {
		// Desktop / Tablet layouts
		root.classList.add(`layout-${outlet}`);
	}

	await next();
};
