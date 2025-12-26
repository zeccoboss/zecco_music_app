import CreateElement from "../utils/CreateElement.js";

const LibrarySection = () => {
	// Create element
	const librarySection = new CreateElement("section", "Library");

	// Set attributes
	librarySection.addClass("library_section", "main_sections");
	librarySection.setId("library-section");

	librarySection.setInnerHTML("Library Section");
	return librarySection.getElement();
};

export default LibrarySection;
