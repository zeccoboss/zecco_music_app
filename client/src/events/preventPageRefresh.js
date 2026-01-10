import { navigate } from "../routes/router.js";
import { navigateHome } from "./navigateHome.js";

function preventLinksBehavior() {
	const navLinks = document.querySelectorAll("a");
	const inputs = Array.from(document.getElementsByTagName("input"));

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			inputs.forEach((input) => {
				input.value = ""; //  Clear all inputs when a link is clicked
			});

			e.preventDefault();
			navigate(e.currentTarget.getAttribute("href"));
		});
	});
}

function preventFormBehavior() {
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

export { preventLinksBehavior, preventFormBehavior };
