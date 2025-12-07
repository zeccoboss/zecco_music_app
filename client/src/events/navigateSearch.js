import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";

const navigateSearch = () => {
	const searchSection = document.querySelector(".search_section");
	const searchNavLink = document.querySelector("#search-link");

	clearActiveSections();
	clearActiveNav();

	searchSection.classList.add("active_section");
	searchNavLink.classList.add("active_nav");
};

export { navigateSearch };
