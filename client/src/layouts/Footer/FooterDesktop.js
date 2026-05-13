import CreateElement from "@zecco/utils/dom/create-element";
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
} from "@zecco/assets/svgs/svg-icons";

// ── Image paths ─────────────────────────────────────────────────────────────
import TRACK_COVER from "@zecco/assets/images/track-cover.png";

// Return footer element
const FooterDesktop = () => {
	// Create element
	const footerInstance = new CreateElement("footer", "Footer");

	// Set attributes
	footerInstance.addClass("player").setId("footer").innerHTML = `
		<div class="player-track">
			<div class="player-thumb">
				<figure class="player-thumb-container">
					<img src="${TRACK_COVER}" alt="Track cover image" class="player-thumb-image" id="player-thumb-image" loading="lazy" width="100" height="100"/>
					<figcaption class="player-thumb-caption visibly-hidden">Track cover</figcaption>
				</figure>
			</div>
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

	return footerInstance.getElement();
};

export default FooterDesktop;
