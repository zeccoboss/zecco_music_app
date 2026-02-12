import { mobileScreen } from "../core/screenBreakPoints";
import { getMultiTags } from "../helpers/selectElement";
import { mobileHeaderInstance } from "../layouts/MobileHeader";

// const manageHeaderBtns =  => {
const manageHeaderBtns = (title, selector) => {
	if (!mobileScreen.matches) {
		return; // Stop Execution if not on mobile device
	} else {
		if (!title && !selector) {
			console.error("Not valid values");
			return;
		}

		// Select and change the page title
		const pageHeader = mobileHeaderInstance.getChild("#header-title");
		if (pageHeader) pageHeader.innerHTML = title;

		const btnContainers = getMultiTags(".header_btn_wrappers");
		// Check to hide buttons container
		for (const ctn of btnContainers) {
			ctn.style.display = "none";

			if (ctn.classList.contains(selector)) {
				ctn.style.display = "flex";
			}
		}
	}
};

export { manageHeaderBtns };
