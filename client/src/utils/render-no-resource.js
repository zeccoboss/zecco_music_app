import appConfig from "../config/app-config.js";
import { setActivePage } from "../helpers/active-page-helpers.js";

const RenderNoResourcePage = () => {
	appConfig.page_title = "404 | Resource Not Found"; // Change the app title
	//
	const page = document.getElementById("no-resource-page");

	// Show the page
	setActivePage(page, "active-app-page");
};

export default RenderNoResourcePage;
