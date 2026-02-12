import LibrarySection from "../layouts/LibraryContainer";
import appConfig from "../config/AppConfig";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { manageHeaderBtns } from "./manageHeaderBtns";
import { getTag } from "../helpers/selectElement";

const RenderLibrary = async () => {
	appConfig.pageTitle = "Library"; // Change title of the page

	const librarySection = getTag(".library_section");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Library", "library_btns_ctn");

	librarySection.classList.add("active_section");
};

export default RenderLibrary;
