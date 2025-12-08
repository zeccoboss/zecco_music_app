import { navigate } from "../routes/router.js";

function preventLinksBehaviour() {
	const navLinks = document.querySelectorAll("a");

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();

			// console.log("href: ", e.currentTarget.getAttribute("href"));
			console.log("href: ", e.currentTarget);

			navigate(e.currentTarget.getAttribute("href"));
		});
	});
}

function preventFormBehaviour() {
	const extraContent = document.querySelector(".extra_content");
	const forms = extraContent.querySelectorAll(".forms");
	console.log(forms);

	console.log(extraContent);

	forms.forEach((form) => {
		const formLink = form.querySelectorAll("a");

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			// console.log("href: ", e.currentTarget.getAttribute("href"));
			console.log("href: ", e.currentTarget);

			// navigate(e.currentTarget.getAttribute("href"));
		});
	});
}

export { preventLinksBehaviour, preventFormBehaviour };
