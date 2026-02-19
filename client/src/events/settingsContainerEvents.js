import { themeManager } from "../core/themeManager";
import { closest } from "../helpers/eventDelegationHelpers";

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
