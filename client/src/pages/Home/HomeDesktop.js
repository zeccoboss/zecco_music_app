import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import { DiscoverView } from "./views/DiscoverView.js";
import { ExploreView } from "./views/ExploreView.js";
import { ForYouView } from "./views/ForYouView.js";
import "./Home.styles.css";

/**
 * HomeDesktop — Desktop home view
 *
 * Same data, same tab routing as mobile.
 * Different presentation: wider layout, tab nav in header
 * (NOT in sidebar — sidebar is layout-level, not home-level).
 *
 * States: skeleton | content | error
 *
 * @async
 * @param {Object} props
 * @param {string} props.state
 * @param {Object} props.ctx
 * @param {Object} props.data
 * @returns {Promise<Element>}
 */
export const HomeDesktop = async ({ state, ctx, data = {} }) => {
	const root = new CreateElement("section");
	root.addClass("home-section", "main-sections").setId("home-section");

	const tab = ctx?.query?.tab ?? "discover";
	const username = data.user?.username ?? data.user?.username ?? null;

	// ── Greeting ─────────────────────────────────────────────
	const greeting = () => {
		const h = new Date().getHours();
		const time =
			h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
		return `${time}, ${username ?? "Guest"}`;
	};

	// ── Header ───────────────────────────────────────────────
	// Greeting, page title, fake search bar, tab nav
	const header = () =>
		buildNode(`
			<header class="home-header">
				<div class="home-header-top">
					<div class="home-title-group">
						<p class="home-greeting">${greeting()}</p>
						<h1 class="home-page-title">
							${{ discover: "Discover", explore: "Explore", foryou: "For You" }[tab] ?? "Discover"}
						</h1>
					</div>

					<!-- Fake search — home.events.js routes to /search -->
					<div class="home-fake-search" id="home-fake-search"
						role="button" tabindex="0" aria-label="Open search">
						<i class="bi bi-search home-fake-search-icon"></i>
						<span class="home-fake-search-text">Search songs, artists, genres...</span>
						<kbd class="home-fake-search-kbd">⌘K</kbd>
					</div>
				</div>

				<!-- Tab nav — anchor links, router intercepts, replaceChildren swap -->
				<nav class="home-tabs" aria-label="Home tabs">
					<a href="/?tab=discover"
						class="home-tab ${!tab || tab === "discover" ? "active" : ""}"
						data-tab="discover">
						<i class="bi bi-compass"></i> Discover
					</a>
					<a href="/?tab=explore"
						class="home-tab ${tab === "explore" ? "active" : ""}"
						data-tab="explore">
						<i class="bi bi-grid-3x3-gap"></i> Explore
					</a>
					<a href="/?tab=foryou"
						class="home-tab ${tab === "foryou" ? "active" : ""}"
						data-tab="foryou">
						<i class="bi bi-heart"></i> For You
					</a>
				</nav>
			</header>
		`);

	// ── Skeleton state ────────────────────────────────────────
	const skeletonState = () =>
		buildNode(`
			<div class="home-scroll" data-content="skeleton">
				<div class="home-scroll-inner">
					<!-- Search bar skeleton -->
					<div class="home-sk home-sk--search"></div>
					<!-- Chip row skeleton -->
					<div class="home-sk-row">
						${[1, 2, 3, 4, 5, 6].map(() => `<div class="home-sk home-sk--chip"></div>`).join("")}
					</div>
					<!-- Section skeletons -->
					${[1, 2]
						.map(
							() => `
						<div class="home-sk-sec">
							<div class="home-sk home-sk--sec-title"></div>
							<div class="home-hscroll">
								${[1, 2, 3, 4, 5]
									.map(
										() => `
									<div class="home-sk-card">
										<div class="home-sk home-sk--card-cover"></div>
										<div class="home-sk home-sk--card-title"></div>
										<div class="home-sk home-sk--card-artist"></div>
									</div>
								`,
									)
									.join("")}
							</div>
						</div>
					`,
						)
						.join("")}
					<!-- Track list skeleton -->
					<div class="home-sk-sec">
						<div class="home-sk home-sk--sec-title"></div>
						${[1, 2, 3, 4, 5]
							.map(
								() => `
							<div class="home-sk-track-row">
								<div class="home-sk home-sk--track-num"></div>
								<div class="home-sk home-sk--track-cover"></div>
								<div class="home-sk-track-meta">
									<div class="home-sk home-sk--text-md"></div>
									<div class="home-sk home-sk--text-sm"></div>
								</div>
								<div class="home-sk home-sk--text-sm" style="width:36px;margin-left:auto"></div>
							</div>
						`,
							)
							.join("")}
					</div>
				</div>
			</div>
		`);

	// ── Error state ───────────────────────────────────────────
	const errorState = () =>
		buildNode(`
			<div class="home-scroll home-state-centered" data-content="error">
				<div class="home-error-icon"><i class="bi bi-wifi-off"></i></div>
				<h3 class="home-error-title">Couldn't load content</h3>
				<p class="home-error-sub">Check your connection and try again.</p>
				<button class="home-retry-btn" id="home-retry-btn">
					<i class="bi bi-arrow-clockwise"></i> Try Again
				</button>
			</div>
		`);

	// ── Content state ─────────────────────────────────────────
	const contentState = () => {
		const views = {
			explore: () => ExploreView(data, false),
			foryou: () => ForYouView(data, false),
			discover: () => DiscoverView(data, false),
		};
		const viewEl = (views[tab] ?? views.discover)();

		const wrapper = document.createElement("div");
		wrapper.className = "home-scroll";
		wrapper.dataset.content = "content";

		const inner = document.createElement("div");
		inner.className = "home-scroll-inner";
		inner.appendChild(viewEl);
		wrapper.appendChild(inner);

		return wrapper;
	};

	// ── State router ──────────────────────────────────────────
	const getStateView = (s) => {
		switch (s) {
			case "content":
				return contentState();
			case "error":
				return errorState();
			default:
				return skeletonState();
		}
	};

	root.append(header(), getStateView(state));
	return root.getElement();
};
