import defaultProfile from "../assets/images/default-profile.png";
import { cameraSvg, pencilSvg } from "../assets/svgs/svgIcons.js";
import { buttonWrapper } from "../components/HeaderBtnContainer.js";
import appConfig from "../config/AppConfig.js";
import { mobileScreen } from "../core/screenBreakPoints.js";
import CreateElement from "../utils/CreateElement.js";

const date = `${appConfig.date.getDate()}-${appConfig.date.getMonth()}-${appConfig.date.getFullYear()}`;

// Create element
const profileContainerInstance = new CreateElement("section");

// Set attributes
profileContainerInstance.addClass("profile_section", "main_sections");
profileContainerInstance.setId("profile-section");

const ProfileContainer = () => {
	const profileHeader = `
		<div class="profile_header">
			<div class="profile_cover_wrapper">
				<figure class="profile_cover_ctn">
					<img src="${defaultProfile}" class="profile_cover" width="500" height="400" alt="Profile cover">
					<figcaption>Profile cover</figcaption>
					<button class="profile_cover_btn">${cameraSvg}</button>
				</figure>
			</div>

			<div class="profile_pic_ctn">
				<figure class="profile_pic_wrapper">
					<img src="${defaultProfile}" class="profile_pic" width="100" height="100" alt="Profile picture">
					<figcaption>Profile Picture</figcaption>
				</figure>
			</div>
		</div>
	`;

	profileContainerInstance.innerHTML = `
		<div class="profile_containers" data-private-profile>
			${profileHeader}

			<div class="profile_info">
				<div id="" class="profile_user_data">
					<div>
						<h3 class="user_name" data-user-placeholder>ZECCOBOSS</h3>
						<p class="user_id">User ID: <span data-user-id=>478984397664387298</span></p>
					</div>
					<div>
						<button class="st_prf_card_wrapper">${pencilSvg}</button>
					</div>
				</div>

				<div class="profile_details">
					<div>
						<h2>0</h2>
						<p>Following</p>
					</div>
					<div>
						<h2>0</h2>
						<p>Followers</p>
					</div>
					<div>
						<h2>0</h2>
						<p>Uploads</p>
					</div>
				</div>

				<div class="profile_data">
					<div>
						<span>Bio: </span><p>About me</p>
					</div>
					<div>
						<span>Member Since: </span><span>${date}</span>
					</div>
				</div>
			</div>

			<div class="profile_content">
				<div profile-content-header>
					<h3>Playlists</h3>
				</div>
			</div>
		</div>

		<div class="profile_containers" style="display:none" data-public-profile>
			${profileHeader}

		</div>
	`;
	return profileContainerInstance.getElement();
};
export { profileContainerInstance, ProfileContainer };
