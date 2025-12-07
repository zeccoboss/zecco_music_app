import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";

const navigateLibrary = (currentTarget) => {
	const librarySection = document.querySelector(".library_section");

	clearActiveSections();
	clearActiveNav();

	librarySection.classList.add("active_section");
	currentTarget.classList.add("active_nav");
};

export { navigateLibrary };
