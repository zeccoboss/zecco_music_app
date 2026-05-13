// import { adjustPlaylistContainerSvg } from "@zecco/utils/adjustSvgSize.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "@zecco/core/screenBreakPoints.js";
import CreateElement from "@zecco/utils/CreateElement.js";
import {
	heartSvg,
	playCircleFill,
	threeDotMenu,
} from "@zecco/utils/SVG_ICONS.js";

const TRACK_COVER = "@zecco/assets/images/track-cover.png";

const PlaylistContainer = () => {
	// Create element
	const playlistContainer = new CreateElement("div");

	// Attr
	playlistContainer.addClass("playlist_ontainer");
	playlistContainer.setId("playlist-ontainer");

	playlistContainer.innerHTML = `
		Explore More
	`;

	return playlistContainer.getElement();
};

export default PlaylistContainer;
