import { buildNode } from "../../utils/build-node.js";
import CreateElement from "../../utils/create-element.js";
import { MiniPlayer } from "./MobileMiniPlayer.js";

const MobileProfile = () => {
	// Create element
	const section = new CreateElement("section");

	// Set attributes
	section
		.addClass("mobile-section", "main-sections", "profile_section")
		.setId("mobile-section");

	const state = {
		get content() {
			const html = `   
				<div class="mobile-profile">
					<!-- Cover -->
					<div class="mobile-cover">
						<div class="mobile-cover-glow"></div>
						<div class="mobile-cover-pattern"></div>
						<div class="mobile-cover-edit">📷 Edit Cover</div>
					</div>

					<!-- Identity -->
					<div class="mobile-identity">
						<div
							style="
								display: flex;
								justify-content: space-between;
								align-items: flex-end;
							"
						>
							<div class="mobile-avatar-wrap">
								<div class="mobile-avatar">🧑</div>
								<div class="mobile-avatar-edit">✏️</div>
							</div>
							<div class="mobile-edit-btn">✏️ Edit Profile</div>
						</div>

						<div class="mobile-name-row">
							<div>
								<div class="mobile-name">ZECCOBOSS</div>
								<div class="mobile-uid">ID: 478984397664387298</div>
							</div>
						</div>

						<!-- Stats card -->
						<div class="mobile-stats">
							<div class="mobile-stat">
								<span class="mobile-stat-num">0</span>
								<span class="mobile-stat-label">Following</span>
							</div>
							<div class="mobile-stat-divider"></div>
							<div class="mobile-stat">
								<span class="mobile-stat-num">0</span>
								<span class="mobile-stat-label">Followers</span>
							</div>
							<div class="mobile-stat-divider"></div>
							<div class="mobile-stat">
								<span class="mobile-stat-num">0</span>
								<span class="mobile-stat-label">Uploads</span>
							</div>
						</div>

						<div class="mobile-bio-block">
							<div class="mobile-bio">About me</div>
							<div class="mobile-since">Member since 13-3-2026</div>
						</div>
					</div>

					<!-- Tabs + content -->
					<div class="mobile-content">
						<div class="mobile-tabs">
							<button class="mobile-tab active">Playlists</button>
							<button class="mobile-tab">Uploads</button>
							<button class="mobile-tab">Liked</button>
						</div>
						<div class="mobile-panel">
							<div class="mobile-empty-icon">🎵</div>
							<div class="mobile-empty-title">No playlists yet</div>
							<div class="mobile-empty-sub">
								Create your first playlist to get started
							</div>
							<button class="mobile-empty-btn">+ Create Playlist</button>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get authGate() {
			const html = `
        `;
			return buildNode(html);
		},
	};

	section.append(state.content, state.authGate);

	return section.getElement();
};
export { MobileProfile };
