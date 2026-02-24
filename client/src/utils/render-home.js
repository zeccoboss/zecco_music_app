import appConfig from "../config/app-config.js";
import { clearActiveNav } from "../helpers/clear-active-nav.js";
import { clearActiveSections } from "../helpers/clear-active-sections.js";
import { manageHeaderBtns } from "./manage-header-btns.js";

const RenderHome = async () => {
	const homeSection = document.querySelector(".home_section");

	appConfig.pageTitle = "Music";
	// const extraContent = document.querySelector(".extra_content");
	// const overlay = document.querySelector(".overlay");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Music", "home_btns_ctn");

	homeSection.classList.add("active_section");
};

export default RenderHome;
