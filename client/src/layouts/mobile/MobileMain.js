import CreateElement from "../../utils/create-element";
import { MobileHome } from "./MobileHome";
import { MobileLibrary } from "./MobileLibrary";
import { MobileProfile } from "./MobileProfile";
import { MobileSearch } from "./MobileSearch";
import { MobilSettings } from "./MobileSetting";
import { MobileUpload } from "./MobileUpload";

//
const MobileMain = async () => {
	// Create element
	const mobileMainInstance = new CreateElement("main");

	// Set attributes
	mobileMainInstance.addClass("mobile-main").setId("mobile-main");

	mobileMainInstance.append(
		await MobileHome(),
		MobileLibrary(),
		MobileSearch(),
		MobileProfile(),
		MobilSettings(),
		MobileUpload(),
	);

	return mobileMainInstance.getElement();
};
export { MobileMain };
