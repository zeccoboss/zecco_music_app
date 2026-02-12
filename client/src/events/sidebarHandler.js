import { panelCloseSvg, panelOpenSvg } from "../assets/svgs/svgIcons";
import {
	getLocalStorageData,
	setToLocalStorage,
} from "../helpers/getLocalStorageData";
import { containerInstance } from "../layouts/Container";
import { headerInstance } from "../layouts/Header";

const sidebarHandler = () => {
	const toggleBtn = headerInstance.getChild(".sidebar_toggle_btn");

	(() => {
		const sideBarState = getLocalStorageData("SideBar"); // Get data from local storage

		// Check and apply the correct sidebar width
		if (!sideBarState) {
			containerInstance.removeClass("shrink_sidebar");
			toggleBtn.innerHTML = panelOpenSvg;
			setToLocalStorage("SideBar", "expand");
		} else if (sideBarState === "expand") {
			containerInstance.removeClass("shrink_sidebar");
			toggleBtn.innerHTML = panelOpenSvg;
			setToLocalStorage("SideBar", "expand");
		} else if (sideBarState === "shrink") {
			containerInstance.addClass("shrink_sidebar");
			toggleBtn.innerHTML = panelCloseSvg;
			setToLocalStorage("SideBar", "shrink");
		}
	})();

	// Add event to the sidebar toggle button
	toggleBtn.addEventListener("click", (e) => {
		const currentTarget = e.currentTarget;

		if (containerInstance.hasClass("shrink_sidebar")) {
			containerInstance.removeClass("shrink_sidebar");
			currentTarget.innerHTML = panelOpenSvg;
			setToLocalStorage("SideBar", "expand");
		} else {
			containerInstance.addClass("shrink_sidebar");
			currentTarget.innerHTML = panelCloseSvg;
			setToLocalStorage("SideBar", "shrink");
		}
	});
};

export { sidebarHandler };
