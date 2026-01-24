const restoreDefaultLayout = () => {
	const homeSection = document.querySelector(".home_section");
	const formPage = document.querySelector(".extra_content");
	const overlay = document.querySelector(".overlay");

	homeSection.classList.add("active_section");

	// formPage.classList.remove("show_form_page");
	overlay.classList.remove("show_overlay");
};

export default restoreDefaultLayout;
