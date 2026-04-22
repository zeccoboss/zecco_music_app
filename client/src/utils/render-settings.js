import appConfig from "../config/app-config.js";
import { settingsContainerEvents } from "../events/settings-container-events.js";
import { clearActivePage } from "../helpers/active-page-helpers.js";
import {
	applyActiveNav,
	clearActiveNav,
	clearActiveSection,
} from "../helpers/nav-helpers.js";
import { getTag } from "../helpers/select-element.js";
// import { settingsContainerInstance } from "../layouts/SettingsContainer.js";
import { manageHeaderBtns } from "./manage-header-btns.js";

//
const RenderSettings = async () => {
	appConfig.page_title = "Settings"; // Change title of the page
	const settingsContainer = getTag(".settings_section"); // Get the section

	// const settingsContainer = getTag()

	// Clear all active sections and nav links
	clearActiveSection();
	clearActiveNav();
	applyActiveNav("settings-nav-link");

	// Call the event handler
	// Clears active page if available
	clearActivePage();

	settingsContainer.classList.add("active-section");
	// settingsContainerInstance.addClass("active_section");
};

export default RenderSettings;
