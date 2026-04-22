/** biome-ignore-all assist/source/organizeImports: <import not being sorted> */
import {
	gearSvg,
	homeSvg,
	librarySvg,
	magnifierSvg,
	personProfileSVG,
	uploadSvg,
} from "../../assets/svgs/svg-icons.js";
import CreateElement from "../../utils/create-element.js";

const MobileFooter = () => {
	// Create element
	const footer = new CreateElement("footer");

	// Set attributes and add html content
	footer.addClass("footer").setId("footer").innerHTML = `
		<nav class="mob-footer">
			<ul class="footer-nav-list">
				<li id="home" class="home active-nav mobile-nav-item">
					<a href="/" id="home-nav-link" class="nav-links mobile-nav-links">
						${homeSvg}
						<span class="mobile-nav-label">Home</span>
					</a>
				</li>

				<li id="/search" class="">
					<a href="/search" id="search-nav-link"  class="nav-links  mobile-nav-links">
						${magnifierSvg}
						<span class="mobile-nav-label">Search</span>
					</a>
				</li>

				<li id="library" class="library">
					<a href="/library"  id="lib-nav-link" class="nav-links  mobile-nav-links">
						${librarySvg}
						<span class="mobile-nav-label">Library</span>
					</a>
				</li>

				<!--<li id="/profile" class="profile">
					<a href="/profile" class="nav-links  mobile-nav-links">
						${personProfileSVG}
						<span class="mobile-nav-label">Profile</span>
					</a>
				</li>-->

				<li id="/upload" class="upload">
					<a href="/upload" id="upload-nav-link" class="nav-links  mobile-nav-links">
						${uploadSvg}
						<span class="mobile-nav-label">Upload</span>
					</a>
				</li>

				<!--<li id="/profile" class="profile">
					<a href="/settings" id="settings-nav-link" class="nav-links  mobile-nav-links">
						${gearSvg}
						<span class="mobile-nav-label">Settings</span>
					</a>
				</li>-->

			</ul>
		</nav>
	`;
	// biome-ignore lint/suspicious/useIterableCallbackReturn: <Making the line short >
	footer.getChildren("svg").forEach((svg) => svg.classList.add("footer-svg"));

	return footer.getElement();
};
export { MobileFooter };
