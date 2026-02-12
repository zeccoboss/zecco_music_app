import appConfig from "../config/AppConfig";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { manageHeaderBtns } from "./manageHeaderBtns.js";

const RenderProfile = () => {
	appConfig.pageTitle = "User Profile";
	console.log("Profile rendered");
	const profileSection = document.querySelector(".profile_section");

	appConfig.pageTitle = "Music";
	// const extraContent = document.querySelector(".extra_content");
	// const overlay = document.querySelector(".overlay");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Profile", "profile_btns_ctn");

	profileSection.classList.add("active_section");
};

export default RenderProfile;
