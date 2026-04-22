import { buildNode } from "../../utils/build-node.js";
import CreateElement from "../../utils/create-element.js";

const SearchContainer = () => {
	// Create element
	const searchContainer = new CreateElement("section");

	// Set attributes
	searchContainer
		.addClass("search_section", "main-sections")
		.setId("search-section");

	const state = {
		get header() {
			const html = `
				<div class="search-ctn-search-header">
					<div class="search-ctn-header-top">
						<div class="search-ctn-page-title">Search</div>
						<div class="search-ctn-search-input-wrap">
							<span class="search-ctn-search-icon">🔍</span>
							<input
								class="search-ctn-search-input active"
								value="Afrobeats"
							/>
							<span class="search-ctn-search-clear">✕</span>
						</div>
					</div>
					<div class="search-ctn-filter-chips">
						<div class="search-ctn-filter-chip active">All</div>
						<div class="search-ctn-filter-chip">Tracks</div>
						<div class="search-ctn-filter-chip">Artists</div>
						<div class="search-ctn-filter-chip">Genres</div>
						<div class="search-ctn-filter-chip">Afrobeats</div>
						<div class="search-ctn-filter-chip">Highlife</div>
						<div class="search-ctn-filter-chip">Amapiano</div>
						<div class="search-ctn-filter-chip">Gospel</div>
						<div class="search-ctn-filter-chip">Hip-Hop</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get default() {
			const html = `
				<div class="search-ctn-scroll">
					<div class="search-ctn-content">
						<!-- auth banner -->
						<div class="search-ctn-auth-banner">
							<div class="search-ctn-auth-banner-left">
								<div class="search-ctn-auth-banner-icon">🔐</div>
								<div>
									<div class="search-ctn-auth-banner-title">
										Get more from search
									</div>
									<div class="search-ctn-auth-banner-sub">
										Login to see recent searches, personalized
										results and follow artists.
									</div>
								</div>
							</div>
							<div class="search-ctn-auth-banner-btns">
								<button class="btn-accent-sm">Login</button>
								<button class="btn-ghost-sm">Sign up</button>
							</div>
						</div>

						<!-- genre browse -->
						<div>
							<div class="sec-head">
								<div class="sec-title">Browse by Genre</div>
							</div>
							<div class="search-ctn-genre-grid">
								<div
									class="genre-card gc1"
									style="min-height: 80px"
								>
									<span class="search-ctn-genre-emoji">🎵</span
									><span class="search-ctn-genre-name"
										>Afrobeats</span
									>
								</div>
								<div
									class="genre-card gc2"
									style="min-height: 80px"
								>
									<span class="search-ctn-genre-emoji">🎸</span
									><span class="search-ctn-genre-name"
										>Highlife</span
									>
								</div>
								<div
									class="genre-card gc3"
									style="min-height: 80px"
								>
									<span class="search-ctn-genre-emoji">🥁</span
									><span class="search-ctn-genre-name"
										>Amapiano</span
									>
								</div>
								<div
									class="genre-card gc4"
									style="min-height: 80px"
								>
									<span class="search-ctn-genre-emoji">🙏</span
									><span class="search-ctn-genre-name"
										>Gospel</span
									>
								</div>
								<div
									class="genre-card gc5"
									style="min-height: 80px"
								>
									<span class="search-ctn-genre-emoji">🎤</span
									><span class="search-ctn-genre-name"
										>Hip-Hop</span
									>
								</div>
								<div
									class="genre-card gc6"
									style="min-height: 80px"
								>
									<span class="search-ctn-genre-emoji">🎺</span
									><span class="search-ctn-genre-name"
										>Afropop</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get results() {
			const html = `
				<div class="search-ctn-main">
					<div class="search-ctn-scroll">
						<div class="search-ctn-content">
							<!-- top result + artists row -->
							<div
								style="
									display: grid;
									grid-template-columns: 1fr 1fr;
									gap: 20px;
								"
							>
								<div>
									<div class="sec-head">
										<div class="sec-title">Top Result</div>
									</div>
									<div class="search-ctn-track-row playing">
										<div class="eq">
											<div class="bar"></div>
											<div class="bar"></div>
											<div class="bar"></div>
										</div>
										<div class="search-ctn-track-cover tc1">
											🎵
										</div>
										<div class="search-ctn-track-info">
											<div class="search-ctn-track-title">
												Midnight Drive
											</div>
											<div class="search-ctn-track-artist">
												Artist Name · Afrobeats
											</div>
										</div>
										<div class="search-ctn-track-genre">
											Afrobeats
										</div>
										<div class="search-ctn-track-duration">
											3:45
										</div>
										<div class="search-ctn-track-dots">⋯</div>
									</div>
								</div>
								<div>
									<div class="sec-head">
										<div class="sec-title">Artists</div>
										<div class="sec-link">See all →</div>
									</div>
									<div class="search-ctn-artist-row">
										<div class="search-ctn-artist-chip">
											<div class="search-ctn-artist-avatar aa1">
												🎤
											</div>
											<div class="search-ctn-artist-name">
												ArtistOne
											</div>
											<div class="search-ctn-artist-followers">
												2.4k followers
											</div>
										</div>
										<div class="search-ctn-artist-chip">
											<div class="search-ctn-artist-avatar aa2">
												🎸
											</div>
											<div class="search-ctn-artist-name">
												ArtistTwo
											</div>
											<div class="search-ctn-artist-followers">
												1.1k followers
											</div>
										</div>
										<div class="search-ctn-artist-chip">
											<div class="search-ctn-artist-avatar aa3">
												🎹
											</div>
											<div class="search-ctn-artist-name">
												ArtistThree
											</div>
											<div class="search-ctn-artist-followers">
												890 followers
											</div>
										</div>
										<div class="search-ctn-artist-chip">
											<div class="search-ctn-artist-avatar aa4">
												🥁
											</div>
											<div class="search-ctn-artist-name">
												ArtistFour
											</div>
											<div class="search-ctn-artist-followers">
												340 followers
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- tracks list -->
							<div>
								<div class="sec-head">
									<div class="sec-title">Tracks</div>
									<div class="sec-link">See all →</div>
								</div>
								<div class="search-ctn-tracks">
									<div class="search-ctn-track-row playing">
										<div class="search-ctn-track-num">
											<div class="eq" style="height: 10px">
												<div class="bar"></div>
												<div class="bar"></div>
												<div class="bar"></div>
											</div>
										</div>
										<div class="search-ctn-track-cover tc1">
											🎵
										</div>
										<div class="search-ctn-track-info">
											<div class="search-ctn-track-title">
												Midnight Drive
											</div>
											<div class="search-ctn-track-artist">
												Artist Name
											</div>
										</div>
										<div class="search-ctn-track-genre">
											Afrobeats
										</div>
										<div class="search-ctn-track-duration">
											3:45
										</div>
										<div class="search-ctn-track-dots">⋯</div>
									</div>
									<div class="search-ctn-track-row">
										<div class="search-ctn-track-num">2</div>
										<div class="search-ctn-track-cover tc2">
											🎸
										</div>
										<div class="search-ctn-track-info">
											<div class="search-ctn-track-title">
												Golden Hour
											</div>
											<div class="search-ctn-track-artist">
												Artist Name
											</div>
										</div>
										<div class="search-ctn-track-genre">
											Afropop
										</div>
										<div class="search-ctn-track-duration">
											4:12
										</div>
										<div class="search-ctn-track-dots">⋯</div>
									</div>
									<div class="search-ctn-track-row">
										<div class="search-ctn-track-num">3</div>
										<div class="search-ctn-track-cover tc3">
											🎹
										</div>
										<div class="search-ctn-track-info">
											<div class="search-ctn-track-title">
												Calm Waters
											</div>
											<div class="search-ctn-track-artist">
												Artist Name
											</div>
										</div>
										<div class="search-ctn-track-genre">
											Highlife
										</div>
										<div class="search-ctn-track-duration">
											2:58
										</div>
										<div class="search-ctn-track-dots">⋯</div>
									</div>
									<div class="search-ctn-track-row">
										<div class="search-ctn-track-num">4</div>
										<div class="search-ctn-track-cover tc4">
											🥁
										</div>
										<div class="search-ctn-track-info">
											<div class="search-ctn-track-title">
												Urban Pulse
											</div>
											<div class="search-ctn-track-artist">
												Artist Name
											</div>
										</div>
										<div class="search-ctn-track-genre">
											Amapiano
										</div>
										<div class="search-ctn-track-duration">
											3:22
										</div>
										<div class="search-ctn-track-dots">⋯</div>
									</div>
									<div class="search-ctn-track-row">
										<div class="search-ctn-track-num">5</div>
										<div class="search-ctn-track-cover tc5">
											🎺
										</div>
										<div class="search-ctn-track-info">
											<div class="search-ctn-track-title">
												Lagos Nights
											</div>
											<div class="search-ctn-track-artist">
												Artist Name
											</div>
										</div>
										<div class="search-ctn-track-genre">
											Afrobeats
										</div>
										<div class="search-ctn-track-duration">
											4:02
										</div>
										<div class="search-ctn-track-dots">⋯</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
	};

	searchContainer.append(state.header, state.default, state.results);

	return searchContainer.getElement();
};
export { SearchContainer };
