import restoreDefaultLayout from "../helpers/restore-default-layout.js";
import { router } from "../routes/router.js";
import CreateElement from "../utils/create-element.js";

const NoResourcePage = () => {
	// Create element
	const page = new CreateElement("div");

	// Set attributes
	page.addClass("app-page").setId("no-resource-page");

	page.innerHTML = `
		<div class="no_resource_page">
			<!-- bg blobs -->
			<div class="bg-blob blob-1"></div>
			<div class="bg-blob blob-2"></div>
			<div class="bg-blob blob-3"></div>

			<!-- floating notes -->
			<div class="note">🎵</div>
			<div class="note">🎶</div>
			<div class="note">🎵</div>
			<div class="note">🎶</div>
			<div class="note">♪</div>
			<div class="note">♫</div>

			<!-- logo -->
			<div class="top-logo">
				<div class="top-logo-icon">🎵</div>
				<div class="top-logo-text">Zecco<span>Stream</span></div>
			</div>

			<!-- vinyl 
			<div class="vinyl-wrap">
				<div class="vinyl">
					<div class="vinyl-scratch"></div>
					<div class="vinyl-scratch vinyl-scratch-2"></div>
				</div>
				<div class="vinyl-center">😵</div>
			</div>-->

			<!-- content -->
			<div class="content">
				<div class="error-num">404</div>
				<div class="error-title">Resource not found</div>
				<div class="error-sub">
					Looks like this track got lost in the mix. The page you're looking
					for doesn't exist or may have been moved.
				</div>

				<div class="btn-group">
					<a href="/" class="btn-home">🏠 &nbsp;Return Home</a>
					<a href="javascript:history.back()" class="btn-back"
						>← &nbsp;Go Back</a
					>
				</div>
			</div>

			<div class="quick-links">
				<a href="/search" class="quick-link">🔍 Search</a>
				<a href="/library" class="quick-link">📚 Library</a>
				<a href="/upload" class="quick-link">⬆️ Upload</a>
				<a href="/profile" class="quick-link">👤 Profile</a>
			</div>
		</div>

	`;

	return page.getElement();
};

export { NoResourcePage };
