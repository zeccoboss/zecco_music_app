import { navigateHomneSpinner } from "../core/loadingSpinner.js";
import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";
import { navigate } from "../routes/router.js";

// Check and remove all additional page content
function clearExtraLayers(extraContent, overlay) {
	if (extraContent.classList.contains("show_extra_content"))
		extraContent.classList.remove("show_extra_content");
	if (overlay.classList.contains("show_overlay"))
		overlay.classList.remove("show_overlay");
}

// For navigating to home
const navigateHome = (navElement, href) => {
	const homeSection = document.querySelector(".home_section");
	const extraContent = document.querySelector(".extra_content");
	const overlay = document.querySelector(".overlay");

	// Clear all active sections and nav links
	clearActiveSections();
	clearActiveNav();

	if (!href) {
		homeSection.classList.add("active_section");
		navElement.classList.add("active_nav");
	} else {
		overlay.classList.add("show_overlay");
		extraContent.classList.remove("show_extra_content");

		navigateHomneSpinner({ extraContent, overlay }, 2500, clearExtraLayers); // To manage duration witch loader is shown
		navigate(href); // Call to route

		//
		homeSection.classList.add("active_section");
		navElement.classList.add("active_nav");
	}
};

export { navigateHome };
