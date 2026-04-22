import CreateElement from "../../utils/create-element.js";
import {
	heartSvg,
	loopSvg,
	skipNextSvg,
	playSvg,
	plusPlaylistSvg,
	skipBack,
	shuffleSvg,
	threeDotMenuSvg,
	volumeUpSvg,
} from "../../assets/svgs/svg-icons.js";
import musicImage from "../../assets/images/favicon.png";

// Return footer element
const Footer = () => {
	// Create element
	const footerInstance = new CreateElement("footer", "Footer");

	// Set attributes
	footerInstance.addClass("player").setId("footer").innerHTML = `
		<div class="player-track">
			<div class="player-thumb">🎵</div>
			<div>
				<div class="player-title">Midnight Drive</div>
				<div class="player-artist">Artist Name</div>
			</div>
			<div class="player-like">${heartSvg}</div>
		</div>

		<div class="player-center">
			<div class="ctrl-btns">

				<button class="ctrl">${shuffleSvg}</button>
				<button class="ctrl">${skipBack}</button>
				<button class="ctrl main">${playSvg}</button>
				<button class="ctrl">${skipNextSvg}</button>
				<button class="ctrl">${loopSvg}</button>
			</div>
			<div class="progress">
				<span class="time">1:24</span>
				<div class="track">
					<div class="track-fill"></div>
				</div>
				<span class="time" style="text-align: right"
					>3:45</span
				>
			</div>
		</div>

		<div class="player-right">
			<div class="vol">
				<span class="vol-icon">${volumeUpSvg}</span>
				<div class="vol-track">
					<div class="vol-fill"></div>
				</div>
			</div>
			<div class="queue-btn">≡ Queue</div>
		</div>
	`;

	/*
	.innerHTML = `
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

			<section class="action_btns_ctnr">
				<div class="action_btns">
					<button aria-label="/Shuffle" class="random_btn" id="random-button">
						${shuffleSvg}
					</button>

					<button aria-label="Previous" class="previous_btn" id="previous-button">
						${skipBack}
					</button>

					<button aria-label="Play/Pause" class="play_pause_btn" id="play-pause-btn">
						${playSvg}
					</button>

					<button aria-label="Next" class="next_btn" id="next-button">
						${skipNextSvg}
					</button>

					<button aria-label="Repeat/Loop" class="sleep_timer_btn" id="sleep-timer-button">
						${loopSvg}
					</button>
				</div>

				<input type="range" name="" value="0" id="" min="0" max="100" class="music_range_input" aria-label="Music progress range"/>
			</section>

			<div class="music_controls">
				<div class="duration_container">
					<span class="current_time">0:00</span> / <span class="current_time">0:00</span>
				</div>

				<button aria-label="Add song to playlist button" class="add_to_playlist_btn" id="adto-playlist-btn">
					${plusPlaylistSvg}
				</button> 

				<button aria-label="Favorite song button" class="fave_btn" id="fave-button">
					${heartSvg}
				</button>

				<button aria-label="menu song button" class="menu_btn" id="menu-button">
					${threeDotMenuSvg}
				</button>
			</div>
		</div>
 	`;
	*/

	// const footerSVGs = footerInstance.getChildren("svg");

	// adjustFooterSvg(footerSVGs, 50, 30, 20, "white");

	return footerInstance.getElement();
};

export { Footer };
