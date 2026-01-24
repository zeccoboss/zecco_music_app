import HomeSection from "../components/HomeSection.js";
import appConfig from "../config/AppConfig.js";
import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";

const RenderHome = async () => {
	const homeSection = document.querySelector(".home_section");

	appConfig.pageTitle = "Home";
	// const extraContent = document.querySelector(".extra_content");
	// const overlay = document.querySelector(".overlay");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	homeSection.classList.add("active_section");
};

export default RenderHome;
