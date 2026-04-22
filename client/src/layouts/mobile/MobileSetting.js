import defaultProfile from "../../assets/images/default-profile.png";
import { chevronDownSvg } from "../../assets/svgs/svg-icons.js";
import appConfig from "../../config/app-config.js";
import CreateElement from "../../utils/create-element.js";

// Return the ...
const MobilSettings = () => {
	// ${!mobileScreen.matches ? buttonWrapper.settingsBtns : ""}

	// Create element
	const mobilSettings = new CreateElement("section");
	mobilSettings.addClass("settings_section", "main-sections");

	const settingsContent = `
		<div class="mobile-settings-page">
			<div class="mobile-settings-header">
				<div class="mobile-settings-title">Settings</div>
			</div>

			<!-- Profile card -->
			<div class="mobile-settings-profile">
				<div class="mobile-settings-avatar">ZB</div>
				<div>
					<div class="mobile-settings-name">ZECCOBOSS</div>
					<div class="mobile-settings-plan">
						Free plan · Edit profile
					</div>
				</div>
				<span class="mobile-settings-chevron">›</span>
			</div>

			<div class="mobile-settings-list">
				<div class="mobile-settings-group-label">Account</div>
				<div class="mobile-settings-item">
					<div class="mobile-settings-icon si-purple">🔒</div>
					<div class="mobile-settings-text">
						<div class="mobile-settings-title">Change Password</div>
						<div class="mobile-settings-sub">
							Update your password
						</div>
					</div>
					<div class="mobile-settings-right">›</div>
				</div>
				<div class="mobile-settings-item">
					<div class="mobile-settings-icon si-blue">🛡️</div>
					<div class="mobile-settings-text">
						<div class="mobile-settings-title">Privacy</div>
						<div class="mobile-settings-sub">
							Profile visibility · Activity
						</div>
					</div>
					<div class="mobile-settings-right">›</div>
				</div>

				<div class="mobile-settings-group-label">
					Preferences
				</div>
				<div class="mobile-settings-item">
					<div class="mobile-settings-icon si-blue">🎨</div>
					<div class="mobile-settings-text">
						<div class="mobile-settings-title">Appearance</div>
						<div class="mobile-settings-sub">Dark</div>
					</div>
					<div class="mobile-settings-right">›</div>
				</div>
				<div class="mobile-settings-item">
					<div class="mobile-settings-icon si-yellow">🔔</div>
					<div class="mobile-settings-text">
						<div class="mobile-settings-title">Notifications</div>
						<div class="mobile-settings-sub">
							Followers, likes, uploads
						</div>
					</div>
					<div class="mobile-settings-right">›</div>
				</div>
				<div class="mobile-settings-item">
					<div class="mobile-settings-icon si-green">🎵</div>
					<div class="mobile-settings-text">
						<div class="mobile-settings-title">Audio Quality</div>
						<div class="mobile-settings-sub">Auto</div>
					</div>
					<div class="mobile-settings-right">›</div>
				</div>
				<div class="mobile-settings-item">
					<div class="mobile-settings-icon si-orange">🌍</div>
					<div class="mobile-settings-text">
						<div class="mobile-settings-title">
							Language & Region
						</div>
						<div class="mobile-settings-sub">English · Nigeria</div>
					</div>
					<div class="mobile-settings-right">›</div>
				</div>

				<div class="mobile-settings-group-label">Danger</div>
				<div
					class="mobile-settings-item"
					style="
						border-color: rgba(255, 74, 74, 0.2);
						background: rgba(255, 74, 74, 0.05);
					"
				>
					<div class="mobile-settings-icon si-red">🗑️</div>
					<div class="mobile-settings-text">
						<div
							class="mobile-settings-title"
							style="color: var(--error)"
						>
							Delete Account
						</div>
						<div class="mobile-settings-sub">
							Permanently remove your account
						</div>
					</div>
					<div
						class="mobile-settings-right"
						style="color: var(--error)"
					>
						›
					</div>
				</div>
			</div>
		</div>
	`;

	mobilSettings.appendContent(settingsContent);

	return mobilSettings.getElement();
};
export { MobilSettings };
