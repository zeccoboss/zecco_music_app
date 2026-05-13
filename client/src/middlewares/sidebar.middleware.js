import { bigScreen } from "@zecco/core/screen-break-points";
import { getTag } from "@zecco/helpers/dom-helper";

// TODO: when i come back i will add logic to shrink aside on big screen and show just nav icons and logo
export const sidebarShrinker = async (ctx, next) => {
	if (bigScreen.matches) {
		const root = getTag("#app");
		const sidebar = getTag("#sidebar");

		if (sidebar && root)
			if (true ?? root) {
				root.classList.add("shrink-sidebar");
			}
	}
	next();
};
