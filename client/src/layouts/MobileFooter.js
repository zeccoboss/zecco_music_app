/** biome-ignore-all assist/source/organizeImports: <import not being sorted> */
import {
	homeSvg,
	librarySvg,
	magnifierSvg,
	personProfileSVG,
} from "../assets/svgs/svgIcons.js";
import CreateElement from "../utils/CreateElement.js";
import { adjustMobileFooterSvg } from "../helpers/adjustSvgSize.js";
import { mobileScreen } from "../core/screenBreakPoints.js";

// Create element
const mobileFooterInstance = new CreateElement("footer");

// Set attributes
mobileFooterInstance.addClass("mobile_footer");
mobileFooterInstance.setId("mobile-footer");

const MobileFooter = () => {
	mobileFooterInstance.innerHTML = `
		<nav class="footer_nav">
			<ul class="footer_nav_list">
				<li id="home" class="home active_nav">
					<a href="/" class="nav_links">
						${homeSvg}
						<span>Home</span>
					</a>
				</li>

				<li id="/search" class="search">
					<a href="/search" id="search-link" class="nav_links">
						${magnifierSvg}
						<span>Search</span>
					</a>
				</li>

				<li id="library" class="library">
					<a href="/library" class="nav_links">
						${librarySvg}
						<span>Library</span>
					</a>
				</li>

				<li id="/profile" class="profile">
					<a href="/profile" class="nav_links">
						${personProfileSVG}
						<span>Profile</span>
					</a>
				</li>
			</ul>
		</nav>
	`;
	const mobileFooterSVGs = mobileFooterInstance.getChildren("svg", "element");

	if (mobileScreen.matches) adjustMobileFooterSvg(mobileFooterSVGs, 25);

	return mobileFooterInstance.getElement();
};
export { mobileFooterInstance, MobileFooter };
