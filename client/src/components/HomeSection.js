import CreateElement from "../utils/CreateElement.js";
import MusicCard from "./MusicCard.js";
import PlaylistContainer from "./PlaylistContainer.js";

const HomeSection = () => {
	// Create element
	const homeSection = new CreateElement("section");
	const musicCardContainer = new CreateElement("section");

	// Set attributes
	homeSection.addClass("home_section", "main_sections", "active_section");
	homeSection.setId("home-section");
	musicCardContainer.setId("music-card-container");
	musicCardContainer.addClass("music_card_container");

	homeSection.append(
		MusicCard(),
		MusicCard(),
		MusicCard(),
		MusicCard(),
		MusicCard()
	);

	// homeSection.append(PlaylistContainer(), musicCardContainer.getElement());

	return homeSection.getElement();
};

export default HomeSection;
