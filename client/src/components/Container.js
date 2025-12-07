import CreateElement from "../utils/CreateElement.js";

const Container = (main, aside) => {
	// Create element
	const container = new CreateElement("div");

	// Set attributes
	container.addClass("container");
	container.setId("container");

	container.getElement().append(aside(), main());

	return container.getElement();
};

export default Container;
