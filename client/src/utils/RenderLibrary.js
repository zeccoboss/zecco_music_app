// import appConfig from "../config/AppConfig";
// import { clearActiveNav } from "../helpers/clearActiveNav";
// import { clearActiveSections } from "../helpers/clearActiveSections";
// import { manageHeaderBtns } from "./manageHeaderBtns";
// import { getTag } from "../helpers/selectElement";

import appConfig from "../config/AppConfig";
import { libraryContainerEvents } from "../events/libraryContainerEvents";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { libraryContainerInstance } from "../layouts/LibraryContainer";
import { manageHeaderBtns } from "./manageHeaderBtns";

const RenderLibrary = async () => {
	appConfig.pageTitle = "Library"; // Change title of the page

	// const librarySection = getTag(".library_section");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Library", "library_btns_ctn");

	// Add
	libraryContainerEvents(libraryContainerInstance);

	libraryContainerInstance.addClass("active_section");
};

export default RenderLibrary;
