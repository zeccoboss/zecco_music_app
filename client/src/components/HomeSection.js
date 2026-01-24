import { audioService } from "../services/audioService.js";
import CreateElement from "../utils/CreateElement.js";
import MusicCard from "./MusicCard.js";
import PlaylistContainer from "./PlaylistContainer.js";

const HomeSection = async () => {
	try {
		// Create element
		const homeSection = new CreateElement("section");
		const musicCardContainer = new CreateElement("section");

		// Set attributes
		homeSection.addClass("home_section", "main_sections", "active_section");
		homeSection.setId("home-section");
		musicCardContainer.setId("music-card-container");
		musicCardContainer.addClass("music_card_container");

		// const audios = await processAudio();
		// console.log(audios);

		// audios.forEach((audio) => {
		// 	homeSection.append(MusicCard(audio));
		// });

		// for (const audio of audios) homeSection.append(MusicCard(audio));

		// homeSection.append(PlaylistContainer(), musicCardContainer.getElement());
		// const response = await audioService("/api/media/audio");
		// console.log(response);
		// for (const audio of response.data) homeSection.append(MusicCard(audio));

		return homeSection.getElement();
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default HomeSection;
