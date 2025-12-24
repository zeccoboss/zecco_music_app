// MobileMain;
import NotFoundSection from "../fragments/404Section.js";
import HomeSection from "../fragments/HomeSection.js";
import LibrarySection from "../fragments/LibrarySection.js";
import PlayingBanner from "../fragments/PlayingBanner.js";
import SearchSection from "../fragments/SearchSection.js";
import CreateElement from "../utils/CreateElement.js";

const MobileMain = () => {
	// Create element
	const mobileMain = new CreateElement("main");

	// Set attributes
	mobileMain.addClass("mobile_main");
	mobileMain.setId("mobile-main");

	mobileMain.getElement().append(
		HomeSection(),
		LibrarySection(),
		SearchSection(),
		PlayingBanner()
		// NotFoundSection()
	);

	//
	return mobileMain.getElement();
};

export default MobileMain;
