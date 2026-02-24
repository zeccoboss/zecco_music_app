import appConfig from "../config/app-config.js";
import { clearActiveNav } from "../helpers/clear-active-nav.js";
import { clearActiveSections } from "../helpers/clear-active-sections.js";
import { getTag } from "../helpers/select-element.js";
import { manageHeaderBtns } from "./manage-header-btns.js";

const RenderProfile = () => {
	const profileSection = getTag(".profile_section"); // Get the section
	appConfig.pageTitle = "Profile";

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Profile", "profile_btns_ctn");

	// profileContainerInstance.addClass("active_section");
	profileSection.classList.add("active_section");
};

export default RenderProfile;
