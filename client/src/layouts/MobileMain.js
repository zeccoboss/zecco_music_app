// MobileMain;
import HomeSection from "../components/HomeSection.js";
import LibrarySection from "../components/LibrarySection.js";
import PlayingBanner from "../components/PlayingBanner.js";
import ProfileSection from "../components/ProfileSection.js";
import SearchSection from "../components/SearchSection.js";
import CreateElement from "../utils/CreateElement.js";

const MobileMain = async () => {
	// Create element
	const mobileMain = new CreateElement("main");

	// Set attributes
	mobileMain.addClass("mobile_main");
	mobileMain.setId("mobile-main");

	mobileMain.append(
		await HomeSection(),
		LibrarySection(),
		SearchSection(),
		PlayingBanner(),
		ProfileSection()
	);

	//
	return mobileMain.getElement();
};

export default MobileMain;
