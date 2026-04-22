const clearActiveNav = () => {
	const navs = document.querySelectorAll(".active-nav");

	navs.forEach((section) => {
		section.classList.remove("active-nav");
	});
};

const clearActiveSection = () => {
	const sections = document.querySelectorAll(".active-section");

	sections.forEach((section) => {
		section.classList.remove("active-section");
	});
};

const applyActiveNav = (selector) => {
	// Query the element
	const nav = document.querySelector(`#${selector}`);
	if (nav)
		nav.classList.add("active-nav"); // Add the active class
	else console.warn("[Nav Helpers]: No nav element to set active");
};

export { applyActiveNav, clearActiveSection, clearActiveNav };

// const clearActiveNav = () => {
// 	const navs = document.querySelectorAll(".active-nav");

// 	navs.forEach((section) => {
// 		section.classList.remove("active-nav");
// 	});
// };

// const setActiveNav = (selector) => {
// 	// Query the element
// 	const nav = document.querySelector(`#${selector}`);
// 	if (nav)
// 		nav.classList.add("active-nav"); // Add the active class
// 	else console.warn("[Nav Helpers]: No nav element to set active");
// };

// const clearActiveSection = () => {
// 	const section = document.querySelector(".active-section");

// 	console.log("clear: ", section);

// 	// If it exist hide it from the page
// 	if (section) section.classList.remove(".active-section");
// };

// const setActiveSection = (section, key = "active-section") => {
// 	clearActiveSection(); // Clear existing active page

// 	if (section instanceof Node && key) {
// 		section.classList.add(key); // Display the page
// 	} else {
// 		console.error("[ACTIVE-SECTION]: Could not set active page!"); // Give error when there is no page
// 	}
// };

// export { setActiveNav, clearActiveSection, clearActiveNav, setActiveSection };
