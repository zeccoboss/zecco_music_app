import LibrarySection from "./LibraryContainer.js";
import SearchSection from "./SearchContainer.js";
import CreateElement from "../utils/CreateElement.js";
import { HomeContainer } from "./HomeContainer.js";
import ProfileContainer from "./ProfileContainer.js";
import LibraryContainer from "./LibraryContainer.js";
import SearchContainer from "./SearchContainer.js";

const Main = async () => {
	// Create element
	const main = new CreateElement("main");

	// Set attributes
	main.addClass("main");
	main.setId("main");

	main.append(
		await HomeContainer(),
		LibraryContainer(),
		SearchContainer(),
		ProfileContainer(),
	);

	return main.getElement();
};

export default Main;
