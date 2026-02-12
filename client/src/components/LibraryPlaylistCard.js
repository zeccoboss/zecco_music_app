import musicImage from "../assets/images/favicon.png";
import { threeDotMenuSvg } from "../assets/svgs/svgIcons";
import CreateElement from "../utils/CreateElement";

const LibraryPlaylistCard = (cover, title, date) => {
	const card = new CreateElement("div");
	const card1 = {};

	card.addClass("lib_playlist_card");
	card.addClass("lib-playlist-card");

	card1.innerHTML = `
		<div class="lib_playlist_cover_ctn">
			<img src="${musicImage}" alt="Playlist cover" class="lib_playlist_cover_img"/>
		</div>
		<div class="lib_playlist_content">
			<h3 class="lib_plt_crd_title">Title</h3>
			<p class="lib_pl_p">Playlist</p>
			<p class="lib_pl_p">Songs: 0</p>
			<p class="lib_pl_p">Created at: 08:24-Tue</p>
			<p class="lib_pl_p">Created by: ZECCO</p>
		</div>
	`;

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
