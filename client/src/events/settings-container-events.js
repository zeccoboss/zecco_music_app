import { themeManager } from "../core/theme-manager.js";
import { closest } from "../helpers/event-delegation-helpers.js";

const settingsContainerEvents = (settingsContainer) => {
	settingsContainer.addEventListener("click", (e) => {
		switch (true) {
			case closest(".theme_btn_dark", e):
				themeManager.setDark();
				break;
			case closest(".theme_btn_light", e):
				themeManager.setLight();
				break;
			case closest(".theme_btn_system", e):
				themeManager.setSystem();
				break;
		}
	});
};
export { settingsContainerEvents };
