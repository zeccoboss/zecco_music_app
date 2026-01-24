import appConfig from "../config/AppConfig.js";
import { clearActiveNav } from "../helpers/clearActiveNav.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";
import { overlayInstance } from "../layouts/Overlay.js";
import { noResourcePageInstance } from "../pages/NoResourcePage.js";

const RenderNoResourcePage = () => {
	appConfig.pageTitle = "Resource Not Found"; // Change the app title
	// const overlay = document.querySelector(".overlay");
	overlayInstance.removeClass("show_overlay");
	noResourcePageInstance.removeClass("show_no_resource_page");

	// clearActiveNav();
	// clearActiveSections();

	noResourcePageInstance.addClass("show_no_resource_page");

	console.log(noResourcePageInstance);

	// if (noResourcePageInstance.hasClass("show_not_found_page")) {
	// 	noResourcePageInstance.removeClass("show_not_found_page");
	// }

	// const notFoundPage = document.getElementById("not-found-page ");
	// notFoundPage.classList.add("active_page ");
};

export default RenderNoResourcePage;
