import { navigate } from "../routes/router.js";
import { navigateHome } from "./navigateHome.js";

function preventLinksBehaviour() {
	const navLinks = document.querySelectorAll("a");

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			navigate(e.currentTarget.getAttribute("href"));
		});
	});
}

function preventFormBehaviour() {
	const extraContent = document.querySelector(".extra_content");
	const forms = extraContent.querySelectorAll(".forms");
	const homeNavLink = document.querySelector("#home-links");

	forms.forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
		});

		form.addEventListener("click", (e) => {
			e.preventDefault();

			if (e.target.getAttribute("href") === "/") {
				navigateHome(homeNavLink, e.target.getAttribute("href"));
			}
		});
	});
}

export { preventLinksBehaviour, preventFormBehaviour };
