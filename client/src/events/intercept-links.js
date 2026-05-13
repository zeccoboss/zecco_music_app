import { router } from "@zecco/routes/router";

function interceptLinks() {
	document.addEventListener("click", (e) => {
		const link = e.target.closest("a"); // Check if the clicked element is an anchor tag or inside one

		// If it's a link, prevent the default behavior and use the router to navigate
		if (link?.href.startsWith(window.location.origin)) {
			e.preventDefault();
			router.navigateTo(link.getAttribute("href"));
		}
	});
}

export { interceptLinks };
