import CreateElement from "../utils/CreateElement.js";

const SearchSection = () => {
	// Create element
	const searchSection = new CreateElement("section");

	// Set attributes
	searchSection.addClass("search_section", "main_sections");
	searchSection.setId("search-section");

	const htmlContent = `
		<div class="recent_search_container">
			<p>No search yet...</p>
		</div>
	`;

	searchSection.setInnerHTML(htmlContent);

	//
	return searchSection.getElement();
};

export default SearchSection;
