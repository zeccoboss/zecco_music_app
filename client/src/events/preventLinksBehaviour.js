import { navigate } from "../routes/router.js";

function preventLinksBehaviour() {
	const navLinks = document.querySelectorAll("a");

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();

			// console.log("href: ", e.currentTarget.getAttribute("href"));

			navigate(e.currentTarget.getAttribute("href"));
		});
	});
}

export { preventLinksBehaviour };
