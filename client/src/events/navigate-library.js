import { clearActiveNav } from "../helpers/clear-active-nav.js";
import { clearActiveSections } from "../helpers/clear-active-sections.js";
import { router } from "../routes/router.js";

const navigateLibrary = (e) => {
	const href = e.currentTarget.getAttribute("href");
	const currentTarget = e.currentTarget;

	clearActiveSections();
	clearActiveNav();

	// currentTarget.classList.add("active_nav");

	router.navigateTo(href);
};

export { navigateLibrary };
