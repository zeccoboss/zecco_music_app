import { clearActiveSections } from "./clear-active-sections.js";

function showProfilePage() {
	clearActiveSections();
	const profilePage = document.querySelector("#profile-page");
	profilePage.classList.add("show_profile_page");
	console.log("Profile section");
}

export default showProfilePage;
