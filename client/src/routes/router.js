import HomeSection from "../components/HomeSection.js";
import LibrarySection from "../components/LibrarySection.js";
import NotFoundSection from "../components/NotFoundSection.js";
import ProfileSection from "../components/ProfileSection.js";
import SearchSection from "../components/SearchSection.js";
import navigateLogin from "../events/navigateLogin.js";
import navigateSignup from "../events/navigateSignup.js";
import { clearActiveSections } from "../helpers/clearActiveSections.js";
import showProfilePage from "../helpers/showProfilePage.js";

const routes = {
	"/": HomeSection,
	"/search": SearchSection,
	"/library": LibrarySection,
	"/signup": "signup",
	"/login": "login",
	"/profile": ProfileSection,
	"/notFound": NotFoundSection,
};

function pushHistory(path) {
	history.pushState({}, "", path);
}
async function navigate(path) {
	if (!path.startsWith("/")) path = `/${path}`;

	if (routes[path] === "/") {
		console.log("Home");
	} else if (routes[path] === "login") {
		navigateLogin();
		pushHistory(path);
		return;
	} else if (routes[path] === "signup") {
		// console.log("signup");
		navigateSignup();
		pushHistory(path);
		return;
	} else if (routes[path] === "profile") {
		showProfilePage();
		pushHistory(path);
		return;
	} else {
		// document.querySelector('')
		// clearActiveSections();
		// const id = `${routes[path]}-section`;

		// console.log();

		// const foundSection = document.querySelector(`#${id}`);
		// const notFoundSection = document.getElementById("not-found-section");

		// foundSection
		// 	? foundSection.classList.add("active_section")
		// 	: notFoundSection.classList.add("active_section");

		pushHistory(path);
	}
}

const router = () => {
	function handleLocation() {
		const path = window.location.pathname;
		navigate(path, routes);
	}

	// For back/forwards button
	window.onpopstate = handleLocation;

	// Direct URL typing
	document.addEventListener("DOMContentLoaded", handleLocation);
};

export { navigate, router, pushHistory };
