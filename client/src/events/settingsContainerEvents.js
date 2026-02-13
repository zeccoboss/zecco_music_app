import { themeManager } from "../core/themeManager";

const settingsContainerEvents = (settingsInstance) => {
	settingsInstance.addEvent("click", (e) => {
		const closest = (name, event = e) => {
			return !!event.target.closest(name); // Return boolean
		};

		// Get the closest target if bubbling matches
		function matches(name, event = e) {
			return !!event.target.matches(name); // Return boolean
		}

		switch (true) {
			case closest(".theme_btn_dark"):
				themeManager.setDark();
				break;
			case closest(".theme_btn_light"):
				themeManager.setLight();
				break;
			case closest(".theme_btn_system"):
				themeManager.setSystem();
				break;
		}
	});
};
export { settingsContainerEvents };
