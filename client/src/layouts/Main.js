import CreateElement from "../utils/CreateElement";
import { HomeContainer } from "./HomeContainer";
import { LibraryContainer } from "./LibraryContainer";
import { ProfileContainer } from "./ProfileContainer";
import { SearchContainer } from "./SearchContainer";
import { SettingsContainer } from "./SettingContainer";

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
