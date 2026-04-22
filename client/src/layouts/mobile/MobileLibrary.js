import { buildNode } from "../../utils/build-node";
import CreateElement from "../../utils/create-element";

const MobileLibrary = () => {
	// Create element
	const mobileLibrary = new CreateElement("section");
	// const libraryContent = new CreateElement("section");

	// Set attributes
	mobileLibrary
		.addClass("library_section", "main-sections", "active-section")
		.setId("library-section");

	const library = {
		get liked_tab() {
			const html = `
				<section>
					<div class="library-lib-header">
						<div class="library-header-row">
							<div class="library-page-title">Library</div>
							<div class="library-header-actions">
								<div class="library-header-btn">＋</div>
								<div class="library-header-btn">⋯</div>
							</div>
						</div>
						<div class="library-filter-tabs">
							<div class="library-filter-tab">All</div>
							<div class="library-filter-tab active">Liked</div>
							<div class="library-filter-tab">Uploaded</div>
							<div class="library-filter-tab">Playlists</div>
							<div class="library-filter-tab">Following</div>
						</div>
					</div>
					<div class="library-scroll">
						<div class="library-content">
							<div
								class="lib-hero-card"
								style="margin-bottom: 4px"
							>
								<div class="lib-hero-cover lhc1">❤️</div>
								<div class="lib-hero-info">
									<div class="lib-hero-title">Liked Songs</div>
									<div class="lib-hero-sub">
										24 songs · 1hr 32min
									</div>
								</div>
								<div class="lib-hero-play">▶</div>
							</div>
							<div>
								<div class="track-row playing">
									<div class="eq">
										<div class="bar"></div>
										<div class="bar"></div>
										<div class="bar"></div>
									</div>
									<div class="track-cover tc1">🎵</div>
									<div class="track-info">
										<div class="track-title">
											Midnight Drive
										</div>
										<div class="track-artist">Artist Name</div>
									</div>
									<div class="track-right">
										<div class="track-dur">3:45</div>
										<div class="track-dots">⋯</div>
									</div>
								</div>
								<div class="track-row">
									<div class="track-num">2</div>
									<div class="track-cover tc2">🎸</div>
									<div class="track-info">
										<div class="track-title">Golden Hour</div>
										<div class="track-artist">Artist Name</div>
									</div>
									<div class="track-right">
										<div class="track-dur">4:12</div>
										<div class="track-dots">⋯</div>
									</div>
								</div>
								<div class="track-row">
									<div class="track-num">3</div>
									<div class="track-cover tc3">🎹</div>
									<div class="track-info">
										<div class="track-title">Calm Waters</div>
										<div class="track-artist">Artist Name</div>
									</div>
									<div class="track-right">
										<div class="track-dur">2:58</div>
										<div class="track-dots">⋯</div>
									</div>
								</div>
								<div class="track-row">
									<div class="track-num">4</div>
									<div class="track-cover tc4">🥁</div>
									<div class="track-info">
										<div class="track-title">Urban Pulse</div>
										<div class="track-artist">Artist Name</div>
									</div>
									<div class="track-right">
										<div class="track-dur">3:22</div>
										<div class="track-dots">⋯</div>
									</div>
								</div>
								<div class="track-row">
									<div class="track-num">5</div>
									<div class="track-cover tc5">🎺</div>
									<div class="track-info">
										<div class="track-title">Lagos Nights</div>
										<div class="track-artist">Artist Name</div>
									</div>
									<div class="track-right">
										<div class="track-dur">4:02</div>
										<div class="track-dots">⋯</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			`;

			return buildNode(html);
		},
		get all() {
			const html = `
				<section>
					<div class="library-lib-header">
						<div class="library-header-row">
							<div class="library-page-title">Library</div>
							<div class="library-header-actions">
								<div class="library-header-btn">＋</div>
								<div class="library-header-btn">⋯</div>
							</div>
						</div>
						<div class="library-filter-tabs">
							<div class="library-filter-tab active">All</div>
							<div class="library-filter-tab">Liked</div>
							<div class="library-filter-tab">Uploaded</div>
							<div class="library-filter-tab">Playlists</div>
							<div class="library-filter-tab">Following</div>
						</div>
					</div>
					<div class="library-scroll">
						<div class="library-content">
							<!-- hero cards -->
							<div class="lib-hero-cards">
								<div class="lib-hero-card">
									<div class="lib-hero-cover lhc1">❤️</div>
									<div class="lib-hero-info">
										<div class="lib-hero-title">
											Liked Songs
										</div>
										<div class="lib-hero-sub">24 songs</div>
									</div>
									<div class="lib-hero-play">▶</div>
								</div>
								<div class="lib-hero-card">
									<div class="lib-hero-cover lhc2">⬆️</div>
									<div class="lib-hero-info">
										<div class="lib-hero-title">My Uploads</div>
										<div class="lib-hero-sub">8 tracks</div>
									</div>
									<div class="lib-hero-play">▶</div>
								</div>
								<div class="lib-hero-card">
									<div class="lib-hero-cover lhc3">🕐</div>
									<div class="lib-hero-info">
										<div class="lib-hero-title">
											Recently Played
										</div>
										<div class="lib-hero-sub">12 songs</div>
									</div>
									<div class="lib-hero-play">▶</div>
								</div>
							</div>

							<!-- playlists -->
							<div>
								<div class="sec-head">
									<div class="sec-title">Playlists</div>
									<div class="sec-link">See all</div>
								</div>
								<div class="playlist-grid">
									<div class="playlist-card">
										<div class="playlist-cover-grid">
											<div class="pcg-item pcg1">🎵</div>
											<div class="pcg-item pcg2">🎸</div>
											<div class="pcg-item pcg3">🎹</div>
											<div class="pcg-item pcg4">🥁</div>
										</div>
										<div class="playlist-title">Afro Vibes</div>
										<div class="playlist-sub">12 songs</div>
									</div>
									<div class="playlist-card">
										<div class="playlist-cover pc2">🌙</div>
										<div class="playlist-title">
											Night Drive
										</div>
										<div class="playlist-sub">8 songs</div>
									</div>
									<div class="playlist-card">
										<div class="playlist-cover pc3">🌅</div>
										<div class="playlist-title">
											Morning Mix
										</div>
										<div class="playlist-sub">15 songs</div>
									</div>
									<div
										class="playlist-card"
										style="cursor: pointer"
									>
										<div class="playlist-card-add">＋</div>
										<div
											class="playlist-title"
											style="color: var(--text-3)"
										>
											New Playlist
										</div>
										<div class="playlist-sub">Create</div>
									</div>
								</div>
							</div>

							<!-- following artists -->
							<div>
								<div class="sec-head">
									<div class="sec-title">Following</div>
									<div class="sec-link">See all</div>
								</div>
								<div class="artist-row">
									<div class="artist-chip">
										<div class="artist-avatar aa1">🎤</div>
										<div class="artist-name">ArtistOne</div>
									</div>
									<div class="artist-chip">
										<div class="artist-avatar aa2">🎸</div>
										<div class="artist-name">ArtistTwo</div>
									</div>
									<div class="artist-chip">
										<div class="artist-avatar aa3">🎹</div>
										<div class="artist-name">ArtistThree</div>
									</div>
									<div class="artist-chip">
										<div class="artist-avatar aa4">🥁</div>
										<div class="artist-name">ArtistFour</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			`;

			return buildNode(html);
		},
		get authGate() {
			const html = `
				<section>
					<div class="library-lib-header">
						<div class="library-header-row">
							<div class="library-page-title">Library</div>
						</div>
						<div class="library-filter-tabs">
							<div class="library-filter-tab active">All</div>
							<div class="library-filter-tab">Liked</div>
							<div class="library-filter-tab">Uploaded</div>
							<div class="library-filter-tab">Playlists</div>
							<div class="library-filter-tab">Following</div>
						</div>
					</div>
					<div class="library-scroll">
						<div class="lib-auth-gate">
							<div class="lib-auth-icon">📚</div>
							<div class="lib-auth-title">Your Library</div>
							<div class="lib-auth-sub">
								Login to access your liked songs, playlists,
								uploads and artists you follow.
							</div>
							<div class="lib-auth-btns">
								<button class="btn-accent">Login</button>
								<button class="btn-ghost">Sign up</button>
							</div>
						</div>
					</div>
				</section>
			`;

			return buildNode(html);
		},
		get playlist_tab() {
			const html = `
				<section>
					<div class="library-lib-header">
						<div class="library-header-row">
							<div class="library-page-title">Library</div>
							<div class="library-header-actions">
								<div class="library-header-btn">＋</div>
							</div>
						</div>
						<div class="library-filter-tabs">
							<div class="library-filter-tab">All</div>
							<div class="library-filter-tab">Liked</div>
							<div class="library-filter-tab">Uploaded</div>
							<div class="library-filter-tab active">Playlists</div>
							<div class="library-filter-tab">Following</div>
						</div>
					</div>
					<div class="library-scroll">
						<div class="library-content">
							<div class="sec-head">
								<div class="sec-title">Your Playlists</div>
								<div class="sec-count">3 playlists</div>
							</div>
							<div class="playlist-grid">
								<div class="playlist-card">
									<div class="playlist-cover-grid">
										<div class="pcg-item pcg1">🎵</div>
										<div class="pcg-item pcg2">🎸</div>
										<div class="pcg-item pcg3">🎹</div>
										<div class="pcg-item pcg4">🥁</div>
									</div>
									<div class="playlist-title">Afro Vibes</div>
									<div class="playlist-sub">12 songs</div>
								</div>
								<div class="playlist-card">
									<div class="playlist-cover pc2">🌙</div>
									<div class="playlist-title">Night Drive</div>
									<div class="playlist-sub">8 songs</div>
								</div>
								<div class="playlist-card">
									<div class="playlist-cover pc3">🌅</div>
									<div class="playlist-title">Morning Mix</div>
									<div class="playlist-sub">15 songs</div>
								</div>
								<div class="playlist-card">
									<div class="playlist-cover pc4">🎊</div>
									<div class="playlist-title">Party Hits</div>
									<div class="playlist-sub">20 songs</div>
								</div>
								<div class="playlist-card">
									<div class="playlist-card-add">＋</div>
									<div
										class="playlist-title"
										style="color: var(--text-3)"
									>
										New Playlist
									</div>
									<div class="playlist-sub">Create</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			`;

			return buildNode(html);
		},
	};

	mobileLibrary.append(
		library.liked_tab,
		library.all,
		library.authGate,
		library.playlist_tab,
	);

	return mobileLibrary.getElement();
};
export { MobileLibrary };

/*
get playlist_tab() {
	const html = `
	
	`;

	return buildNode(html);
},
get playlist_tab() {
	const html = `
	
	`;

	return buildNode(html);
},
get playlist_tab() {
	const html = `
	
	`;

	return buildNode(html);
},
*/
