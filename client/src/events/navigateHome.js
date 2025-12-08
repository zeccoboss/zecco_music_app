import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";

const navigateHome = (navElement) => {
	const homeSection = document.querySelector(".home_section");

	clearActiveSections();
	clearActiveNav();

	homeSection.classList.add("active_section");
	navElement.classList.add("active_nav");
};

export { navigateHome };
