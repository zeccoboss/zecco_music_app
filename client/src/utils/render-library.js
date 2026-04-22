import appConfig from "../config/app-config";
import { clearActivePage } from "../helpers/active-page-helpers";
import {
	applyActiveNav,
	clearActiveNav,
	clearActiveSection,
} from "../helpers/nav-helpers";
import { getTag } from "../helpers/select-element";

const RenderLibrary = async () => {
	const library = getTag(".library_section"); // Get the section
	appConfig.page_title = "Library"; //

	clearActiveSection();
	clearActiveNav();
	applyActiveNav("lib-nav-link");

	// Clears active page if available
	clearActivePage();

	library.classList.add("active-section");
};

export default RenderLibrary;
