import CreateElement from "../utils/create-element.js";
import { HomeContainer } from "./HomeContainer.js";
import { LibraryContainer } from "./LibraryContainer.js";
import { ProfileContainer } from "./ProfileContainer.js";
import { SearchContainer } from "./SearchContainer.js";
import { SettingsContainer } from "./SettingContainer.js";

const Main = async () => {
	// Create element
	const mainInstance = new CreateElement("main");

	// Set attributes
	mainInstance.addClass("main");
	mainInstance.setId("main");

	mainInstance.append(
		await HomeContainer(),
		LibraryContainer(),
		SearchContainer(),
		ProfileContainer(),
		SettingsContainer(),
	);

	return mainInstance.getElement();
};

export { Main };
