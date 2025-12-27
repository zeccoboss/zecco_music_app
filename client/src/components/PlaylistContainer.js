// import { adjustPlaylistContainerSvg } from "../utils/adjustSvgSize.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "../core/screenBreakePoints.js";
import CreateElement from "../utils/CreateElement.js";
import { heartSvg, playCircleFill, threeDotMenu } from "../utils/SVG_ICONS.js";
import musicImage from "../assets/images/favicon.png";

const PlaylistContainer = () => {
	// Create element
	const playlistContainer = new CreateElement("div");

	// Attr
	playlistContainer.addClass("playlist_ontainer");
	playlistContainer.setId("playlist-ontainer");

	const htmlContent = `
		Explore More
	`;

	playlistContainer.setInnerHTML(htmlContent);
	return playlistContainer.getElement();
};

export default PlaylistContainer;

// const PlaylistContainerSvgs = PlaylistContainer.getChildren("svg", "el");
// if (mobileScreen.matches) {
// 	adjustPlaylistContainerSvg(PlaylistContainerSvgs, 16);
// } else if (bigScreen.matches) {
// 	adjustPlaylistContainerSvg(PlaylistContainerSvgs, 18);
// } else if (largeScreen.matches) {
// 	adjustPlaylistContainerSvg(PlaylistContainerSvgs, 18);
// }

// const overlaySvg = PlaylistContainer.getChild(
// 	".bi-play-circle-fill",
// 	"class"
// );
// overlaySvg.setAttribute("height", "35");
// overlaySvg.setAttribute("width", "35");

// PlaylistContainer.addEvent("mouseover", (e) => {
// 	const cardOverlay = e.currentTarget.querySelector(".card_overlay");
// 	cardOverlay.style.cssText = `
// 		z-index: 10;
// 	`;
// });

// PlaylistContainer.addEvent("mouseout", (e) => {
// 	const cardOverlay = e.currentTarget.querySelector(".card_overlay");
// 	cardOverlay.style.cssText = `
// 		z-index: 0;
// 	`;
// });
