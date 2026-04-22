import appConfig from "../config/app-config.js";
import { clearActivePage } from "../helpers/active-page-helpers.js";
import {
	applyActiveNav,
	clearActiveNav,
	clearActiveSection,
} from "../helpers/nav-helpers.js";
import { getTag } from "../helpers/select-element.js";

const RenderProfile = () => {
	const profileSection = getTag(".profile_section"); // Get the section
	appConfig.page_title = "Profile";

	// Clear all active sections and nav links
	clearActiveSection();
	clearActiveNav();
	applyActiveNav("profile-nav-link");

	// Clears active page if available
	clearActivePage();

	profileSection.classList.add("active-section");
};

export default RenderProfile;
