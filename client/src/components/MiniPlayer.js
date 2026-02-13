import CreateElement from "../utils/CreateElement.js";
import { musicListSvg, playSvg } from "../assets/svgs/svgIcons.js";
import music_cover from "../assets/images/favicon.png";

// Create element
const miniPlayerInstance = new CreateElement("section");

// Set attributes
miniPlayerInstance.addClass("mini_player");
miniPlayerInstance.setId("playing-banner");

miniPlayerInstance.innerHTML = `
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

const playingBannerSVGs = miniPlayerInstance.getChildren("svg", "element");

playingBannerSVGs.forEach((svg) => {
	svg.setAttribute("width", "20");
	svg.setAttribute("height", "20");
	// svg.style.fill = "white";
});

const MiniPlayer = () => miniPlayerInstance.getElement();

export { miniPlayerInstance, MiniPlayer };
