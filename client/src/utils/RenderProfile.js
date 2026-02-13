import appConfig from "../config/AppConfig.js";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { profileContainerInstance } from "../layouts/ProfileContainer.js";
import { manageHeaderBtns } from "./manageHeaderBtns.js";

const RenderProfile = () => {
	appConfig.pageTitle = "Profile";

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Profile", "profile_btns_ctn");

	profileContainerInstance.addClass("active_section");
};

export default RenderProfile;
