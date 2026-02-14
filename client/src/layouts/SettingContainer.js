import defaultProfile from "../assets/images/default-profile.png";
import { chevronDownSvg } from "../assets/svgs/svgIcons.js";
import appConfig from "../config/AppConfig.js";
import CreateElement from "../utils/CreateElement.js";

// Return the ...
const SettingsContainer = () => {
	// ${!mobileScreen.matches ? buttonWrapper.settingsBtns : ""}

	const date = `${appConfig.date.getDate()}-${appConfig.date.getMonth()}-${appConfig.date.getFullYear()}`;

	// Create element
	const settingsContainerInstance = new CreateElement("section");
	settingsContainerInstance.addClass("settings_section", "main_sections");

	const settingsContent = `
	<div class="settings_header" data-settings-header>
		<div class="settings_profile_card">
			<div class="st_prf_card_wrapper">
				<figure class="st_profile_ctn">
					<img src="${defaultProfile}" alt="Settings profile pic" class="st_profile_pic"/>
					<figcaption class="figcaption">Settings profile picture</figcaption>
				</figure>
				<h4>ZECCOBOSS</h4>
			</div>
			<button>${chevronDownSvg}</button>
		</div>
	</div>

	<div class="settings_content" data-settings-content>
		<div class="theme_container">
			<div class="theme_container_header">
				<p>Appearance</p>  

				<div class="" data-toggle-theme-container>
					<span data-theme-placeholder>System</span>
					${chevronDownSvg}
				</div>
			</div>
			<div class="theme_container_content"> 
				<button class="theme_actions_btn theme_btn_dark"><span>Dark</span></button>
				<button class="theme_actions_btn theme_btn_light"><span>Light</span></button>
				<button class="theme_actions_btn theme_btn_system"><span>System</span></button>
			</div>
		</div>
	</div>
`;

	settingsContainerInstance.appendContent(settingsContent);

	return settingsContainerInstance.getElement();
};
export { SettingsContainer };
