import appConfig from "../config/app-config.js";
import {
	applyActiveNav,
	clearActiveNav,
	clearActiveSection,
} from "../helpers/nav-helpers.js";
import { getTag } from "../helpers/select-element.js";

//
const RenderUploads = async () => {
	appConfig.page_title = "Uploads"; // Change title of the page
	const uploadContainer = getTag(".upload_section"); // Get the section

	// Clear all active sections and nav links
	clearActiveSection();
	clearActiveNav();
	applyActiveNav("upload-nav-link");

	uploadContainer.classList.add("active-section");
};

export default RenderUploads;
