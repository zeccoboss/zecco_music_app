import NotFoundSection from "../components/404Section.js";
import HomeSection from "../components/HomeSection.js";
import LibrarySection from "../components/LibrarySection.js";
import SearchSection from "../components/SearchSection.js";
import CreateElement from "../utils/CreateElement.js";

const Main = () => {
	// Create element
	const main = new CreateElement("main");

	// Set attributes
	main.addClass("main");
	main.setId("main");

	main
		.getElement()
		.append(
			HomeSection(),
			LibrarySection(),
			SearchSection(),
			NotFoundSection()
		);

	return main.getElement();
};

export default Main;
