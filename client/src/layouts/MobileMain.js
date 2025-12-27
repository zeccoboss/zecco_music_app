// MobileMain;
import NotFoundSection from "../components/404Section.js";
import HomeSection from "../components/HomeSection.js";
import LibrarySection from "../components/LibrarySection.js";
import PlayingBanner from "../components/PlayingBanner.js";
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
		PlayingBanner()
		// NotFoundSection()
	);

	// console.log(mobileMain.getElement());

	//
	return mobileMain.getElement();
};

export default MobileMain;
