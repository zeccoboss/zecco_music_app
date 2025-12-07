const clearActiveNav = () => {
	const sections = document.querySelectorAll(".active_nav");

	sections.forEach((section) => {
		section.classList.remove("active_nav");
	});
};

export { clearActiveNav };
