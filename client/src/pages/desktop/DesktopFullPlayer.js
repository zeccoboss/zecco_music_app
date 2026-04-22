import CreateElement from "../../utils/create-element";

const DesktopFullPlayer = () => {
	const section = new CreateElement("section");
	section
		.addClass("desktop-full-player", "app-page")
		.setId("full-player").innerHTML = `
    <!-- Main player -->
    <div class="full-player-main">

      <div class="full-player-topbar">
        <button class="full-player-back">← &nbsp;Back to Browse</button>
        <div class="full-player-label">Now Playing</div>
        <div class="full-player-actions">
          <div class="full-player-action-btn">↗️</div>
          <div class="full-player-action-btn">⋯</div>
        </div>
      </div>

      <div class="full-player-center">

        <div class="full-player-artwork">🎵</div>

        <div class="full-player-track-details">
          <div>
            <div class="full-player-track-header">
              <div>
                <div class="full-player-track-title">Midnight Drive</div>
                <div class="full-player-track-artist">Artist Name</div>
                <div class="full-player-track-genre">Afrobeats</div>
              </div>
              <div class="full-player-like-btn liked">❤️</div>
            </div>
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
            <div class="full-player-ctrl-group">
              <button class="full-player-ctrl active">⇄</button>
              <button class="full-player-ctrl">⏮</button>
            </div>
            <button class="full-player-ctrl-play">⏸</button>
            <div class="full-player-ctrl-group">
              <button class="full-player-ctrl">⏭</button>
              <button class="full-player-ctrl">↻</button>
            </div>
          </div>

          <div class="full-player-extras">
            <div class="full-player-vol">
              <span class="full-player-vol-icon">🔈</span>
              <div class="full-player-vol-bar"><div class="full-player-vol-fill"></div></div>
              <span class="full-player-vol-icon">🔊</span>
            </div>
            <div class="full-player-extra-btns">
              <div class="full-player-extra-btn active" title="Queue">≡</div>
              <div class="full-player-extra-btn" title="Add to playlist">➕</div>
              <div class="full-player-extra-btn" title="Share">↗️</div>
              <div class="full-player-extra-btn" title="Go to artist">👤</div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Queue panel -->
    <div class="full-player-queue-panel">
      <div class="full-player-queue-header">
        <div class="full-player-queue-title">Queue</div>
        <div class="full-player-queue-count">6 tracks</div>
      </div>

      <div class="full-player-queue-now">
        <div class="full-player-queue-now-label">Now Playing</div>
        <div class="full-player-queue-track">
          <div class="full-player-qt-cover qtc1">🎵</div>
          <div class="full-player-qt-info">
            <div class="full-player-qt-title">Midnight Drive</div>
            <div class="full-player-qt-artist">Artist Name</div>
          </div>
          <div class="full-player-qt-eq">
            <div class="full-player-qt-bar"></div>
            <div class="full-player-qt-bar"></div>
            <div class="full-player-qt-bar"></div>
          </div>
        </div>
      </div>

      <div class="full-player-queue-list">
        <div class="full-player-queue-next-label">Up Next</div>

        <div class="full-player-queue-item">
          <div class="full-player-qi-drag">⠿</div>
          <div class="full-player-qi-cover qtc2">🎸</div>
          <div class="full-player-qi-info">
            <div class="full-player-qi-title">Golden Hour</div>
            <div class="full-player-qi-artist">Artist Name</div>
          </div>
          <div class="full-player-qi-dur">4:12</div>
          <div class="full-player-qi-dots">⋯</div>
        </div>
        <div class="full-player-queue-item">
          <div class="full-player-qi-drag">⠿</div>
          <div class="full-player-qi-cover qtc3">🎹</div>
          <div class="full-player-qi-info">
            <div class="full-player-qi-title">Calm Waters</div>
            <div class="full-player-qi-artist">Artist Name</div>
          </div>
          <div class="full-player-qi-dur">2:58</div>
          <div class="full-player-qi-dots">⋯</div>
        </div>
        <div class="full-player-queue-item">
          <div class="full-player-qi-drag">⠿</div>
          <div class="full-player-qi-cover qtc4">🥁</div>
          <div class="full-player-qi-info">
            <div class="full-player-qi-title">Urban Pulse</div>
            <div class="full-player-qi-artist">Artist Name</div>
          </div>
          <div class="full-player-qi-dur">3:22</div>
          <div class="full-player-qi-dots">⋯</div>
        </div>
        <div class="full-player-queue-item">
          <div class="full-player-qi-drag">⠿</div>
          <div class="full-player-qi-cover qtc5">🎺</div>
          <div class="full-player-qi-info">
            <div class="full-player-qi-title">Lagos Nights</div>
            <div class="full-player-qi-artist">Artist Name</div>
          </div>
          <div class="full-player-qi-dur">4:02</div>
          <div class="full-player-qi-dots">⋯</div>
        </div>
        <div class="full-player-queue-item">
          <div class="full-player-qi-drag">⠿</div>
          <div class="full-player-qi-cover qtc1">🎤</div>
          <div class="full-player-qi-info">
            <div class="full-player-qi-title">Street Anthem</div>
            <div class="full-player-qi-artist">Artist Name</div>
          </div>
          <div class="full-player-qi-dur">3:55</div>
          <div class="full-player-qi-dots">⋯</div>
        </div>
        <div class="full-player-queue-item">
          <div class="full-player-qi-drag">⠿</div>
          <div class="full-player-qi-cover qtc2">🎵</div>
          <div class="full-player-qi-info">
            <div class="full-player-qi-title">Sunset Vibes</div>
            <div class="full-player-qi-artist">Artist Name</div>
          </div>
          <div class="full-player-qi-dur">3:10</div>
          <div class="full-player-qi-dots">⋯</div>
        </div>

      </div>
    </div>
	`;

	return section.getElement();
};

export default DesktopFullPlayer;
