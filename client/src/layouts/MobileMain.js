// MobileMain;
import HomeSection from "../components/HomeSection.js";
import LibrarySection from "../components/LibrarySection.js";
import NotFoundSection from "../components/NotFoundSection.js";
import PlayingBanner from "../components/PlayingBanner.js";
import ProfileSection from "../components/ProfileSection.js";
import SearchSection from "../components/SearchSection.js";
import CreateElement from "../utils/CreateElement.js";

const MobileMain = () => {
	// Create element
	const mobileMain = new CreateElement("main");

	// Set attributes
	mobileMain.addClass("mobile_main");
	mobileMain.setId("mobile-main");

	mobileMain.append(
		HomeSection(),
		LibrarySection(),
		SearchSection(),
		PlayingBanner(),
<<<<<<< HEAD
=======
		ProfileSection(),
>>>>>>> 37aca4b9e6d5b949d248445e1381ee2af1dadb09
		NotFoundSection()
	);

	//
	return mobileMain.getElement();
};

export default MobileMain;
