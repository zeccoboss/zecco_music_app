import { router } from "../routes/router";

function preventLinksBehavior() {
	const links = document.querySelectorAll("a");
	const inputs = Array.from(document.getElementsByTagName("input"));

	// inputs.forEach((input) => {
	// 	input.value = ""; //  Clear all inputs when a link is clicked
	// });

	for (const link of links) {
		link.addEventListener("click", (e) => {
			e.preventDefault(); // Prevents all links from refreshing the page
			router.navigateTo(e.currentTarget.getAttribute("href")); // Give path to navigate to
		});
	}
}

export { preventLinksBehavior };
