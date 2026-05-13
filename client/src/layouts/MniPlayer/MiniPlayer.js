import CreateElement from "@zecco/utils/dom/create-element.js";

// ── Image paths ─────────────────────────────────────────────────────────────
import TRACK_COVER from "@zecco/assets/images/track-cover.png";

const MiniPlayer = () => {
	// Create element
	const player = new CreateElement("section");

	// Set attributes
	player.addClass("mini-player").setId("mini-player");

	player.innerHTML = `
		<div class="player-thumb">
			<figure class="player-thumb-container">
				<img src="${TRACK_COVER}" alt="Track cover image" class="player-thumb-image" id="player-thumb-image" loading="lazy" width="100" height="100"/>
				<figcaption class="player-thumb-caption visibly-hidden">Track cover</figcaption>
			</figure>
		</div>
		<div class="mini-player-info">
			<div class="mini-player-title">Midnight Drive</div>
			<div class="mini-player-artist">Artist Name</div>
		</div>
		<button class="mini-player-ctrl" aria-label="Play/Pause">
			<i class="bi bi-play"></i>
		</button>
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
