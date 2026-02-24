import appConfig from "../config/app-config.js";
import { settingsContainerEvents } from "../events/settings-container-events.js";
import { clearActiveNav } from "../helpers/clear-active-nav.js";
import { clearActiveSections } from "../helpers/clear-active-sections.js";
import { getTag } from "../helpers/select-element.js";
// import { settingsContainerInstance } from "../layouts/SettingsContainer.js";
import { manageHeaderBtns } from "./manage-header-btns.js";

//
const RenderSettings = async () => {
	appConfig.pageTitle = "Settings"; // Change title of the page
	const settingsContainer = getTag(".settings_section"); // Get the section

	// const settingsContainer = getTag()

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	manageHeaderBtns("Settings", "settings_btns_ctn");

	// Call the event handler
	settingsContainerEvents(settingsContainer);

	settingsContainer.classList.add("active_section");
	// settingsContainerInstance.addClass("active_section");
};

export default RenderSettings;
