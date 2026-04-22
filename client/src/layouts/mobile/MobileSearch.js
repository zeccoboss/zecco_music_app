import { buildNode } from "../../utils/build-node.js";
import CreateElement from "../../utils/create-element.js";

const MobileSearch = () => {
	// Create element
	const section = new CreateElement("section");

	// Set attributes
	section.addClass("search_section", "main-sections").setId("search-section");

	const state = {
		get header() {
			const html = `
				<div class="mob-search-header">
					<div class="mob-header-top">
						<div class="mob-page-title">Search</div>
					</div>
					<div class="search-input-wrap">
						<span class="search-icon">🔍</span>
						<input
							class="search-input"
							placeholder="Songs, artists, genres..."
						/>
					</div>
					<div class="filter-chips">
						<div class="filter-chip active">All</div>
						<div class="filter-chip">Tracks</div>
						<div class="filter-chip">Artists</div>
						<div class="filter-chip">Genres</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get default() {
			const html = `
				<div class="mob-scroll">
					<div class="mob-content">
						<!-- auth gate banner -->
						<div class="search-auth-gate">
							<div class="auth-gate-icon-small">🔐</div>
							<div class="auth-gate-title-small">
								More with an account
							</div>
							<div class="auth-gate-sub-small">
								Login to see personalized results, recent
								searches and more.
							</div>
							<div class="auth-gate-btns-small">
								<a href="/login" class="btn-accent-sm">Login</a>
								<a href="/register" class="btn-ghost-sm">Sign up</a>
							</div>
						</div>

						<!-- browse genres -->
						<div class="browse-label">Browse by Genre</div>
						<div class="genre-grid">
							<div class="genre-card gc1">
								<span class="genre-card-emoji">🎵</span
								><span class="genre-card-name">Afrobeats</span>
							</div>
							<div class="genre-card gc2">
								<span class="genre-card-emoji">🎸</span
								><span class="genre-card-name">Highlife</span>
							</div>
							<div class="genre-card gc3">
								<span class="genre-card-emoji">🥁</span
								><span class="genre-card-name">Amapiano</span>
							</div>
							<div class="genre-card gc4">
								<span class="genre-card-emoji">🎹</span
								><span class="genre-card-name">Gospel</span>
							</div>
							<div class="genre-card gc5">
								<span class="genre-card-emoji">🎤</span
								><span class="genre-card-name">Hip-Hop</span>
							</div>
							<div class="genre-card gc6">
								<span class="genre-card-emoji">🎺</span
								><span class="genre-card-name">Afropop</span>
							</div>
						</div>
					</div>
				</div>
			`;

			return buildNode(html);
		},
		get typing() {
			const html = `
				<div class="mob-scroll">
					<div class="mob-content">
						<div>
							<div class="sec-head">
								<div class="sec-title">Recent Searches</div>
								<div class="sec-link">Clear all</div>
							</div>
							<div class="recent-item">
								<div class="recent-icon">🎵</div>
								<div class="recent-text">
									<div class="recent-label">
										Afrobeats Mix
									</div>
									<div class="recent-type">Track</div>
								</div>
								<div class="recent-remove">✕</div>
							</div>
							<div class="recent-item">
								<div class="recent-icon">👤</div>
								<div class="recent-text">
									<div class="recent-label">Burna Boy</div>
									<div class="recent-type">Artist</div>
								</div>
								<div class="recent-remove">✕</div>
							</div>
							<div class="recent-item">
								<div class="recent-icon">🎵</div>
								<div class="recent-text">
									<div class="recent-label">
										Midnight Drive
									</div>
									<div class="recent-type">Track</div>
								</div>
								<div class="recent-remove">✕</div>
							</div>
							<div class="recent-item">
								<div class="recent-icon">🎸</div>
								<div class="recent-text">
									<div class="recent-label">Highlife</div>
									<div class="recent-type">Genre</div>
								</div>
								<div class="recent-remove">✕</div>
							</div>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get no_result() {
			const html = `
				<div class="mob-scroll">
					<div class="mob-content">
						<div class="no-results">
							<div class="no-results-icon">🎵</div>
							<div class="no-results-title">
								No results found
							</div>
							<div class="no-results-sub">
								We couldn't find anything for "xyzqwerty123".
								Try a different search.
							</div>
						</div>
						<div class="browse-label">Try these instead</div>
						<div class="genre-grid">
							<div class="genre-card gc1">
								<span class="genre-card-emoji">🎵</span
								><span class="genre-card-name">Afrobeats</span>
							</div>
							<div class="genre-card gc2">
								<span class="genre-card-emoji">🎸</span
								><span class="genre-card-name">Highlife</span>
							</div>
							<div class="genre-card gc3">
								<span class="genre-card-emoji">🥁</span
								><span class="genre-card-name">Amapiano</span>
							</div>
							<div class="genre-card gc4">
								<span class="genre-card-emoji">🎹</span
								><span class="genre-card-name">Gospel</span>
							</div>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get results() {
			const html = `
				<div class="mob-search-header">
					<div class="mob-header-top">
						<div class="mob-page-title">Search</div>
					</div>
					<div class="search-input-wrap">
						<span class="search-icon">🔍</span>
						<input
							class="search-input active"
							value="Afrobeats"
						/>
						<div class="search-clear">✕</div>
					</div>
					<div class="filter-chips">
						<div class="filter-chip active">All</div>
						<div class="filter-chip">Tracks</div>
						<div class="filter-chip">Artists</div>
						<div class="filter-chip">Genres</div>
					</div>
				</div>
				<div class="mob-scroll">
					<div class="mob-content">
						<!-- top result -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Top Result</div>
							</div>
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
									<div class="track-artist">
										Artist Name · Afrobeats
									</div>
								</div>
								<div class="track-right">
									<div class="track-duration">3:45</div>
									<div class="track-dots">⋯</div>
								</div>
							</div>
						</div>

						<!-- tracks -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Tracks</div>
								<div class="sec-link">See all</div>
							</div>
							<div class="track-row">
								<div class="track-num">1</div>
								<div class="track-cover tc2">🎸</div>
								<div class="track-info">
									<div class="track-title">Golden Hour</div>
									<div class="track-artist">Artist Name</div>
								</div>
								<div class="track-right">
									<div class="track-duration">4:12</div>
									<div class="track-dots">⋯</div>
								</div>
							</div>
							<div class="track-row">
								<div class="track-num">2</div>
								<div class="track-cover tc3">🎹</div>
								<div class="track-info">
									<div class="track-title">Calm Waters</div>
									<div class="track-artist">Artist Name</div>
								</div>
								<div class="track-right">
									<div class="track-duration">2:58</div>
									<div class="track-dots">⋯</div>
								</div>
							</div>
							<div class="track-row">
								<div class="track-num">3</div>
								<div class="track-cover tc4">🥁</div>
								<div class="track-info">
									<div class="track-title">Urban Pulse</div>
									<div class="track-artist">Artist Name</div>
								</div>
								<div class="track-right">
									<div class="track-duration">3:22</div>
									<div class="track-dots">⋯</div>
								</div>
							</div>
						</div>

						<!-- artists -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Artists</div>
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
			`;
			return buildNode(html);
		},
	};

	section.append(
		state.header,
		state.default,
		state.typing,
		state.no_result,
		state.results,
	);

	return section.getElement();
};
export { MobileSearch };
