import CreateElement from "../utils/CreateElement.js";

const NotFoundSection = () => {
	// Create element
	const notFoundSection = new CreateElement("section");

	const htmlContent = `<h2>404 Resource not found</h2>`;

	// Set attributes
	notFoundSection.addClass("not_found_section", "main_sections");
	notFoundSection.setId("not-found-section");

	// console.error("No section found");

	notFoundSection.setInnerHTML(htmlContent);

	notFoundSection.style(`
		display: flex;
		place-content: center;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		padding-top: 3rem;
		color: hsla(0, 80%, 80%);
	`);

	//
	return notFoundSection.getElement();
};

export default NotFoundSection;
