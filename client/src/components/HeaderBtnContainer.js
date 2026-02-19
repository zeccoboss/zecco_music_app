import { cancelSvg, magnifierSvg } from "../assets/svgs/svgIcons";
import { mobileScreen } from "../core/screenBreakPoints";
import CreateElement from "../utils/CreateElement";

const homeBtnCtnrInstance = new CreateElement("div");
homeBtnCtnrInstance.addClass("home_btns_ctn");
homeBtnCtnrInstance.setId("home-btns-ctn");

// Save it when the screen size is on mobile
const matchMobile = mobileScreen.matches;

const homeBtnWrapper = `
	<div class="home_btns_ctn header_btn_wrappers">
		<button class="header_action_btns home_btns">All</button>
		<button class="header_action_btns home_btns">For you</button>
		<button class="header_action_btns home_btns">Explore</button>
	</div>
`;

const libraryBtnWrapper = `
	<div class="library_btns_ctn header_btn_wrappers">
		<button class="header_action_btns lib_btns all_tab_btn">All</button>
		<button class="header_action_btns lib_btns liked_tab_btn">Liked</button>
		<button class="header_action_btns lib_btns uploaded_tab_btn">Uploaded</button>
		<button class="header_action_btns lib_btns recent_play_tab_btn">Recently Played</button>
		<button class="header_action_btns lib_btns lib_playlists_btn	">Playlists</button>
		<button class="header_action_btns lib_btns lib_artist_btn">Following</button>
	</div>
`;
// settings_btns_ctn;
const profileBtnWrapper = `
	<div class="profile_btns_ctn header_btn_wrappers">
		<a href="/settings" class="header_action_btns profile_btns">Settings</a>
		<button class="header_action_btns profile_btns">Edit Profile</button>
	</div>
`;

const searchBtnWrapper = `
	<div class="search_btns_ctn header_btn_wrappers">
		<button class="header_action_btns home_btns search_toggler">
			${magnifierSvg}
			<span class="search_toggler_placeholder">Search music...</span>
			${cancelSvg}
		</button>
	</div>
`;

const settingsBtnWrapper = `
	<div class="settings_btns_ctn header_btn_wrappers">
		<button class="header_action_btns profile_btns">${magnifierSvg}</button>
		<a href="/profile" class="header_action_btns profile_btns">Profile</a>
		<button class="header_action_btns profile_btns">Edit Profile</button>
	</div>
`;

const HeaderBtnCtn = () => {
	if (matchMobile) {
		homeBtnCtnrInstance.appendContent(
			homeBtnWrapper,
			libraryBtnWrapper,
			searchBtnWrapper,
			profileBtnWrapper,
			settingsBtnWrapper,
		);
	}

	return homeBtnCtnrInstance.getElement();
};

const buttonWrapper = {
	homeBtns: homeBtnWrapper,
	libraryBtns: libraryBtnWrapper,
	searchBtns: searchBtnWrapper,
	profileBtns: profileBtnWrapper,
	settingsBtns: settingsBtnWrapper,
};

export { homeBtnCtnrInstance, HeaderBtnCtn, buttonWrapper };
