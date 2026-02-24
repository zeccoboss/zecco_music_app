import appConfig from "../config/app-config";
import { libraryContainerEvents } from "../events/library-container-events";
import { clearActiveNav } from "../helpers/clear-active-nav";
import { clearActiveSections } from "../helpers/clear-active-sections";
import { getTag } from "../helpers/select-element";
import { manageHeaderBtns } from "./manage-header-btns";

const RenderLibrary = async () => {
	const library = getTag(".library_section"); // Get the section
	appConfig.pageTitle = "Library"; // Change title of the page

	// const librarySection = getTag(".library_section");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Library", "library_btns_ctn");

	// Add
	libraryContainerEvents(library);

	library.classList.add("active_section");
};

export default RenderLibrary;
