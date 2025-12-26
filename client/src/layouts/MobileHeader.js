import { navigateSearch } from "../events/navigateSearch.js";
import { pushHistory } from "../routes/router.js";
import CreateElement from "../utils/CreateElement.js";
import { magnifierSvg, musicIconSvg } from "../utils/SVG_ICONS.js";
import logo from "../images/logo.jpg";

const MobileHeader = () => {
	// Create element
	const mobileHeader = new CreateElement("header");

	// Set attribute
	mobileHeader.addClass("mobile_header", "");
	mobileHeader.setId("mobileHeader");

	const htmlContent = `
		<div class="logo_wrapper">
			<h1>
				<a href="/" id="mob-logo" class="mob_logo logo">
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="h_music_icon" viewBox="0 0 16 16">
						<path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2"/>
						<path fill-rule="evenodd" d="M9 3v10H8V3z"/>
						<path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z"/>
					</svg>

					<span> zecco_music</span>
				</a>
			</h1>

			<ul id="mob-list" class="mob_list">
				<li id="mob-li-items" class="mob_li_items">
					<a href="account" id="" class="mob_link">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
							<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
						</svg>
					</a>
				</li>
				<li id="mob-li-items" class="mob_li_items">
					<a href="" id="" class="mob_link">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
							<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
						</svg>
					</a>
				</li>

				<!--<li id="mob-li-items" class="mob_li_items">
					<a href="" id="" class="mob_link">
						${musicIconSvg}	
					</a>
				</li>-->
			</ul>
		</div>
	
		<div id="mob-header-content" class="mob_header_content">
			<button class="search_toggler"> 
				<svg xmlns=="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">	
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  				</svg>
				<span>Search music...</span>
			</button>

			<div>
				<h5 class="section_name">Home</h5>
			</div>			
		</div>
	`;

	mobileHeader.setInnerHTML(htmlContent);

	const searchInput = mobileHeader.getChild("search_toggler", "class");

	searchInput.addEventListener("input", (e) => {
		navigateSearch();
		const searchValue = e.target.value;
		pushHistory("/search");

		console.log(searchValue);
	});

	// return mobileHeader element
	return mobileHeader.getElement();
};

export default MobileHeader;

` <nav class="mobile_header_nav"> 
			<ul id="mob-nav-list" class="mob_nav_list">
				<li id="mob-nav-li-items" class="mob_nav_li_items">
					<a href="account" id="" class="mob_nav_link">
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
							<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
						</svg>
					</a>
				</li>
				<li id="mob-nav-li-items" class="mob_nav_li_items">
					<a href="" id="" class="mob_nav_link">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
							<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
						</svg>
					</a>
				</li>

				<li id="mob-nav-li-items" class="mob_nav_li_items">
					<a href="" id="" class="mob_nav_link">
						${musicIconSvg}	
					</a>
				</li>
			</ul>
		</nav>`;
