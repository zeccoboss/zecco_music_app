import appConfig from "../config/AppConfig";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { getTag } from "../helpers/selectElement";
import { manageHeaderBtns } from "./manageHeaderBtns";

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
