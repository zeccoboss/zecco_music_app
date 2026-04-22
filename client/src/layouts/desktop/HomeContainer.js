import { audioService } from "../../services/audio-service.js";
import CreateElement from "../../utils/create-element.js";
import { getTag } from "../../helpers/select-element.js";
import MusicCard from "../../components/MusicCard.js";
import { buttonWrapper } from "../../components/HeaderBtnContainer.js";
import { mobileScreen } from "../../core/screen-break-points.js";
import { HomeSkeleton } from "../../components/skeleton/HomeSkeleton.js";
import { buildNode } from "../../utils/build-node.js";
import { magnifierSvg } from "../../assets/svgs/svg-icons.js";

const HomeContainer = async () => {
	const homeContainer = new CreateElement("section");

	// Set attributes
	homeContainer
		.addClass("home-section", "main-sections")
		.setId("home-section");

	const homeContent = {
		get tabsBar() {
			const html = `
            <nav class="home-tabs">
                <button class="home-tab active-tab" data-tab="discover">Discover</button>
                <button class="home-tab auth-tab" data-tab="explore">Explore</button>
                <button class="home-tab auth-tab" data-tab="for-you">For You</button>
            </nav>
        `;
			return buildNode(html);
		},

		get discoverSection() {
			const html = `
            <section id="home-discover-section" class="h-tab-content active-tab-content" data-content="discover">
                <header class="main-header">
                    <div>
                        <div class="home-greeting">Good evening 👋</div>
                        <div class="page-title">Discover</div>
                    </div>
                    <div class="search">${magnifierSvg} &nbsp;Search...</div>
                </header>

                <!-- Featured -->
                <div class="featured">
                    <div class="vinyl"></div>
                    <div class="featured-tag">🔥 Trending Now</div>
                    <div class="featured-title">Your Daily Mix</div>
                    <div class="featured-sub">Curated for your taste · 24 songs</div>
                    <div class="featured-btns">
                        <button class="btn-play">▶ &nbsp;Play All</button>
                        <button class="btn-ghost">+ &nbsp;Save</button>
                    </div>
                </div>

                <!-- New Uploads -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">New Uploads</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="cards" id="discover-new-uploads">
                        <div class="card playing">
                            <div class="eq"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
                            <div class="card-cover cc1">🎵<div class="play-ov"><div class="play-c">⏸</div></div></div>
                            <div class="card-title">Midnight Drive</div>
                            <div class="card-artist">Artist Name</div>
                        </div>
                        <div class="card">
                            <div class="card-cover cc2">🎸<div class="play-ov"><div class="play-c">▶</div></div></div>
                            <div class="card-title">Golden Hour</div>
                            <div class="card-artist">Artist Name</div>
                        </div>
                        <div class="card">
                            <div class="card-cover cc3">🎹<div class="play-ov"><div class="play-c">▶</div></div></div>
                            <div class="card-title">Calm Waters</div>
                            <div class="card-artist">Artist Name</div>
                        </div>
                        <div class="card">
                            <div class="card-cover cc4">🥁<div class="play-ov"><div class="play-c">▶</div></div></div>
                            <div class="card-title">Urban Pulse</div>
                            <div class="card-artist">Artist Name</div>
                        </div>
                    </div>
                </div>

                <!-- Top Artists -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Top Artists</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="artists-row" id="discover-top-artists">
                        <!-- populated from API -->
                    </div>
                </div>
            </section>
        `;
			return buildNode(html);
		},

		get exploreSection() {
			const html = `
            <section id="home-explore-section" class="h-tab-content" data-content="explore">
                <header class="main-header">
                    <div class="page-title">Explore</div>
                </header>

                <!-- From followed artists -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">From Artists You Follow</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="cards" id="explore-following-tracks">
                        <!-- populated from API -->
                    </div>
                </div>

                <!-- Followers activity -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Your Followers Are Listening To</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="cards" id="explore-followers-activity">
                        <!-- populated from API -->
                    </div>
                </div>

                <!-- Suggested artists -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Artists You Might Like</div>
                    </div>
                    <div class="artists-row" id="explore-suggested-artists">
                        <!-- populated from API -->
                    </div>
                </div>
            </section>
        `;
			return buildNode(html);
		},

		get forYouSection() {
			const html = `
            <section id="home-foryou-section" class="h-tab-content" data-content="for-you">
                <header class="main-header">
                    <div class="page-title">For You</div>
                </header>

                <!-- Recent plays -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Recently Played</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="track-list" id="foryou-recent-plays">
                        <!-- populated from API -->
                    </div>
                </div>

                <!-- Playlists -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Your Playlists</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="cards" id="foryou-playlists">
                        <!-- populated from API -->
                    </div>
                </div>

                <!-- Uploaded tracks -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Your Uploads</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="track-list" id="foryou-uploads">
                        <!-- populated from API -->
                    </div>
                </div>

                <!-- Liked songs -->
                <div class="home-block">
                    <div class="section-head">
                        <div class="section-title">Liked Songs</div>
                        <div class="section-link">See all →</div>
                    </div>
                    <div class="track-list" id="foryou-liked">
                        <!-- populated from API -->
                    </div>
                </div>
            </section>
        `;
			return buildNode(html);
		},

		/* auth gate shown when logged-out user clicks Explore or For You */
		get authGate() {
			const html = `
            <div class="auth-gate" id="home-auth-gate" style="display:none">
                <div class="auth-gate-icon">🔒</div>
                <h3 class="auth-gate-title">Login to continue</h3>
                <p class="auth-gate-sub">This section is available for registered users only.</p>
                <div class="auth-gate-btns">
                    <a href="/login" class="btn-play">Login</a>
                    <a href="/register" class="btn-ghost">Sign up</a>
                </div>
            </div>
        `;
			return buildNode(html);
		},
	};

	// 2. Append tabs bar first
	homeContainer.append(
		homeContent.tabsBar,
		homeContent.discoverSection,
		homeContent.exploreSection,
		homeContent.forYouSection,
	);

	// 4. Append the auth gate
	homeContainer.appendChild(homeContent.authGate);

	return homeContainer.getElement();
};
// export { homeContainer, HomeContainer };
export { HomeContainer };
