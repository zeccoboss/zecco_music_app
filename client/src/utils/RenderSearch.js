import RenderSearch from "../components/RenderSearch";
import appConfig from "../config/AppConfig";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";

const RenderLibrary = async () => {
	appConfig.pageTitle = "Search";
	const main = document.querySelector("main");
	// main.innerHTML = "";
	const RenderSearch = document.querySelector(".library_section");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	RenderSearch.classList.add("active_section");
};

export default RenderLibrary;
