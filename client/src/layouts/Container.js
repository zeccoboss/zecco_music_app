import CreateElement from "../utils/CreateElement.js";
const containerInstance = new CreateElement("div");

const Container = async (main, aside) => {
	// Create element

	// Set attributes
	containerInstance.addClass("container");
	containerInstance.setId("container");

	containerInstance.getElement().append(aside(), await main());

	return containerInstance.getElement();
};

export { containerInstance, Container };
