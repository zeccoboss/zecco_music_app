import defaultProfile from "../../assets/images/default-profile.png";
import { cameraSvg, pencilSvg } from "../../assets/svgs/svg-icons.js";
import { buttonWrapper } from "../../components/HeaderBtnContainer.js";
import appConfig from "../../config/app-config.js";
import { buildNode } from "../../utils/build-node.js";
import CreateElement from "../../utils/create-element.js";

const ProfileContainer = () => {
	const profileContainer = new CreateElement("section");

	// Set attributes
	profileContainer
		.addClass("profile_section", "main-sections")
		.setId("profile-section").innerHTML = `
	    <div class="profile-main">

      <!-- Cover -->
      <div class="profile-cover">
        <div class="profile-cover-glow"></div>
        <div class="profile-cover-pattern"></div>
        <div class="profile-cover-edit">📷 Edit Cover</div>
      </div>

      <!-- Identity -->
      <div class="profile-identity">
        <div class="profile-avatar-wrap">
          <div class="profile-profile-avatar">🧑</div>
          <div class="profile-avatar-edit-btn">✏️</div>
        </div>
        <div class="profile-meta">
          <div class="profile-name-row">
            <div>
              <div class="profile-name">ZECCOBOSS</div>
              <div class="profile-uid">ID: 478984397664387298</div>
            </div>
            <div class="profile-edit-btn">✏️ Edit Profile</div>
          </div>
          <div class="profile-stats">
            <div class="profile-stat">
              <span class="profile-stat-num">0</span>
              <span class="profile-stat-label">Following</span>
            </div>
            <div class="profile-stat-div"></div>
            <div class="profile-stat">
              <span class="profile-stat-num">0</span>
              <span class="profile-stat-label">Followers</span>
            </div>
            <div class="profile-stat-div"></div>
            <div class="profile-stat">
              <span class="profile-stat-num">0</span>
              <span class="profile-stat-label">Uploads</span>
            </div>
          </div>
          <div class="profile-bio">About me</div>
          <div class="profile-since">Member since 13-3-2026</div>
        </div>
      </div>

      <!-- Content — two column -->
      <div class="profile-content">
        <div class="profile-tabs">
          <button class="profile-tab active">Playlists</button>
          <button class="profile-tab">Uploads</button>
          <button class="profile-tab">Liked</button>
        </div>
        <div class="profile-panel">
          <div class="profile-empty-icon">🎵</div>
          <div class="profile-empty-title">No playlists yet</div>
          <div class="profile-empty-sub">Create your first playlist to get started</div>
          <button class="profile-empty-btn">+ Create Playlist</button>
        </div>
      </div>

    </div>
	
	`;

	return profileContainer.getElement();
};
export { ProfileContainer };

const profileContent = {
	get tabsBar() {
		const html = `
            <nav class="home-tabs">
                <button class="home-tab active-tab" data-tab="discover">Discover</button>
                <button class="home-tab auth-tab" data-tab="explore">Explore</button>
                <button class="home-tab auth-tab" data-tab="for-you">For You</button>
            </nav>
        `;
		return buildNode(html);
	},
	get content() {
		const html = `   
				<section id="profile-content" class="" data-content="">
					<header class="main-header">
						<div>
							<div class="home-greeting">Good evening 👋</div>
							<div class="page-title">Discover</div>
						</div>
						<div class="search">${magnifierSvg} &nbsp;Search...</div>
					</header>
				</section>
			`;
		return buildNode(html);
	},
	get authGate() {
		const html = `
         
        `;
		return buildNode(html);
	},
};
