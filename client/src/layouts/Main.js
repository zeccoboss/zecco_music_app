import HomeSection from "../components/HomeSection.js";
import LibrarySection from "../components/LibrarySection.js";
import ProfileSection from "../components/ProfileSection.js";
import SearchSection from "../components/SearchSection.js";
import CreateElement from "../utils/CreateElement.js";

const Main = async () => {
	// Create element
	const main = new CreateElement("main");

	// Set attributes
	main.addClass("main");
	main.setId("main");

	main.append(
		await HomeSection(),
		LibrarySection(),
		SearchSection(),
		ProfileSection(),
		ProfileSection()
	);

	return main.getElement();
};

export default Main;
