import CreateElement from "../utils/CreateElement";
import LibrarySkeleton from "../components/skeleton/LibrarySkeleton";
import {
	chevronDownSvg,
	heartFillSvg,
	recentSvg,
	uploadSvg,
} from "../assets/svgs/svgIcons";
import LibraryPlaylistCard from "../components/LibraryPlaylistCard";
import LibraryArtistCard from "../components/LibraryArtistCard";
import { mobileScreen } from "../core/screenBreakPoints";
import { buttonWrapper } from "../components/HeaderBtnContainer.js";

// Create element
const libraryContainerInstance = new CreateElement("section");
const libraryContent = new CreateElement("section");

// Set attributes
libraryContainerInstance.addClass("library_section", "main_sections");
libraryContainerInstance.setId("library-section");

// Library content
libraryContent.addClass("library_content", "show_lib_content");
libraryContent.setId("library-content");

const LibraryContainer = () => {
	// Set inner HTML
	const libraryContentWrapper = `
		<section class="user_library lib_secs">
			<div class ="lib_sec_header">
				<h3 class="">Your Library</h3> 
				<!-- ${chevronDownSvg} -->
			</div>

			<div class="liked_tab lib_card" 	data-action="liked_tab">
				<div class="lib_card_cover">
					${heartFillSvg}
				</div>
				<div class="lib_crd_content">
					<h3>Liked Songs</h3>
					<p><span>0</span> songs</p>
				</div>	
			</div>

			<div class="uploaded_tab lib_card">
				<div class="lib_card_cover">
					${uploadSvg}
				</div>
				<div class="lib_crd_content">
					<h3>Uploaded Tracks</h3>
					<p><span>0</span> Uploads</p>
				</div>
			</div>

			<div class="recent_play_tab lib_card">
				<div class="lib_card_cover">
					${recentSvg}
				</div>
				<div class="lib_crd_content">
					<h3>Recently Played</h3>
					<p>0 Played songs</p>
				</div>
			</div>
		</section>

		<section class="lib_secs lib_playlist_sec">
			<div class ="lib_sec_header">
				<h3 class="">Your Playlists</h3>
				${chevronDownSvg}
			</div>

			<div class="lib_playlist_ctn">
				${LibraryPlaylistCard()}
				${LibraryPlaylistCard()}
			</div>
		</section>

		<section class="lib_secs lib_artist_sec">
			<div class ="lib_sec_header">	
				<h3 class="">Following</h3>
				${chevronDownSvg}
			</div>

			<div class="lib_artist_ctn">
				${LibraryArtistCard()}
				${LibraryArtistCard()}
			</div>
		</section>
	`;

	if (!mobileScreen.matches) {
		libraryContent.appendContent(
			buttonWrapper.libraryBtns,
			libraryContentWrapper,
		);
	} else {
		libraryContent.appendContent(libraryContentWrapper);
	}

	// Empty library section
	const emptyLibraryCtn = `
	<section class="empty_lib_content" id="empty-library">
		<h2>Library</h2>

		<div class="empty_lib_container">
			<h3>No content in your library.</h3>
			<p>To access your library  
				<strong><a href="/register" class="empty_lib_links muted_link">Sign up</a></strong> to continue or <strong><a href="/login" class="empty_lib_links muted_link">Login</a></strong> to access all features.</p>
			<div class="lib_lnks_ctn">
				<a href="/register" class="empty_lib_links">Sign up</a>
				<a href="/login" class="empty_lib_links">Login</a> 
			</div>
		</div>
	</section>
`;

	const libCardCover = libraryContent.getChildren(".lib_card_cover");
	libCardCover.forEach((el) => {
		const svg = el.querySelector("svg");
		svg.setAttribute("width", "25");
		svg.setAttribute("height", "25");
	});

	libraryContainerInstance.appendContent(
		libraryContent.getElement(),
		emptyLibraryCtn,
		// LibrarySkeleton(),
	);
	// const btns = libraryContainerInstance.getChildren("lib_btns", "class");
	return libraryContainerInstance.getElement();
};
export { libraryContainerInstance, LibraryContainer };
