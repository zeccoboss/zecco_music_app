/** biome-ignore-all assist/source/organizeImports: <import not being sorted> */
import {
	feedSvg,
	homeSvg,
	librarySvg,
	magnifierSvg,
} from "../assets/svgs/svgIcons.js";
import CreateElement from "../utils/CreateElement.js";
import { adjustMobileFooterSvg } from "../helpers/adjustSvgSize.js";
import { mobileScreen } from "../core/screenBreakPoints.js";

const MobileFooter = () => {
	// Create element
	const mobileFooter = new CreateElement("footer");

	// Set attributes
	mobileFooter.addClass("mobile_footer");
	mobileFooter.setId("mobile-footer");
	mobileFooter.innerHTML = `
		<nav class="footer_nav">
			<ul class="footer_nav_list">
				<li id="home" class="home active_nav">
					<a href="/" class="nav_links">
						${homeSvg}
						<span>Home</span>
					</a>
				</li>

				<li id="library" class="library">
					<a href="/library" class="nav_links">
						${librarySvg}
						<span>Library</span>
					</a>
				</li>

				<li id="/search" class="search">
					<a href="/search" id="search-link" class="nav_links">
						${magnifierSvg}
						<span>Search</span>
					</a>
				</li>

				<li id="/feed" class="feed">
					<a href="/feed" class="nav_links">
						${feedSvg}
						<span>Feed</span>
					</a>
				</li>
			</ul>
		</nav>
	`;

	const mobileFooterSVGs = mobileFooter.getChildren("svg", "element");

	if (mobileScreen.matches) {
		adjustMobileFooterSvg(mobileFooterSVGs, 25);
	}

	// if (bigScreen.matches) {
	// 	adjustmobileFooterSvg(mobileFooterSVGs, 25);
	// }

	// if (largeScreen.matches) {
	// 	adjustmobileFooterSvg(mobileFooterSVGs, 30);
	// }

	return mobileFooter.getElement();
};

export default MobileFooter;

/*
import { navigateHome } from "../events/navigateHome.js";
import { navigateFeed } from "../events/navigateFeed.js";
import { navigateSettings } from "../events/navigateSettings.js";
import { navigateSearch } from "../events/navigateSearch.js";
import { navigateLibrary } from "../events/navigateLibrary.js";

	const homeNav = mobileFooter.getChild(".home");
	const feedNav = mobileFooter.getChild(".feed");
	const settingsNav = mobileFooter.getChild(".settings");
	const searchNav = mobileFooter.getChild(".search");
	const libraryNav = mobileFooter.getChild(".library");


	homeNav.addEventListener("click", (e) => {
		console.log("Home Active");

		navigateHome(e.currentTarget);
	});

	feedNav.addEventListener("click", (e) => {
		console.log("Feed Active");

		navigateFeed(e.currentTarget);
	});

	settingsNav.addEventListener("click", (e) => {
		console.log("Settings Active");

		navigateSettings(e.currentTarget);
	});

	searchNav.addEventListener("click", (e) => {
		console.log("Search Active");

		navigateSearch(e.currentTarget);
	});

	libraryNav.addEventListener("click", (e) => {
		console.log("Library Active");

		navigateLibrary(e.currentTarget);
	});
*/
