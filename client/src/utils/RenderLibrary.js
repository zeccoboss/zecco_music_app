import appConfig from "../config/AppConfig";
import { libraryContainerEvents } from "../events/libraryContainerEvents";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { getTag } from "../helpers/selectElement";
import { manageHeaderBtns } from "./manageHeaderBtns";

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
