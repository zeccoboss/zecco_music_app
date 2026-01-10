import { adjustMusicCardSvg } from "../utils/adjustSvgSize.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "../core/screenBreakPoints.js";
import CreateElement from "../utils/CreateElement.js";
import { heartSvg, playCircleFill, threeDotMenu } from "../utils/SVG_ICONS.js";
import musicImage from "../assets/images/favicon.png";

const MusicCard = (audio) => {
	// Create element
	const musicCard = new CreateElement("div");
	const {
		_id,
		title,
		artist,
		artists,
		duration,
		bitrate,
		sampleRate,
		album,
		genre,
		hasCover,
		hasVideo,
		year,
		coverUrl,
		audioUrl,
	} = audio;

	musicCard.addClass("music_card");
	musicCard.setId(audio._id);

	const htmlContent = `
		 <div class="card_img_container">
			<img src="${
				audio.hasCover ? audio.coverUrl : musicImage
			}" class="card_img" alt="Music card image" srcset="" width="50" height="50" loading="lazy"/>
			<div class="card_overlay">
				${playCircleFill}
			</div>
		</div>

		<div class="card_music_details">
			<h4 class="card_artist_name">${audio.artist ? artist : "Unknown artist"}</h4>
			<p class="card_music_title">${audio.title ? title : "Unknown title"}</p>
		</div>

		<div class="music_card_control">
			<button class="card_lick_btn">${heartSvg}</button>
			<button class="card_options_btn">${threeDotMenu}</button>
		</div>
	`;
	musicCard.setInnerHTML(htmlContent);

	const musicCardSvgs = musicCard.getChildren("svg", "el");
	if (mobileScreen.matches) {
		adjustMusicCardSvg(musicCardSvgs, 16);
	} else if (bigScreen.matches) {
		adjustMusicCardSvg(musicCardSvgs, 18);
	} else if (largeScreen.matches) {
		adjustMusicCardSvg(musicCardSvgs, 18);
	}

	const overlaySvg = musicCard.getChild(".bi-play-circle-fill", "class");
	overlaySvg.setAttribute("height", "35");
	overlaySvg.setAttribute("width", "35");

	musicCard.addEvent("mouseover", (e) => {
		const cardOverlay = e.currentTarget.querySelector(".card_overlay");
		cardOverlay.style.cssText = `
			z-index: 10;
		`;
	});

	musicCard.addEvent("mouseout", (e) => {
		const cardOverlay = e.currentTarget.querySelector(".card_overlay");
		cardOverlay.style.cssText = `
			z-index: 0;
		`;
	});

	return musicCard.getElement();
};

export default MusicCard;
