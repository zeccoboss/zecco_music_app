import CreateElement from "../../utils/create-element.js";
import { musicListSvg, playSvg } from "../../assets/svgs/svg-icons.js";
import music_cover from "../../assets/images/favicon.png";

const MiniPlayer = () => {
	// Create element
	const player = new CreateElement("section");

	// Set attributes
	player.addClass("mini-player").setId("mini-player");

	player.innerHTML = `
		<div class="mini-player-thumb">🎵</div>
		<div class="mini-player-info">
			<div class="mini-player-title">Midnight Drive</div>
			<div class="mini-player-artist">Artist Name</div>
		</div>
		<button class="mini-player-ctrl">⏸</button>
	`;

	return player.getElement();
};

export { MiniPlayer };

// leMiniPlayer.innerHTML = `
// 	<figure>
// 		<img src="${music_cover}" alt="Playing" class="playing_banner_music_photo" id="playing-banner-music-photo" aria-label="Playing banner image" width="50" height="50" loading="lazy"/>
// 		<figcaption class="banner_music_img_caption">
// 			Currently Playing Cover
// 		</figcaption>
// 	</figure>

// 	<div class="playing_banner_btns">
// 		<button aria-label="Play/Pause" class="play_pause_button">
// 			${playSvg}
// 		</button>

// 		<button class="banner_music_list_btn">${musicListSvg}</button>
// 	</div>
// `;
