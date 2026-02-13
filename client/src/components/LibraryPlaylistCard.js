import musicImage from "../assets/images/favicon.png";
import { threeDotMenuSvg } from "../assets/svgs/svgIcons";
import CreateElement from "../utils/CreateElement";

const LibraryPlaylistCard = (cover, title, date) => {
	const card = new CreateElement("div");
	const card1 = {};

	card.addClass("lib_playlist_card");
	card.addClass("lib-playlist-card");

	card.innerHTML = `
		<div class="lib_playlist_cover_ctn">
			<img src="${musicImage}" alt="Playlist cover" class="lib_playlist_cover_img"/>
		</div>
		<div class="lib_playlist_content">
			<h3 class="title">Playlist Name</h3>
			<small class="label">Playlist</small>
		</div>
		<div>
			${threeDotMenuSvg}
		</div>
	`;

	return card.outerHTML;
};
export default LibraryPlaylistCard;
