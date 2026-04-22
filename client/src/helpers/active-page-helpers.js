// Show the active page
function setActivePage(page, key) {
	// Check if theres page and if page is valid with the correct value passed
	if (
		page instanceof Node &&
		page.classList.contains("app-page") &&
		key === "active-app-page"
	) {
		clearActivePage(); // Clear existing active page
		page.classList.add(key); // Display the page
	} else {
		console.error("[ACTIVE-PAGE]: Could not set active page!"); // Give error when there is no page
	}
}

// Hide active page
function clearActivePage() {
	const activeCtn = document.querySelector(".active-app-page");

	// If it exist hide it from the page
	if (activeCtn) activeCtn.classList.remove("active-app-page");
}
export { setActivePage, clearActivePage };
