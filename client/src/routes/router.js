import navigateLogin from "../events/navigateLogin.js";
import navigateSignup from "../events/navigateSignup.js";

const routes = {
	"/": "home",
	"/search": "search",
	"/library": "library",
	"/signup": "signup",
	"/login": "login",
};

function navigate(path) {
	const main = document.querySelector("main");
	const mainSections = main.querySelectorAll("section");
	mainSections.forEach((sec) => {
		sec.classList.remove("active_section");
	});

	if (!path.startsWith("/")) path = `/${path}`;

	if (routes[path] === "login") {
		navigateLogin();
		history.pushState({}, "", path);
	} else if (routes[path] === "signup") {
		// console.log("signup");
		navigateSignup();
		history.pushState({}, "", path);
	} else {
		const id = `${routes[path]}-section`;

		const foundSection = document.querySelector(`#${id}`);
		const notFoundSection = document.getElementById("not-found-section");

		foundSection
			? foundSection.classList.add("active_section")
			: notFoundSection.classList.add("active_section");

		history.pushState({}, "", path);
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

export { navigate, router };
