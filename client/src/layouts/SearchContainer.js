import CreateElement from "../utils/create-element.js";

const SearchContainer = () => {
	// Create element
	const searchContainerInstance = new CreateElement("section");

	// Set attributes
	searchContainerInstance.addClass("search_section", "main_sections");
	searchContainerInstance.setId("search-section");

	searchContainerInstance.innerHTML = `
		<div class="recent_search_container">
			<p>No search yet...</p>
		</div>
	`;

	return searchContainerInstance.getElement();
};
export { SearchContainer };
