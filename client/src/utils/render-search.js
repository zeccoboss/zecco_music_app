import appConfig from "../config/app-config.js";
import { clearActivePage } from "../helpers/active-page-helpers.js";
import {
	applyActiveNav,
	clearActiveNav,
	clearActiveSection,
} from "../helpers/nav-helpers.js";
import { getTag } from "../helpers/select-element.js";
import { manageHeaderBtns } from "./manage-header-btns.js";

const RenderSearch = async () => {
	appConfig.page_title = "Search";
	// main.innerHTML = "";
	const searchSection = getTag(".search_section");

	// Clear all active sections and nav links
	clearActiveSection();
	clearActiveNav();
	applyActiveNav("search-nav-link");

	// Clears active page if available
	clearActivePage();

	searchSection.classList.add("active-section");
};

export default RenderSearch;
