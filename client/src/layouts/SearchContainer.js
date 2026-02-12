import CreateElement from "../utils/CreateElement.js";

const SearchContainer = () => {
	// Create element
	const searchContainer = new CreateElement("section");

	// Set attributes
	searchContainer.addClass("search_section", "main_sections");
	searchContainer.setId("search-section");

	searchContainer.innerHTML = `
		<div class="recent_search_container">
			<p>No search yet...</p>
		</div>
	`;

	//
	return searchContainer.getElement();
};

export default SearchContainer;
