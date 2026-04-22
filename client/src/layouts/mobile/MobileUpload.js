import { buildNode } from "../../utils/build-node.js";
import CreateElement from "../../utils/create-element.js";

const MobileUpload = () => {
	// Create element
	const section = new CreateElement("section");

	// Set attributes
	section.addClass("upload_section", "main-sections").setId("upload-section");

	const state = {
		get header() {
			const html = `
					 <header class="upload-ctn-header">
						<div class="upload-ctn-logo">
							<div class="upload-ctn-logo-icon">🎵</div>
							<div class="upload-ctn-logo-text">Zecco<span>Stream</span></div>
						</div>
						<div class="upload-ctn-avatar">?</div>
					</header>
				`;
			return buildNode(html);
		},
		get auth_gate() {
			const html = `
				<div class="upload-ctn-main">
					<div class="upload-ctn-upload">
						<div class="upload-ctn-upload-header">
							<div class="upload-ctn-upload-title">Upload</div>
							<div class="upload-ctn-upload-sub">Share your music</div>
						</div>
						<div class="upload-ctn-auth-gate">
							<div class="upload-ctn-auth-ring">🎤</div>
							<div class="upload-ctn-auth-title">
								Ready to share your music?
							</div>
							<div class="upload-ctn-auth-sub">
								Log in or create an account to start uploading
								your tracks.
							</div>
							<div class="upload-ctn-auth-btns">
								<a href="/login" class="upload-ctn-btn-accent"
									>Login</a
								>
								<a href="/register" class="upload-ctn-btn-ghost"
									>Sign up</a
								>
							</div>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get drop_zone() {
			const html = `
				<div class="upload-ctn-main">
					<div class="upload-ctn-upload">
						<div class="upload-ctn-upload-header">
							<div class="upload-ctn-upload-title">Upload Track</div>
							<div class="upload-ctn-upload-sub">
								Share your music with the world
							</div>
						</div>
						<div class="upload-ctn-dropzone">
							<div class="upload-ctn-dz-icon">🎵</div>
							<div class="upload-ctn-dz-title">
								Drop audio file here
							</div>
							<div class="upload-ctn-dz-sub">
								Drag & drop or tap to browse<br />Max file
								size: 50MB
							</div>
							<div class="upload-ctn-dz-formats">
								<span class="upload-ctn-format">MP3</span>
								<span class="upload-ctn-format">WAV</span>
								<span class="upload-ctn-format">FLAC</span>
								<span class="upload-ctn-format">AAC</span>
								<span class="upload-ctn-format">OGG</span>
							</div>
							<button class="upload-ctn-dz-btn">Browse Files</button>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
		get review_zone() {
			const html = `
				<div class="upload-ctn-main">
					<div class="upload-ctn-upload">
						<div class="upload-ctn-upload-header">
							<div class="upload-ctn-upload-title">Upload Track</div>
							<div class="upload-ctn-upload-sub">
								Review before uploading
							</div>
						</div>

						<div class="upload-ctn-file-preview">
							<div class="upload-ctn-file-cover">🎵</div>
							<div class="upload-ctn-file-info">
								<div class="upload-ctn-file-name">
									midnight_drive_final.mp3
								</div>
								<div class="upload-ctn-file-metas">
									<div class="upload-ctn-file-meta">
										<span class="upload-ctn-file-meta-label"
											>Size</span
										>
										<span class="upload-ctn-file-meta-val"
											>8.4 MB</span
										>
									</div>
									<div class="upload-ctn-file-meta">
										<span class="upload-ctn-file-meta-label"
											>Duration</span
										>
										<span class="upload-ctn-file-meta-val"
											>3:45</span
										>
									</div>
									<div class="upload-ctn-file-meta">
										<span class="upload-ctn-file-meta-label"
											>Format</span
										>
										<span class="upload-ctn-file-meta-val"
											>MP3</span
										>
									</div>
								</div>
							</div>
							<button class="upload-ctn-file-remove">✕</button>
						</div>

						<div class="upload-ctn-form">
							<div class="upload-ctn-field">
								<label class="upload-ctn-field-label">
									Genre <span class="upload-ctn-required">*</span>
								</label>
								<div class="upload-ctn-select-wrap">
									<select class="upload-ctn-select">
										<option value="" disabled selected>
											Select genre
										</option>
										<optgroup label="🇳🇬 Nigerian">
											<option>Afrobeats</option>
											<option>Afropop</option>
											<option>Highlife</option>
											<option>Amapiano</option>
											<option>Fuji</option>
											<option>Juju</option>
											<option>Afro-Gospel</option>
										</optgroup>
										<optgroup label="🌍 Global">
											<option>Hip-Hop</option>
											<option>R&amp;B</option>
											<option>Pop</option>
											<option>Gospel</option>
											<option>Jazz</option>
											<option>Electronic</option>
											<option>Reggae</option>
											<option>Rock</option>
											<option>Other</option>
										</optgroup>
									</select>
								</div>
								<span class="upload-ctn-genre-note"
									>⚠ Required to publish your track</span
								>
							</div>

							<div class="upload-ctn-field">
								<label class="upload-ctn-field-label"
									>Visibility</label
								>
								<div class="upload-ctn-vis-toggle">
									<button class="upload-ctn-vis-btn active">
										🌍 Public
									</button>
									<button class="upload-ctn-vis-btn">
										🔒 Private
									</button>
								</div>
							</div>

							<div class="upload-ctn-submit-block">
								<div class="upload-ctn-submit-note">
									Metadata extracted automatically by
									server.<br />
									<span>Genre is required.</span>
								</div>
								<button class="upload-ctn-submit-btn">
									Upload Track ↑
								</button>
							</div>
						</div>
					</div>
				</div>
				`;
			return buildNode(html);
		},

		get progress_details() {
			const html = `
				<div class="upload-ctn-main">
					<div class="upload-ctn-upload">
						<div class="upload-ctn-upload-header">
							<div class="upload-ctn-upload-title">Upload Track</div>
							<div class="upload-ctn-upload-sub">Please wait...</div>
						</div>

						<div class="upload-ctn-file-preview" style="opacity: 0.6">
							<div class="upload-ctn-file-cover">🎵</div>
							<div class="upload-ctn-file-info">
								<div class="upload-ctn-file-name">
									midnight_drive_final.mp3
								</div>
								<div class="upload-ctn-file-metas">
									<div class="upload-ctn-file-meta">
										<span class="upload-ctn-file-meta-label"
											>Size</span
										>
										<span class="upload-ctn-file-meta-val"
											>8.4 MB</span
										>
									</div>
									<div class="upload-ctn-file-meta">
										<span class="upload-ctn-file-meta-label"
											>Genre</span
										>
										<span class="upload-ctn-file-meta-val"
											>Afrobeats</span
										>
									</div>
								</div>
							</div>
						</div>

						<div class="upload-ctn-progress">
							<div class="upload-ctn-progress-head">
								<span class="upload-ctn-progress-label"
									>Uploading track...</span
								>
								<span class="upload-ctn-progress-pct">65%</span>
							</div>
							<div class="upload-ctn-progress-bar">
								<div class="upload-ctn-progress-fill"></div>
							</div>
							<span class="upload-ctn-progress-sub"
								>Do not close this page</span
							>
						</div>

						<div class="upload-ctn-submit-block">
							<div class="upload-ctn-submit-note">
								<span>Uploading to server...</span><br />
								Metadata will be extracted automatically.
							</div>
							<button class="upload-ctn-submit-btn" disabled>
								Uploading... ⏳
							</button>
						</div>
					</div>
				</div>
			`;
			return buildNode(html);
		},
	};

	section.append(
		state.header,
		state.auth_gate,
		state.drop_zone,
		state.progress_details,
		state.review_zone,
	);

	return section.getElement();
};
export { MobileUpload };
