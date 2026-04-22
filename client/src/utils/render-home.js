import appConfig from "../config/app-config.js";
import { clearActivePage } from "../helpers/active-page-helpers.js";
import {
	applyActiveNav,
	clearActiveNav,
	clearActiveSection,
} from "../helpers/nav-helpers.js";

const RenderHome = async () => {
	const homeSection = document.querySelector(".home-section");

	appConfig.page_title = "Music";
	// const extraContent = document.querySelector(".extra_content");
	// const overlay = document.querySelector(".overlay");

	clearActiveSection(); // Clear all active sections
	clearActiveNav(); // Clear all active   nav links
	applyActiveNav("home-nav-link"); // Accepts the selector queries the link tag and applies the class

	// For Active page
	clearActivePage();

	homeSection.classList.add("active-section");
};

export default RenderHome;
