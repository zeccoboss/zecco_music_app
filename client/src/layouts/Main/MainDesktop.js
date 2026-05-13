import CreateElement from "@zecco/utils/dom/create-element";

const MainDesktop = async () => {
	// Create element
	const mainInstance = new CreateElement("main");

	// Set attributes
	mainInstance.addClass("main");
	mainInstance.setId("main");

	return mainInstance.getElement();
};

export default MainDesktop;
