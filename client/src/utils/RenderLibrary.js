import LibrarySection from "../components/LibrarySection";
import appConfig from "../config/AppConfig";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";

const RenderLibrary = async () => {
	appConfig.pageTitle = "Music Library";
	const main = document.querySelector("main");
	// main.innerHTML = "";
	const librarySection = document.querySelector(".library_section");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	librarySection.classList.add("active_section");
};

export default RenderLibrary;
