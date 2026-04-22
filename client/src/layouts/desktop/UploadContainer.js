import CreateElement from "../../utils/create-element.js";

const UploadContainer = () => {
	// Create element
	const uploadContainer = new CreateElement("section");

	// Set attributes
	uploadContainer
		.addClass("upload_section", "main-sections")
		.setId("upload-section").innerHTML = `
		
		   <div class="upload-ctn-main">
        <div class="upload-ctn-upload">
          <div>
            <div class="upload-ctn-upload-title">Upload Track</div>
            <div class="upload-ctn-upload-sub">Review details before uploading</div>
          </div>

          <div class="upload-ctn-file-preview">
            <div class="upload-ctn-file-cover">🎵</div>
            <div class="upload-ctn-file-info">
              <div class="upload-ctn-file-name">midnight_drive_final_mix.mp3</div>
              <div class="upload-ctn-file-metas">
                <div class="upload-ctn-file-meta">
                  <span class="upload-ctn-file-meta-label">Size</span>
                  <span class="upload-ctn-file-meta-val">8.4 MB</span>
                </div>
                <div class="upload-ctn-file-meta">
                  <span class="upload-ctn-file-meta-label">Duration</span>
                  <span class="upload-ctn-file-meta-val">3:45</span>
                </div>
                <div class="upload-ctn-file-meta">
                  <span class="upload-ctn-file-meta-label">Format</span>
                  <span class="upload-ctn-file-meta-val">MP3</span>
                </div>
              </div>
            </div>
            <button class="upload-ctn-file-remove">✕</button>
          </div>

          <div class="upload-ctn-form">
            <div class="upload-ctn-form-row">
              <div class="upload-ctn-field">
                <label class="upload-ctn-field-label">
                  Genre <span class="upload-ctn-required">*</span>
                </label>
                <div class="upload-ctn-select-wrap">
                  <select class="upload-ctn-select">
                    <option value="" disabled selected>Select genre</option>
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
                <span class="upload-ctn-genre-note">⚠ Genre is required to publish your track</span>
              </div>
              <div class="upload-ctn-field">
                <label class="upload-ctn-field-label">Visibility</label>
                <div class="upload-ctn-vis-toggle">
                  <button class="upload-ctn-vis-btn active">🌍 &nbsp;Public</button>
                  <button class="upload-ctn-vis-btn">🔒 &nbsp;Private</button>
                </div>
              </div>
            </div>

            <div class="upload-ctn-submit-block">
              <div class="upload-ctn-submit-note">
                Your track metadata will be extracted automatically by the server.<br>
                <span>Genre is required</span> — everything else is handled server-side.
              </div>
              <button class="upload-ctn-submit-btn">Upload Track ↑</button>
            </div>
          </div>

        </div>	
	`;

	return uploadContainer.getElement();
};
export { UploadContainer };
