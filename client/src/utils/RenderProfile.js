import appConfig from "../config/AppConfig.js";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { manageHeaderBtns } from "./manageHeaderBtns.js";

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
