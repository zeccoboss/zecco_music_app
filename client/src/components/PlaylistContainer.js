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
