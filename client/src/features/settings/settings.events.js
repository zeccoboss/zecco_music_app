import { themeManager } from "@zecco/core/theme-manager.js";
import { closest } from "@zecco/helpers/event-helper.js";

const settingsEvents = (root, { state, setState }) => {
	root.addEventListener("click", (e) => {
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
		console.log(state);
	});
};
export { settingsEvents };
