import CreateElement from "../utils/CreateElement.js";

const Container = async (main, aside) => {
	// Create element
	const containerInstance = new CreateElement("div");

	// Set attributes
	containerInstance.addClass("container");
	containerInstance.setId("container");

	containerInstance.getElement().append(aside(), await main());

	return containerInstance.getElement();
};

export { Container };
