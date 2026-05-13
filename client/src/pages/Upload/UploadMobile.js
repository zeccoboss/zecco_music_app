import CreateElement from "@zecco/utils/dom/create-element";
import { buildNode } from "@zecco/utils/dom/build-node.js";
import "./Upload.styles.css";

/**
 * UploadMobile — Mobile upload view component
 *
 * Same states as desktop but optimised for touch:
 *   - Full-width dropzone tap area
 *   - Stacked form fields (no grid)
 *   - Bottom-anchored submit bar
 *
 * @async
 * @param {Object} props
 * @param {string} props.state
 * @param {Object} props.ctx
 * @param {Object} props.data
 * @returns {Promise<Element>}
 */
export const UploadMobile = async ({ state, ctx, data = {} }) => {
	const root = new CreateElement("section");
	root
		.addClass("upload-section-mobile", "main-sections")
		.setId("upload-section-mobile");

	// ── State factories ──────────────────────────────────────

	const skeletonState = () =>
		buildNode(`
			<section class="upload-mob-state" id="upload-mob-skeleton" data-content="skeleton">
				<div class="upload-mob-header">
					<div class="upload-sk upload-sk--text-lg" style="width:120px"></div>
					<div class="upload-sk upload-sk--text-sm" style="width:180px;margin-top:4px"></div>
				</div>
				<div class="upload-sk upload-sk--dropzone"></div>
				<div style="display:flex;flex-direction:column;gap:10px">
					<div class="upload-sk upload-sk--input"></div>
					<div class="upload-sk upload-sk--input"></div>
					<div class="upload-sk upload-sk--submit"></div>
				</div>
			</section>
		`);

	const authGate = () =>
		buildNode(`
			<section class="upload-mob-state upload-mob-state--centered" id="upload-mob-auth" data-content="auth">
				<div class="upload-mob-auth-icon">
					<i class="bi bi-mic-fill"></i>
				</div>
				<h3 class="upload-mob-auth-title">Ready to share?</h3>
				<p class="upload-mob-auth-sub">
					Log in to start uploading your tracks.
				</p>
				<div class="upload-mob-auth-btns">
					<a href="/auth/login" class="upload-btn-primary">Login</a>
					<a href="/auth/register" class="upload-btn-ghost">Sign up</a>
				</div>
			</section>
		`);

	const dropzoneState = () =>
		buildNode(`
			<section class="upload-mob-state" id="upload-mob-dropzone" data-content="dropzone">
				<div class="upload-mob-header">
					<h2 class="upload-mob-title">Upload Track</h2>
					<p class="upload-mob-sub">Share your music with the world</p>
				</div>

				<div class="upload-mob-dropzone" id="upload-mob-dropzone-area">
					<div class="upload-mob-dz-icon">
						<i class="bi bi-cloud-arrow-up"></i>
					</div>
					<p class="upload-mob-dz-title">Tap to select audio</p>
					<p class="upload-mob-dz-sub">or drag and drop here</p>
					<div class="upload-dz-formats">
						<span class="upload-format-chip">MP3</span>
						<span class="upload-format-chip">WAV</span>
						<span class="upload-format-chip">FLAC</span>
						<span class="upload-format-chip">AAC</span>
						<span class="upload-format-chip">OGG</span>
					</div>
					<input
						type="file"
						id="upload-mob-file-input"
						accept=".mp3,.wav,.flac,.aac,.ogg,audio/*"
						hidden
					/>
				</div>

				<p class="upload-mob-size-note">
					<i class="bi bi-info-circle"></i>
					Maximum file size: 50MB
				</p>
			</section>
		`);

	const formState = () =>
		buildNode(`
			<section class="upload-mob-state" id="upload-mob-form" data-content="form">

				<!-- File card -->
				<div class="upload-mob-file-card" id="upload-mob-file-card">
					<div class="upload-file-cover upload-file-cover--sm">
						<i class="bi bi-music-note-beamed"></i>
					</div>
					<div class="upload-file-info">
						<p class="upload-file-name" id="upload-mob-file-name">
							${data.fileName ?? "filename.mp3"}
						</p>
						<div class="upload-file-metas">
							<div class="upload-file-meta">
								<span class="upload-meta-label">Size</span>
								<span class="upload-meta-val" id="upload-mob-file-size">
									${data.fileSize ?? "—"}
								</span>
							</div>
							<div class="upload-file-meta">
								<span class="upload-meta-label">Duration</span>
								<span class="upload-meta-val" id="upload-mob-file-duration">
									${data.fileDuration ?? "—"}
								</span>
							</div>
							<div class="upload-file-meta">
								<span class="upload-meta-label">Format</span>
								<span class="upload-meta-val" id="upload-mob-file-format">
									${data.fileFormat ?? "—"}
								</span>
							</div>
						</div>
					</div>
					<button class="upload-file-remove" id="upload-mob-file-remove" title="Remove">
						<i class="bi bi-x-lg"></i>
					</button>
				</div>

				<!-- Genre -->
				<div class="upload-field">
					<label class="upload-field-label" for="upload-mob-genre">
						Genre <span class="upload-field-required">*</span>
					</label>
					<div class="upload-select-wrap">
						<select class="upload-select" id="upload-mob-genre">
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
						Required to publish
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
							<i class="bi bi-globe2"></i> Public
						</button>
						<button
							class="upload-vis-btn ${data.visibility === "private" ? "active" : ""}"
							data-vis="private"
							type="button"
						>
							<i class="bi bi-lock-fill"></i> Private
						</button>
					</div>
				</div>

				<!-- Fixed bottom submit -->
				<div class="upload-mob-submit-bar">
					<button class="upload-btn-primary upload-btn-primary--full" id="upload-mob-submit-btn">
						Upload Track
						<i class="bi bi-arrow-up-circle-fill"></i>
					</button>
				</div>
			</section>
		`);

	const uploadingState = () =>
		buildNode(`
			<section class="upload-mob-state" id="upload-mob-uploading" data-content="uploading">

				<div class="upload-mob-file-card upload-mob-file-card--locked">
					<div class="upload-file-cover upload-file-cover--sm">
						<i class="bi bi-music-note-beamed"></i>
					</div>
					<div class="upload-file-info">
						<p class="upload-file-name" id="upload-mob-uploading-name">
							${data.fileName ?? "filename.mp3"}
						</p>
						<div class="upload-file-metas">
							<div class="upload-file-meta">
								<span class="upload-meta-label">Genre</span>
								<span class="upload-meta-val">${data.genre ?? "—"}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="upload-progress">
					<div class="upload-progress-head">
						<span class="upload-progress-label">
							<i class="bi bi-arrow-up-circle"></i>
							Uploading...
						</span>
						<span class="upload-progress-pct" id="upload-mob-pct">0%</span>
					</div>
					<div class="upload-progress-bar">
						<div class="upload-progress-fill" id="upload-mob-progress-fill"></div>
					</div>
					<span class="upload-progress-warning">
						<i class="bi bi-exclamation-triangle"></i>
						Keep this page open
					</span>
				</div>

				<div class="upload-mob-submit-bar">
					<button class="upload-btn-primary upload-btn-primary--full" disabled>
						Uploading...
						<i class="bi bi-hourglass-split"></i>
					</button>
				</div>
			</section>
		`);

	const completedState = () =>
		buildNode(`
			<section class="upload-mob-state upload-mob-state--centered" id="upload-mob-completed" data-content="completed">
				<div class="upload-success-ring">
					<i class="bi bi-check-lg"></i>
				</div>
				<h3 class="upload-success-title">Uploaded!</h3>
				<p class="upload-success-sub" id="upload-mob-success-msg">
					Your track is now live on SoniqStream.
				</p>
				<div class="upload-success-actions">
					<button class="upload-btn-primary" id="upload-mob-another-btn">
						<i class="bi bi-plus-lg"></i>
						Upload Another
					</button>
					<a href="/library" class="upload-btn-ghost">
						<i class="bi bi-collection-play"></i>
						Library
					</a>
				</div>
			</section>
		`);

	const errorState = () =>
		buildNode(`
			<section class="upload-mob-state upload-mob-state--centered" id="upload-mob-error" data-content="error">
				<div class="upload-error-icon">
					<i class="bi bi-exclamation-triangle-fill"></i>
				</div>
				<h3 class="upload-error-title">Upload Failed</h3>
				<p class="upload-error-sub" id="upload-mob-error-msg">
					Something went wrong. Please try again.
				</p>
				<button class="upload-btn-primary" id="upload-mob-retry-btn">
					<i class="bi bi-arrow-clockwise"></i>
					Try Again
				</button>
			</section>
		`);

	// ── Always visible header ────────────────────────────────
	// Shown on all states except skeleton (which has its own
	// inline placeholder) and centered states (auth/completed/error)
	// that don't need a page-level title.
	const header = () =>
		buildNode(`
			<header class="upload-mob-header-bar">
				<h2 class="upload-title">Upload Track</h2>
				<p class="upload-sub">Share your music with the world</p>
			</header>
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

	root.append(getStateView(state));
	return root.getElement();
};
