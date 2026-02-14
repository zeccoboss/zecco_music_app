import { MiniPlayer } from "../components/MiniPlayer.js";
import CreateElement from "../utils/CreateElement.js";
import { HomeContainer } from "./HomeContainer.js";
import { LibraryContainer } from "./LibraryContainer.js";
import { ProfileContainer } from "./ProfileContainer.js";
import { SearchContainer } from "./SearchContainer.js";
import { SettingsContainer } from "./SettingContainer.js";

//
const MobileMain = async () => {
	// Create element
	const mobileMainInstance = new CreateElement("main");

	// Set attributes
	mobileMainInstance.addClass("mobile_main");
	mobileMainInstance.setId("mobile-main");

	mobileMainInstance.append(
		await HomeContainer(),
		LibraryContainer(),
		SearchContainer(),
		SearchContainer(),
		MiniPlayer(),
		ProfileContainer(),
		SettingsContainer(),
	);

	return mobileMainInstance.getElement();
};
export { MobileMain };
