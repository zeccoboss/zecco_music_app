import appConfig from "../config/app-config.js";
import { clearActiveNav } from "../helpers/clear-active-nav.js";
import { clearActiveSections } from "../helpers/clear-active-sections.js";
import { getTag } from "../helpers/select-element.js";
import { manageHeaderBtns } from "./manage-header-btns.js";

const RenderSearch = async () => {
	appConfig.pageTitle = "Search";
	// main.innerHTML = "";
	const searchSection = getTag(".search_section");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Search", "search_btns_ctn");

	searchSection.classList.add("active_section");
	// searchContainerInstance.addClass("active_section");
};

export default RenderSearch;
