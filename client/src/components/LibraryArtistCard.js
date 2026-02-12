import musicImage from "../assets/images/favicon.png";
import { threeDotMenuSvg } from "../assets/svgs/svgIcons";
import CreateElement from "../utils/CreateElement";

const LibraryArtistCard = () => {
	const libraryArtistCard = new CreateElement("section");

	// Set attributes
	libraryArtistCard.addClass("lib_artist_card");
	libraryArtistCard.setId("lib-artist-card");

	// Add inner HTML
	libraryArtistCard.innerHTML = `
		<div class="lib_artist_cover_ctn">
			<img src="${musicImage}" alt="artist cover" class="lib_artist_cover_img" width="100" heigh="100"/>
		</div>
		<div>
			<h3 class="title">Artist Name</h3>
			<small class="label">Artist </small>
		</div>
		<div>
			${threeDotMenuSvg}
		</div>
	`;

	return libraryArtistCard.outerHTML;
};
export default LibraryArtistCard;
