import CreateElement from "../utils/CreateElement.js";
import MusicCard from "./MusicCard.js";

const HomeSection = () => {
	// Create element
	const homeSection = new CreateElement("section");

	// Set attributes
	homeSection.addClass("home_section", "main_sections", "active_section");
	homeSection.setId("home-section");

	homeSection
		.getElement()
		.append(
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard(),
			MusicCard()
		);

	return homeSection.getElement();
};

export default HomeSection;
