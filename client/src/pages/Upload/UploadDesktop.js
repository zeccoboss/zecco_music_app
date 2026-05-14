import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Upload.styles.css";

/**
 * UploadDesktop — Desktop upload view component
 *
 * States:
 *   skeleton  → initial load, checking auth
 *   auth      → user not logged in
 *   dropzone  → logged in, no file selected
 *   form      → file selected, filling details
 *   uploading → upload in progress
 *   completed → upload succeeded
 *   error     → upload failed
 *
 * @async
 * @param {Object} props
 * @param {string} props.state
 * @param {Object} props.ctx   - Router context
 * @param {Object} props.data  - { file, fileName, fileSize, fileDuration, fileFormat, genre, visibility }
 * @returns {Promise<Element>}
 */
export const UploadDesktop = async ({ state, ctx, data = {} }) => {
	const root = new CreateElement("section");
	root.addClass("upload-section", "main-sections").setId("upload-section");

	// ── Always visible header ────────────────────────────────
	const header = () =>
		buildNode(`
			<header class="upload-header">
				<div>
					<h2 class="upload-title">Upload Track</h2>
					<p class="upload-sub">Share your music with the world</p>
				</div>
			</header>
		`);

	// ── State factories ──────────────────────────────────────

	const skeletonState = () =>
		buildNode(`
			<section class="upload-state" id="upload-skeleton" data-content="skeleton">
				<div class="upload-skeleton-preview">
					<div class="upload-sk upload-sk--cover"></div>
					<div style="flex:1;display:flex;flex-direction:column;gap:8px">
						<div class="upload-sk upload-sk--text-lg"></div>
						<div class="upload-sk upload-sk--text-sm" style="width:55%"></div>
					</div>
				</div>
				<div style="display:flex;flex-direction:column;gap:12px">
					<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
						<div style="display:flex;flex-direction:column;gap:6px">
							<div class="upload-sk upload-sk--text-sm" style="width:50px"></div>
							<div class="upload-sk upload-sk--input"></div>
						</div>
						<div style="display:flex;flex-direction:column;gap:6px">
							<div class="upload-sk upload-sk--text-sm" style="width:60px"></div>
							<div class="upload-sk upload-sk--input"></div>
						</div>
					</div>
					<div class="upload-sk upload-sk--submit-bar"></div>
				</div>
			</section>
		`);

	const authGate = () =>
		buildNode(`
			<section class="upload-state upload-state--centered" id="upload-auth-gate" data-content="auth">
				<div class="upload-auth-icon">
					<i class="bi bi-mic-fill"></i>
				</div>
				<h3 class="upload-auth-title">Ready to share your music?</h3>
				<p class="upload-auth-sub">
					Create an account or log in to start uploading your tracks.
				</p>
				<div class="upload-auth-btns">
					<a href="/auth/login" class="upload-btn-primary">Login</a>
					<a href="/auth/register" class="upload-btn-ghost">Sign up</a>
				</div>
			</section>
		`);

	const dropzoneState = () =>
		buildNode(`
			<section class="upload-state" id="upload-dropzone" data-content="dropzone">
				<div class="upload-dropzone" id="upload-dropzone-area">
					<div class="upload-dz-icon">
						<i class="bi bi-cloud-arrow-up"></i>
					</div>
					<p class="upload-dz-title">Drop your track file here</p>
					<p class="upload-dz-sub">
						Drag and drop your track or click to browse.<br/>
						Max file size: 50MB
					</p>
					<div class="upload-dz-formats">
						<span class="upload-format-chip">MP3</span>
						<span class="upload-format-chip">WAV</span>
						<span class="upload-format-chip">FLAC</span>
						<span class="upload-format-chip">AAC</span>
						<span class="upload-format-chip">OGG</span>
					</div>
					<button class="upload-btn-primary" id="upload-browse-btn">
						<i class="bi bi-folder2-open"></i>
						Browse Files
					</button>
					<input
						type="file"
						id="upload-file-input"
						accept=".mp3,.wav,.flac,.aac,.ogg,track/*"
						hidden
					/>
				</div>
			</section>
		`);

	const formState = () =>
		buildNode(`
			<section class="upload-state" id="upload-form" data-content="form">

				<!-- File preview card -->
				<div class="upload-file-card" id="upload-file-card">
					<div class="upload-file-cover" id="upload-file-cover">
						<i class="bi bi-music-note-beamed"></i>
					</div>
					<div class="upload-file-info">
						<p class="upload-file-name" id="upload-file-name">
							${data.fileName ?? "filename.mp3"}
						</p>
						<div class="upload-file-metas">
							<div class="upload-file-meta">
								<span class="upload-meta-label">Size</span>
								<span class="upload-meta-val" id="upload-file-size">
									${data.fileSize ?? "—"}
								</span>
							</div>
							<div class="upload-file-meta">
								<span class="upload-meta-label">Duration</span>
								<span class="upload-meta-val" id="upload-file-duration">
									${data.fileDuration ?? "—"}
								</span>
							</div>
							<div class="upload-file-meta">
								<span class="upload-meta-label">Format</span>
								<span class="upload-meta-val" id="upload-file-format">
									${data.fileFormat ?? "—"}
								</span>
							</div>
						</div>
					</div>
					<button class="upload-file-remove" id="upload-file-remove" title="Remove file">
						<i class="bi bi-x-lg"></i>
					</button>
				</div>

				<!-- Form -->
				<div class="upload-form">
					<div class="upload-form-row">

						<!-- Genre -->
						<div class="upload-field">
							<label class="upload-field-label" for="upload-genre">
								Genre <span class="upload-field-required">*</span>
							</label>
							<div class="upload-select-wrap">
								<select class="upload-select" id="upload-genre">
									<option value="" disabled ${!data.genre ? "selected" : ""}>
										Select genre
									</option>
									<optgroup label="🇳🇬 Nigerian">
										<option value="Afrobeats"  ${data.genre === "Afrobeats" ? "selected" : ""}>Afrobeats</option>
										<option value="Afropop"    ${data.genre === "Afropop" ? "selected" : ""}>Afropop</option>
										<option value="Highlife"   ${data.genre === "Highlife" ? "selected" : ""}>Highlife</option>
										<option value="Amapiano"   ${data.genre === "Amapiano" ? "selected" : ""}>Amapiano</option>
										<option value="Fuji"       ${data.genre === "Fuji" ? "selected" : ""}>Fuji</option>
										<option value="Juju"       ${data.genre === "Juju" ? "selected" : ""}>Juju</option>
										<option value="Afro-Gospel"${data.genre === "Afro-Gospel" ? "selected" : ""}>Afro-Gospel</option>
									</optgroup>
									<optgroup label="🌍 Global">
										<option value="Hip-Hop"    ${data.genre === "Hip-Hop" ? "selected" : ""}>Hip-Hop</option>
										<option value="R&B"        ${data.genre === "R&B" ? "selected" : ""}>R&amp;B</option>
										<option value="Pop"        ${data.genre === "Pop" ? "selected" : ""}>Pop</option>
										<option value="Gospel"     ${data.genre === "Gospel" ? "selected" : ""}>Gospel</option>
										<option value="Jazz"       ${data.genre === "Jazz" ? "selected" : ""}>Jazz</option>
										<option value="Electronic" ${data.genre === "Electronic" ? "selected" : ""}>Electronic</option>
										<option value="Reggae"     ${data.genre === "Reggae" ? "selected" : ""}>Reggae</option>
										<option value="Classical"  ${data.genre === "Classical" ? "selected" : ""}>Classical</option>
										<option value="Rock"       ${data.genre === "Rock" ? "selected" : ""}>Rock</option>
										<option value="Soul"       ${data.genre === "Soul" ? "selected" : ""}>Soul</option>
										<option value="Other"      ${data.genre === "Other" ? "selected" : ""}>Other</option>
									</optgroup>
								</select>
								<i class="bi bi-chevron-down upload-select-arrow"></i>
							</div>
							<span class="upload-field-hint">
								<i class="bi bi-exclamation-circle"></i>
								Genre is required to publish your track
							</span>
						</div>

						<!-- Visibility -->
						<div class="upload-field">
							<label class="upload-field-label">Visibility</label>
							<div class="upload-vis-toggle">
								<button
									class="upload-vis-btn ${!data.visibility || data.visibility === "public" ? "active" : ""}"
									data-vis="public"
									type="button"
								>
									<i class="bi bi-globe2"></i>
									Public
								</button>
								<button
									class="upload-vis-btn ${data.visibility === "private" ? "active" : ""}"
									data-vis="private"
									type="button"
								>
									<i class="bi bi-lock-fill"></i>
									Private
								</button>
							</div>
						</div>
					</div>

					<!-- Submit bar -->
					<div class="upload-submit-bar">
						<p class="upload-submit-note">
							Track metadata is extracted automatically.<br/>
							<span>Genre is required</span> — everything else is handled.
						</p>
						<button class="upload-btn-primary" id="upload-submit-btn">
							Upload Track
							<i class="bi bi-arrow-up-circle-fill"></i>
						</button>
					</div>
				</div>
			</section>
		`);

	const uploadingState = () =>
		buildNode(`
			<section class="upload-state" id="upload-uploading" data-content="uploading">

				<!-- Locked file card -->
				<div class="upload-file-card upload-file-card--locked">
					<div class="upload-file-cover">
						<i class="bi bi-music-note-beamed"></i>
					</div>
					<div class="upload-file-info">
						<p class="upload-file-name" id="upload-uploading-name">
							${data.fileName ?? "filename.mp3"}
						</p>
						<div class="upload-file-metas">
							<div class="upload-file-meta">
								<span class="upload-meta-label">Size</span>
								<span class="upload-meta-val">${data.fileSize ?? "—"}</span>
							</div>
							<div class="upload-file-meta">
								<span class="upload-meta-label">Genre</span>
								<span class="upload-meta-val">${data.genre ?? "—"}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Progress -->
				<div class="upload-progress">
					<div class="upload-progress-head">
						<span class="upload-progress-label">
							<i class="bi bi-arrow-up-circle"></i>
							Uploading track...
						</span>
						<span class="upload-progress-pct" id="upload-pct">0%</span>
					</div>
					<div class="upload-progress-bar">
						<div class="upload-progress-fill" id="upload-progress-fill"></div>
					</div>
					<span class="upload-progress-warning">
						<i class="bi bi-exclamation-triangle"></i>
						Do not close this page while uploading
					</span>
				</div>

				<!-- Disabled submit -->
				<div class="upload-submit-bar">
					<p class="upload-submit-note">
						Uploading your track to the server.<br/>
						<span>Metadata will be extracted automatically.</span>
					</p>
					<button class="upload-btn-primary" disabled>
						Uploading...
						<i class="bi bi-hourglass-split"></i>
					</button>
				</div>
			</section>
		`);

	const completedState = () =>
		buildNode(`
			<section class="upload-state upload-state--centered" id="upload-completed" data-content="completed">
				<div class="upload-success-ring">
					<i class="bi bi-check-lg"></i>
				</div>
				<h3 class="upload-success-title">Track Uploaded!</h3>
				<p class="upload-success-sub" id="upload-success-msg">
					Your track is now live on SoniqStream.
				</p>
				<div class="upload-success-actions">
					<button class="upload-btn-primary" id="upload-another-btn">
						<i class="bi bi-plus-lg"></i>
						Upload Another
					</button>
					<a href="/library" class="upload-btn-ghost">
						<i class="bi bi-collection-play"></i>
						View in Library
					</a>
				</div>
			</section>
		`);

	const errorState = () =>
		buildNode(`
			<section class="upload-state upload-state--centered" id="upload-error" data-content="error">
				<div class="upload-error-icon">
					<i class="bi bi-exclamation-triangle-fill"></i>
				</div>
				<h3 class="upload-error-title">Upload Failed</h3>
				<p class="upload-error-sub" id="upload-error-msg">
					Something went wrong while uploading your track. Please try again.
				</p>
				<button class="upload-btn-primary" id="upload-retry-btn">
					<i class="bi bi-arrow-clockwise"></i>
					Try Again
				</button>
			</section>
		`);

	// ── Pick state view ──────────────────────────────────────
	const getStateView = (state) => {
		switch (state) {
			case "auth":
				return authGate();
			case "dropzone":
				return dropzoneState();
			case "form":
				return formState();
			case "uploading":
				return uploadingState();
			case "completed":
				return completedState();
			case "error":
				return errorState();
			default:
				return skeletonState();
		}
	};

	root.append(header(), getStateView(state));
	return root.getElement();
};
