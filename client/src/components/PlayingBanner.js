import CreateElement from "../utils/CreateElement.js";
import { musicListSvg, playSvg } from "../utils/SVG_ICONS.js";
import music_cover from "../assets/images/favicon.png";

const PlayingBanner = () => {
	// Create element
	const playingBanner = new CreateElement("section");

	// Set attributes
	playingBanner.addClass("playing_banner");
	playingBanner.setId("playing-banner");

	playingBanner.innerHTML = `
		<figure>
			<img src="${music_cover}" alt="Playing" class="playing_banner_music_photo" id="playing-banner-music-photo" aria-label="Playing banner image" width="50" height="50" loading="lazy"/>
			<figcaption class="banner_music_img_caption">
				Currently Playing Cover
			</figcaption>
		</figure>

		<div class="playing_banner_btns">
			<button aria-label="Play/Pause" class="play_pause_button">
				${playSvg}
			</button>

			<button class="banner_music_list_btn">${musicListSvg}</button>
		</div>
	`;

	const playingBannerSVGs = playingBanner.getChildren("svg", "element");

	playingBannerSVGs.forEach((svg) => {
		svg.setAttribute("width", "20");
		svg.setAttribute("height", "20");
		svg.style.fill = "white";
	});

	return playingBanner.getElement();
};

export default PlayingBanner;
