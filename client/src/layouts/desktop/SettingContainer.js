import defaultProfile from "../../assets/images/default-profile.png";
import { chevronDownSvg } from "../../assets/svgs/svg-icons.js";
import appConfig from "../../config/app-config.js";
import { buildNode } from "../../utils/build-node.js";
import CreateElement from "../../utils/create-element.js";

// Return the ...
const SettingsContainer = () => {
	// ${!mobileScreen.matches ? buttonWrapper.settingsBtns : ""}

	// const date = `${appConfig.date.getDate()}-${appConfig.date.getMonth()}-${appConfig.date.getFullYear()}`;

	// Create element
	const settingsContainer = new CreateElement("section");
	settingsContainer.addClass("settings_section", "main-sections");

	const content = `
				<div class="settings-frame">
					<!-- Settings sidebar nav -->
					
					<!-- Settings content — showing Account/Profile -->
					<div class="settings-main">
						<div class="settings-content">
							<!-- Account section -->
							<div>
								<div class="settings-section-title">Account</div>

								<div class="settings-label">Profile</div>
								<div class="settings-group">
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-blue">
												👤
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													Edit Profile
												</div>
												<div class="settings-item-sub">
													Update name, bio, avatar and cover
												</div>
											</div>
										</div>
										<span class="settings-chevron">›</span>
									</div>
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-purple">
												🔒
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													Change Password
												</div>
												<div class="settings-item-sub">
													Update your account password
												</div>
											</div>
										</div>
										<span class="settings-chevron">›</span>
									</div>
								</div>
							</div>

							<!-- Appearance -->
							<div>
								<div class="settings-section-title">Appearance</div>
								<div class="settings-label">Theme</div>
								<div class="theme-btns">
									<button class="theme-btn active">🌙 Dark</button>
									<button class="theme-btn">☀️ Light</button>
									<button class="theme-btn">💻 System</button>
								</div>
							</div>

							<!-- Notifications -->
							<div>
								<div class="settings-section-title">Notifications</div>
								<div class="settings-group">
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-yellow">
												🔔
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													New followers
												</div>
												<div class="settings-item-sub">
													When someone follows you
												</div>
											</div>
										</div>
										<div class="settings-toggle on"></div>
									</div>
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-green">
												🎵
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													New uploads
												</div>
												<div class="settings-item-sub">
													From artists you follow
												</div>
											</div>
										</div>
										<div class="settings-toggle on"></div>
									</div>
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-pink">
												❤️
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													Likes on your tracks
												</div>
												<div class="settings-item-sub">
													When someone likes your music
												</div>
											</div>
										</div>
										<div class="settings-toggle"></div>
									</div>
								</div>
							</div>

							<!-- Privacy -->
							<div>
								<div class="settings-section-title">Privacy</div>
								<div class="settings-group">
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-blue">
												🌍
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													Profile visibility
												</div>
												<div class="settings-item-sub">
													Who can see your profile
												</div>
											</div>
										</div>
										<div class="settings-item-right">
											Public <span class="settings-chevron">›</span>
										</div>
									</div>
									<div class="settings-item">
										<div class="settings-item-left">
											<div class="settings-item-icon si-purple">
												📋
											</div>
											<div class="settings-item-text">
												<div class="settings-item-title">
													Show listening activity
												</div>
												<div class="settings-item-sub">
													Let followers see what you play
												</div>
											</div>
										</div>
										<div class="settings-toggle on"></div>
									</div>
								</div>
							</div>

							<!-- Audio -->
							<div>
								<div class="settings-section-title">Audio</div>
								<div class="settings-label">Streaming quality</div>
								<div class="settings-select-wrap">
									<select class="settings-select">
										<option>Auto (recommended)</option>
										<option>Low — 96 kbps</option>
										<option>Normal — 160 kbps</option>
										<option>High — 320 kbps</option>
									</select>
								</div>
							</div>

							<!-- Language -->
							<div>
								<div class="settings-section-title">
									Language & Region
								</div>
								<div class="settings-label">Language</div>
								<div
									class="settings-select-wrap"
									style="margin-bottom: 12px"
								>
									<select class="settings-select">
										<option>English</option>
										<option>Yoruba</option>
										<option>Igbo</option>
										<option>Hausa</option>
										<option>Pidgin</option>
									</select>
								</div>
								<div class="settings-label">Region</div>
								<div class="settings-select-wrap">
									<select class="settings-select">
										<option>Nigeria</option>
										<option>Ghana</option>
										<option>Kenya</option>
										<option>South Africa</option>
										<option>United Kingdom</option>
										<option>United States</option>
									</select>
								</div>
							</div>

							<!-- Danger zone -->
							<div>
								<div
									class="settings-section-title"
									style="color: var(--error)"
								>
									Danger Zone
								</div>
								<div class="danger-zone">
									<div class="danger-zone-text">
										<div class="danger-zone-title">
											Delete Account
										</div>
										<div class="danger-zone-sub">
											Permanently delete your account and all data.
											This cannot be undone.
										</div>
									</div>
									<button class="danger-btn">Delete Account</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	`;
	settingsContainer.appendChild(buildNode(content));
	return settingsContainer.getElement();
};
export { SettingsContainer };
