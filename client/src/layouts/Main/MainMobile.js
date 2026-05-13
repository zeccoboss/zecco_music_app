import CreateElement from "@zecco/utils/dom/create-element";

//
const MainMobile = () => {
	// Create element
	const main = new CreateElement("main");

	// Set attributes
	main.addClass("mobile-main").setId("mobile-main");

	return main.getElement();
};
export { MainMobile };
