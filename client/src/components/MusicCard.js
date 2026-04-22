// biome-ignore assist/source/organizeImports: <I will organize later>
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "../core/screen-break-points.js";
import CreateElement from "../utils/create-element.js";
import {
	heartSvg,
	playSvg,
	threeDotMenuSvg,
} from "../assets/svgs/svg-icons.js";
import musicImage from "../assets/images/favicon.png";

const MusicCard = (audio = null) => {
	// Create element
	const musicCard = new CreateElement("div");

	musicCard.addClass("music_card");
	musicCard.setId(audio._id ?? null);

	musicCard.innerHTML = `
		 <div class="card_img_container">
			<img src="${
				audio?.hasCover
					? `http://127.0.0.1:9000/${audio.coverUrl}`
					: audio?.coverUrl
			}" class="card_img" alt="Music card image" srcset="" width="50" height="50" loading="lazy"/>
			<div class="card_overlay">
				${playSvg}
			</div>
		</div>

		<div class="card_music_details">
			<h4 class="card_artist_name">${audio?.artist ?? "Unknown artist"}</h4>
			<p class="card_music_title">${audio?.title ?? "Unknown title"}</p>
		</div>

		<div class="music_card_control">
			<button class="card_lick_btn">${heartSvg}</button>
			<button class="card_options_btn">${threeDotMenuSvg}</button>
		</div>
	`;

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
