import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";

const navigateHome = (currentTarget) => {
	const homeSection = document.querySelector(".home_section");

	clearActiveSections();
	clearActiveNav();

	homeSection.classList.add("active_section");
	currentTarget.classList.add("active_nav");
};

export { navigateHome };
