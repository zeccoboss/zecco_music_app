import CreateElement from "../../utils/create-element";

const MobileFullPlayer = () => {
	const section = new CreateElement("section");
	section
		.addClass("mobile-full-player", "app-page")
		.setId("full-player").innerHTML = `
		<div class="full-player-player-bg"></div>

		<div class="full-player-player-topbar">
			<div class="full-player-player-collapse">∨</div>
			<div class="full-player-player-label">Now Playing</div>
			<div class="full-player-player-dots">⋯</div>
		</div>

		<div class="full-player-artwork-wrap">
			<div class="full-player-artwork">🎵</div>
		</div>

		<div class="full-player-track-info">
			<div class="full-player-track-text">
				<div class="full-player-track-title">Midnight Drive</div>
				<div class="full-player-track-artist">Artist Name · Afrobeats</div>
			</div>
			<div class="full-player-track-like liked">❤️</div>
		</div>

		<div class="full-player-progress-wrap">
			<div class="full-player-progress-bar">
				<div class="full-player-progress-fill"></div>
			</div>
			<div class="full-player-progress-times">
				<span class="full-player-progress-time">1:24</span>
				<span class="full-player-progress-time">3:45</span>
			</div>
		</div>

		<div class="full-player-controls">
			<div class="full-player-ctrl-side">
				<button class="full-player-ctrl active">⇄</button>
				<button class="full-player-ctrl">⏮</button>
			</div>
			<button class="full-player-ctrl-play">⏸</button>
			<div class="full-player-ctrl-side">
				<button class="full-player-ctrl">⏭</button>
				<button class="full-player-ctrl">↻</button>
			</div>
		</div>

		<div class="full-player-volume">
			<span class="full-player-vol-icon">🔈</span>
			<div class="full-player-vol-bar"><div class="full-player-vol-fill"></div></div>
			<span class="full-player-vol-icon">🔊</span>
		</div>

		<div class="full-player-extra-actions">
			<div class="full-player-extra-btn">
				<div class="full-player-extra-icon">➕</div>
				<span class="full-player-extra-label">Add to</span>
			</div>
			<div class="full-player-extra-btn">
				<div class="full-player-extra-icon">↗️</div>
				<span class="full-player-extra-label">Share</span>
			</div>
			<div class="full-player-extra-btn">
				<div class="full-player-extra-icon">👤</div>
				<span class="full-player-extra-label">Artist</span>
			</div>
			<div class="full-player-extra-btn">
				<div class="full-player-extra-icon">⬇️</div>
				<span class="full-player-extra-label">Save</span>
			</div>
		</div>

		<div class="full-player-queue-pill">
			<span class="full-player-queue-icon">≡</span>
			<div class="full-player-queue-text">
				<div class="full-player-queue-label">Up Next</div>
				<div class="full-player-queue-sub">Golden Hour · Calm Waters · +4 more</div>
			</div>
			<span class="full-player-queue-arrow">›</span>
		</div>
		</div>
	`;

	return section.getElement();
};

export default MobileFullPlayer;
