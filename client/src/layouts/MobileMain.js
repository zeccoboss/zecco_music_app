import MiniPlayer from "../components/MiniPlayer.js";
import CreateElement from "../utils/CreateElement.js";
import { HomeContainer } from "./HomeContainer.js";
import LibraryContainer from "./LibraryContainer.js";
import ProfileContainer from "./ProfileContainer.js";
import SearchContainer from "./SearchContainer.js";

const MobileMain = async () => {
	// Create element
	const mobileMain = new CreateElement("main");

	// Set attributes
	mobileMain.addClass("mobile_main");
	mobileMain.setId("mobile-main");

	mobileMain.append(
		await HomeContainer(),
		LibraryContainer(),
		// SearchContainer(),
		SearchContainer(),
		MiniPlayer(),
		ProfileContainer(),
	);

	//
	return mobileMain.getElement();
};

export default MobileMain;
