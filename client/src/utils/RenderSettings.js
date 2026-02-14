import appConfig from "../config/AppConfig";
import { settingsContainerEvents } from "../events/settingsContainerEvents";
import { clearActiveNav } from "../helpers/clearActiveNav";
import { clearActiveSections } from "../helpers/clearActiveSections";
import { getTag } from "../helpers/selectElement";
// import { settingsContainerInstance } from "../layouts/SettingsContainer";
import { manageHeaderBtns } from "./manageHeaderBtns";

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
