import { panelCloseSvg, panelOpenSvg } from "../assets/svgs/svg-icons.js";
import {
	getLocalStorageData,
	setToLocalStorage,
} from "../helpers/get-local-storage-data";
import { getTag } from "../helpers/select-element";
import CreateElement from "../utils/create-element";

const sidebarHandler = () => {
	const toggleBtn = getTag(".sidebar_toggle_btn");
	const container = getTag(".container");

	// (() => {
	const sideBarState = getLocalStorageData("SideBar"); // Get data from local storage

	// Check and apply the correct sidebar width
	if (!sideBarState) {
		container.classList.remove("shrink_sidebar");
		toggleBtn.innerHTML = panelOpenSvg;
		setToLocalStorage("SideBar", "expand");
	} else if (sideBarState === "expand") {
		container.classList.remove("shrink_sidebar");
		toggleBtn.innerHTML = panelOpenSvg;
		setToLocalStorage("SideBar", "expand");
	} else if (sideBarState === "shrink") {
		container.classList.add("shrink_sidebar");
		toggleBtn.innerHTML = panelCloseSvg;
		setToLocalStorage("SideBar", "shrink");
	}
	// })();

	// Add event to the sidebar toggle button
	toggleBtn.addEventListener("click", (e) => {
		const currentTarget = e.currentTarget;

		if (container.classList.contains("shrink_sidebar")) {
			container.classList.remove("shrink_sidebar");
			currentTarget.innerHTML = panelOpenSvg;
			setToLocalStorage("SideBar", "expand");
		} else {
			container.classList.add("shrink_sidebar");
			currentTarget.innerHTML = panelCloseSvg;
			setToLocalStorage("SideBar", "shrink");
		}
	});
};

export { sidebarHandler };
