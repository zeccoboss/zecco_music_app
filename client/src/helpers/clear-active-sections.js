const clearActiveSections = () => {
	const sections = document.querySelectorAll(".active_section");

	sections.forEach((section) => {
		section.classList.remove("active_section");
	});
};

export { clearActiveSections };
