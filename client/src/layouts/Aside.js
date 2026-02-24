import { navigateHome } from "../events/navigate-home.js";
import { navigateLibrary } from "../events/navigate-library.js";
import { navigateSearch } from "../events/navigate-search.js";
import CreateElement from "../utils/create-element.js";
import { homeSvg, librarySvg, magnifierSvg } from "../assets/svgs/svg-icons.js";

const Aside = () => {
	// Create element
	const aside = new CreateElement("aside", "Aside");
	aside.setId("aside");
	aside.addClass("aside");
	aside.innerHTML = `
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
			</ul>
		</nav>
	`;

	const libraryNavLink = aside.getChild(".library_nav");
	const homeNavLink = aside.getChild("#home-links");
	const searchNavLink = aside.getChild("#search-link");

	homeNavLink.addEventListener("click", navigateHome);
	libraryNavLink.addEventListener("click", navigateLibrary);
	searchNavLink.addEventListener("click", navigateSearch);

	const asideSVGs = aside.getElement().querySelectorAll("svg");
	// const asideLinks = aside.getElement().querySelectorAll("a");

	for (const svg of asideSVGs) {
		svg.setAttribute("width", `30`);
		svg.setAttribute("height", `30`);
	}

	return aside.getElement();
};

// Export Aside
export default Aside;
