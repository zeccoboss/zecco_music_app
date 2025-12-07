import { adjustAsideSvg } from "../core/adjustSvgSize.js";
import {
	bigScreen,
	largeScreen,
	mobleScreen,
} from "../core/screenBreakePoints.js";
import { navigateHome } from "../events/navigateHome.js";
import { navigateLibrary } from "../events/navigateLibrary.js";
import { navigateSearch } from "../events/navigateSearch.js";
import CreateElement from "../utils/CreateElement.js";
import {
	feedSvg,
	gearSvg,
	homeSvg,
	librarySvg,
	magnifierSvg,
} from "../utils/SVG_ICONS.js";

const Aside = () => {
	// Create element
	const aside = new CreateElement("aside", "Aside");

	// Set attributes
	aside.setId("aside");
	aside.addClass("aside");

	const htmlContent = `
		<nav class="nav">
			<ul class="nav_list">
				<li id="home" class="home active_nav">
					<a href="/" id="home-links" class="nav_links first_nav_link">
						${homeSvg}
						<span>Home</span>
					</a>
				</li>

				<li id="library" class="library">
					<a href="/library" class="nav_links library_nav">
						${librarySvg}
						<span>Library</span>
					</a>
				</li>

				<li id="search" class="search" >
					<a href="/search" id="search-link" class="nav_links">
						${magnifierSvg}
						<span>Search</span>
					</a>
				</li>

				<!-- <li id="feed" class="feed">
					<a href="feed" class="nav_links">
						${feedSvg}
						<span>Feed</span>
					</a>
				</li> -->


				<!-- <li id="settings" class="settings">
					<a href="settings" class="nav_links">
						${gearSvg}
						<span>Settings</span>
					</a>
				</li> -->
			</ul>
		</nav>
	`;

	aside.setInnerHTML(htmlContent);

	const libraryNavLink = aside.getChild("library_nav", "class");
	const homeNavLink = aside.getChild("home-links", "id");
	const searchNavLink = aside.getChild("search-link", "id");

	homeNavLink.addEventListener("click", (e) => {
		navigateHome(e.currentTarget);
	});

	libraryNavLink.addEventListener("click", (e) => {
		navigateLibrary(e.currentTarget);
	});

	searchNavLink.addEventListener("click", () => {
		navigateSearch();
	});

	const asideSVGs = aside.getElement().querySelectorAll("svg");
	// const asideLinks = aside.getElement().querySelectorAll("a");

	if (mobleScreen.matches) {
		adjustAsideSvg(asideSVGs, 20);
	} else if (bigScreen.matches) {
		adjustAsideSvg(asideSVGs, 20);
	} else if (largeScreen.matches) {
		adjustAsideSvg(asideSVGs, 20);
	}

	return aside.getElement();
};

// Export Aside
export default Aside;
