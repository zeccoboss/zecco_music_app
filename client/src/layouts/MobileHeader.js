// import { navigateSearch } from "../events/navigateSearch.js";
// import { pushHistory } from "../routes/router.js";
import { magnifierSvg, musicIconSvg } from "../assets/svgs/svgIcons.js";
import CreateElement from "../utils/CreateElement.js";
import defaultProfile from "../assets/images/default-profile.png";
import { HeaderBtnCtn } from "../components/HeaderBtnContainer.js";
import { manageHeaderBtns } from "../utils/manageHeaderBtns.js";

const mobileHeaderInstance = new CreateElement("header");

// Create element
// const mobileHeaderInstance = new CreateElement("header");

// Set attribute
mobileHeaderInstance.addClass("mobile_header", "");
mobileHeaderInstance.setId("mobileHeaderInstance");

mobileHeaderInstance.innerHTML = `
	<div class="header_content">
		<h1 id="header-title" class="header_title">Music</h1>
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
					<img src="${defaultProfile}" alt="User
					profile" width="50" height="50 loading="lazy"
					class="header_img">
					<figcaption>User header image</figcaption>
				</figure>
			</li>
		</ul>
	</div>

	<!-- <div id="header-btns-ctn" class="header_btns_ctn"></div> -->
`;

mobileHeaderInstance.append(HeaderBtnCtn());

const MobileHeader = () => {
	manageHeaderBtns("Music", "header_btns_ctn");

	// return mobileHeaderInstance element
	return mobileHeaderInstance.getElement();
};

export { mobileHeaderInstance, MobileHeader };
