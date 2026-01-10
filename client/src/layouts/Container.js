import CreateElement from "../utils/CreateElement.js";

const Container = async (main, aside) => {
	// Create element
	const container = new CreateElement("div");

	// Set attributes
	container.addClass("container");
	container.setId("container");

	container.getElement().append(aside(), await main());

	return container.getElement();
};

export default Container;
