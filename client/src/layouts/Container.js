import CreateElement from "../utils/CreateElement.js";

// Create element
const containerInstance = new CreateElement("div");

// Set attributes
containerInstance.addClass("container");
containerInstance.setId("container");

const Container = async (main, aside) => {
	containerInstance.getElement().append(aside(), await main());
	return containerInstance.getElement();
};

export { containerInstance, Container };
