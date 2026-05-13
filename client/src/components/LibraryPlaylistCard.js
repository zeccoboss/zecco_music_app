import CreateElement from "@zecco/utils/dom/create-element";

// ── Image paths ─────────────────────────────────────────────────────────────
const TRACK_COVER = "@zecco/assets/images/track-cover.png";

const LibraryPlaylistCard = (cover, title, date) => {
	const card = new CreateElement("div");
	const card1 = {};

	card.addClass("lib_playlist_card");
	card.addClass("lib-playlist-card");

	card.innerHTML = `
		<div class="lib_playlist_cover_ctn">
			<img src="${TRACK_COVER}" alt="Playlist cover" class="lib_playlist_cover_img"/>
		</div>
		<div class="lib_playlist_content">
			<h3 class="title">Playlist Name</h3>
			<small class="label">Playlist</small>
		</div>
		<div>
			<i class="fa-solid fa-ellipsis"></i>
		</div>
	`;

	return card.outerHTML;
};
export default LibraryPlaylistCard;
