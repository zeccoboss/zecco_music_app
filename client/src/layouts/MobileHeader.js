import { navigateSearch } from "../events/navigateSearch.js";
import { pushHistory } from "../routes/router.js";
import CreateElement from "../utils/CreateElement.js";
import { magnifierSvg, musicIconSvg } from "../utils/SVG_ICONS.js";

const MobileHeader = () => {
	// Create element
	const mobileHeader = new CreateElement("header");

	// Set attribute
	mobileHeader.addClass("mobile_header", "");
	mobileHeader.setId("mobileHeader");

	const htmlContent = `
		<div class="header_content">
			<h1>Music</h1>

			<ul id="header-list" class="header_list">
				<li id="header-plus-btn" class="header_li_items">
					<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16"
					> 
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
						<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
					</svg>
				</li>

				<li id="header-li-items" class="header_li_items">
					<figure class="header_img_wrapper">
						<img src="/src/assets/images/logo.jpg" alt="User
						profile" width="50" height="50 loading="lazy"
						class="header_img">
						<figcaption>User header image</figcaption>
					</figure>
				</li>
			</ul>
		</div>

		<nav id="header-nav" class="header_nav">
			<ul class="header_nav_list">
				<li><a href="" class="">More...</a></li>
			</ul>
		</nav>
	`;

	mobileHeader.setInnerHTML(htmlContent);

	// return mobileHeader element
	return mobileHeader.getElement();
};

export default MobileHeader;
