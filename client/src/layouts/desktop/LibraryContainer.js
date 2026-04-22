import CreateElement from "../../utils/create-element.js";
import LibrarySkeleton from "../../components/skeleton/LibrarySkeleton.js";
import {
	chevronDownSvg,
	heartFillSvg,
	recentSvg,
	uploadSvg,
} from "../../assets/svgs/svg-icons.js";
import LibraryPlaylistCard from "../../components/LibraryPlaylistCard.js";
import LibraryArtistCard from "../../components/LibraryArtistCard.js";
import { mobileScreen } from "../../core/screen-break-points.js";
import { buttonWrapper } from "../../components/HeaderBtnContainer.js";
import { buildNode } from "../../utils/build-node.js";

const LibraryContainer = () => {
	// Create element
	const libraryContainer = new CreateElement("section");
	// const libraryContent = new CreateElement("section");

	// Set attributes
	libraryContainer
		.addClass("library_section", "main-sections")
		.setId("library-section").innerHTML = `
			<div class="library-main">
				<div class="library-lib-header">
					<div class="library-header-top">
						<div class="library-page-title">Library</div>
						<div class="library-header-actions">
							<div class="library-header-btn">
								⊕ &nbsp;New Playlist
							</div>
							<div class="library-header-btn">⋯</div>
						</div>
					</div>
					<div class="library-filter-tabs">
						<div class="library-filter-tab active">All</div>
						<div class="library-filter-tab">Liked Songs</div>
						<div class="library-filter-tab">Uploaded</div>
						<div class="library-filter-tab">Playlists</div>
						<div class="library-filter-tab">Following</div>
						<div class="library-filter-tab">Recently Played</div>
					</div>
				</div>
				<div class="library-scroll">
					<div class="library-content">
						<!-- hero cards -->
						<div class="library-hero-row">
							<div class="library-hero-card">
								<div class="library-hero-cover lhc1">❤️</div>
								<div class="library-hero-info">
									<div class="library-hero-title">Liked Songs</div>
									<div class="library-hero-sub">
										24 songs · 1hr 32min
									</div>
								</div>
								<div class="library-hero-play">▶</div>
							</div>
							<div class="library-hero-card">
								<div class="library-hero-cover lhc2">⬆️</div>
								<div class="library-hero-info">
									<div class="library-hero-title">My Uploads</div>
									<div class="library-hero-sub">
										8 tracks · 28min
									</div>
								</div>
								<div class="library-hero-play">▶</div>
							</div>
							<div class="library-hero-card">
								<div class="library-hero-cover lhc3">🕐</div>
								<div class="library-hero-info">
									<div class="library-hero-title">
										Recently Played
									</div>
									<div class="library-hero-sub">
										12 songs · 42min
									</div>
								</div>
								<div class="library-hero-play">▶</div>
							</div>
						</div>

						<!-- playlists -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Your Playlists</div>
								<div class="sec-link">See all →</div>
							</div>
							<div class="library-playlist-grid">
								<div class="library-playlist-card">
									<div class="library-pc-grid">
										<div class="library-pcg pcg1">🎵</div>
										<div class="library-pcg pcg2">🎸</div>
										<div class="library-pcg pcg3">🎹</div>
										<div class="library-pcg pcg4">🥁</div>
									</div>
									<div class="library-pc-title">Afro Vibes</div>
									<div class="library-pc-sub">12 songs</div>
								</div>
								<div class="library-playlist-card">
									<div class="library-pc-cover pc2">🌙</div>
									<div class="library-pc-title">Night Drive</div>
									<div class="library-pc-sub">8 songs</div>
								</div>
								<div class="library-playlist-card">
									<div class="library-pc-cover pc3">🌅</div>
									<div class="library-pc-title">Morning Mix</div>
									<div class="library-pc-sub">15 songs</div>
								</div>
								<div class="library-playlist-card">
									<div class="library-pc-cover pc4">🎊</div>
									<div class="library-pc-title">Party Hits</div>
									<div class="library-pc-sub">20 songs</div>
								</div>
								<div class="library-playlist-card">
									<div class="library-pc-add">＋</div>
									<div
										class="library-pc-title"
										style="color: var(--text-3)"
									>
										New Playlist
									</div>
									<div class="library-pc-sub">Create</div>
								</div>
							</div>
						</div>

						<!-- liked songs table -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Liked Songs</div>
								<div class="sec-link">See all →</div>
							</div>
							<div class="library-track-table">
								<div class="library-track-head">
									<div class="library-track-head-label">#</div>
									<div></div>
									<div class="library-track-head-label">Title</div>
									<div class="library-track-head-label">Genre</div>
									<div class="library-track-head-label">Album</div>
									<div class="library-track-head-label">Time</div>
									<div></div>
								</div>
								<div class="library-track-row playing">
									<div class="library-tr-num">
										<div class="eq">
											<div class="bar"></div>
											<div class="bar"></div>
											<div class="bar"></div>
										</div>
									</div>
									<div class="library-tr-cover tc1">🎵</div>
									<div class="library-tr-info">
										<div class="library-tr-title">
											Midnight Drive
										</div>
										<div class="library-tr-artist">
											Artist Name
										</div>
									</div>
									<div class="library-tr-genre">Afrobeats</div>
									<div class="library-tr-album">Night Sessions</div>
									<div class="library-tr-dur">3:45</div>
									<div class="library-tr-like liked">❤</div>
								</div>
								<div class="library-track-row">
									<div class="library-tr-num">2</div>
									<div class="library-tr-cover tc2">🎸</div>
									<div class="library-tr-info">
										<div class="library-tr-title">Golden Hour</div>
										<div class="library-tr-artist">
											Artist Name
										</div>
									</div>
									<div class="library-tr-genre">Afropop</div>
									<div class="library-tr-album">Golden Era</div>
									<div class="library-tr-dur">4:12</div>
									<div class="library-tr-like liked">❤</div>
								</div>
								<div class="library-track-row">
									<div class="library-tr-num">3</div>
									<div class="library-tr-cover tc3">🎹</div>
									<div class="library-tr-info">
										<div class="library-tr-title">Calm Waters</div>
										<div class="library-tr-artist">
											Artist Name
										</div>
									</div>
									<div class="library-tr-genre">Highlife</div>
									<div class="library-tr-album">Serene</div>
									<div class="library-tr-dur">2:58</div>
									<div class="library-tr-like liked">❤</div>
								</div>
								<div class="library-track-row">
									<div class="library-tr-num">4</div>
									<div class="library-tr-cover tc4">🥁</div>
									<div class="library-tr-info">
										<div class="library-tr-title">Urban Pulse</div>
										<div class="library-tr-artist">
											Artist Name
										</div>
									</div>
									<div class="library-tr-genre">Amapiano</div>
									<div class="library-tr-album">City Lights</div>
									<div class="library-tr-dur">3:22</div>
									<div class="library-tr-like liked">❤</div>
								</div>
								<div class="library-track-row">
									<div class="library-tr-num">5</div>
									<div class="library-tr-cover tc5">🎺</div>
									<div class="library-tr-info">
										<div class="library-tr-title">
											Lagos Nights
										</div>
										<div class="library-tr-artist">
											Artist Name
										</div>
									</div>
									<div class="library-tr-genre">Afrobeats</div>
									<div class="library-tr-album">Lagos Vol.1</div>
									<div class="library-tr-dur">4:02</div>
									<div class="library-tr-like liked">❤</div>
								</div>
							</div>
						</div>

						<!-- following artists -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Artists You Follow</div>
								<div class="sec-link">See all →</div>
							</div>
							<div class="library-artist-grid">
								<div class="library-artist-chip">
									<div class="library-artist-avatar aa1">🎤</div>
									<div class="library-artist-name">ArtistOne</div>
									<div class="library-artist-followers">
										2.4k followers
									</div>
								</div>
								<div class="library-artist-chip">
									<div class="library-artist-avatar aa2">🎸</div>
									<div class="library-artist-name">ArtistTwo</div>
									<div class="library-artist-followers">
										1.1k followers
									</div>
								</div>
								<div class="library-artist-chip">
									<div class="library-artist-avatar aa3">🎹</div>
									<div class="library-artist-name">ArtistThree</div>
									<div class="library-artist-followers">
										890 followers
									</div>
								</div>
								<div class="library-artist-chip">
									<div class="library-artist-avatar aa4">🥁</div>
									<div class="library-artist-name">ArtistFour</div>
									<div class="library-artist-followers">
										340 followers
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	return libraryContainer.getElement();
};
export { LibraryContainer };
