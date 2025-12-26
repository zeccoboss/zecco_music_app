import CreateElement from "../utils/CreateElement.js";
import {
	heartSvg,
	loopSvg,
	nextSvg,
	playSvg,
	plusPlaylistSvg,
	previousSvg,
	shuffleSvg,
	threeDotMenu,
} from "../utils/SVG_ICONS.js";
import musicImage from "../images/favicon.png";
import { adjustFooterSvg } from "../utils/adjustSvgSize.js";

const Footer = () => {
	// Create element
	const footer = new CreateElement("footer", "Footer");

	// Set attributes
	footer.addClass("footer");
	footer.setId("footer");

	const htmlContent = `
		<input type="range" name="" value="0" id="" min="0" max="100" class="music_range_input" aria-label="Music progress range"/>

		<div class="footer_container">
			<section class="music_data">
				<figure class="music_image_container">
					<img src="${musicImage}" alt="Music cover image" class="music_image_cover" id="music-image-cover" loading="lazy" width="100" height="100"/>
					<figcaption class="music_cover_caption">Music cover</figcaption>
				</figure>

				<div class="music_details">
					<h3 class="song_title" id="song-title">Song Title</h3>
					<p class="artist_name" id="artist-name">Artist Name</p>
				</div>
			</section>

			<section class="action_btns">
				<button aria-label="Previous" class="previous_btn" id="previous-button">
					${previousSvg}
				</button>

				<button aria-label="Play/Pause" class="play_pause_btn" id="play-pause-btn">
					${playSvg}
				</button>

				<button aria-label="Next" class="next_btn" id="next-button">
					${nextSvg}
				</button>
			</section>

			<div class="music_controls">
				<div class="duration_container">
					<span class="current_time">0:00</span> / <span class="current_time">0:00</span>
				</div>

				<button aria-label="Add song to playlist button" class="add_to_playlist_btn" id="add-to-playlist-btn">
					${plusPlaylistSvg}
				</button> 

				<button aria-label="Favorite song button" class="fave_btn" id="fave-button">
					${heartSvg}
				</button>

				<button aria-label="/Shuffle" class="random_btn" id="randon-button">
					${shuffleSvg}
				</button>

				<button aria-label="Repeat/Loop" class="sleep_timer_btn" id="sleep-timer-button">
					${loopSvg}
				</button>

				<button aria-label="menu song button" class="menu_btn" id="menu-button">
					${threeDotMenu}
				</button>
			</div>
		</div>

 	`;

	footer.setInnerHTML(htmlContent);

	const footerSVGs = footer.getChildren("svg", "el");

	adjustFooterSvg(footerSVGs, 50, 30, 20, "white");

	// Return footer element
	return footer.getElement();
};

export default Footer;
