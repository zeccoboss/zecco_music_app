import {
	getLocalStorageData,
	setToLocalStorage,
} from "@zecco/helpers/storage-helper.js";

const sidebarHandler = () => {
	const toggleBtn = getTag(".sidebar_toggle_btn");
	const container = getTag(".container");

	// (() => {
	const sideBarState = getLocalStorageData("SideBar"); // Get data from local storage

	// Check and apply the correct sidebar width
	if (!sideBarState) {
		container.classList.remove("shrink_sidebar");
		toggleBtn.innerHTML = `<i class="bi bi-chevron-left"></i>`;
		setToLocalStorage("SideBar", "expand");
	} else if (sideBarState === "expand") {
		container.classList.remove("shrink_sidebar");
		toggleBtn.innerHTML = `<i class="bi bi-chevron-right"></i>`;
		setToLocalStorage("SideBar", "expand");
	} else if (sideBarState === "shrink") {
		// container.classList.add("shrink_sidebar");
		// toggleBtn.innerHTML = panelCloseSvg;
		// setToLocalStorage("SideBar", "shrink");
	}
};

export { sidebarHandler };
