import {
	gearSvg,
	homeSvg,
	librarySvg,
	magnifierSvg,
	personProfileSVG,
	uploadSvg,
} from "@zecco/assets/svgs/svg-icons";
import AppLogo from "@zecco/components/AppLogo";
import { buildNode } from "@zecco/utils/dom/build-node";
import CreateElement from "@zecco/utils/dom/create-element";

const Aside = () => {
	// Create element
	const sidebar = new CreateElement("aside");

	// Set attributes and add html content
	sidebar.setId("sidebar").addClass("sidebar");

	const content = `
		<nav class="nav">
			<div class="nav-label">Menu</div>
			<div class="nav-item">
				<a href="/" id="home-nav-link" data-nav-link="/" class="nav-links active">
					<i class="bi bi-house nav-icons"></i>
					<span>Home</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/search" id="search-nav-link" data-nav-link="/search" class="nav-links">
					<i class="bi bi-search nav-icons"></i>
					<span>Search</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/library" id="lib-nav-link" data-nav-link="/library" class="nav-links library-nav">
					<i class="bi bi-music-note-list nav-icons"></i>
					<span>Library</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/uploads" id="upload-nav-link" data-nav-link="/uploads" class="nav-links">
					<i class="bi bi-cloud-upload-fill nav-icons"></i>
					<span>Upload</span>
				</a>
			</div>
		</nav>
		<nav class="nav">
			<div class="nav-label">Account</div>
			<div class="nav-item">
				<a href="/profile" id="profile-nav-link" data-nav-link="/profile" class="nav-links">
					<i class="bi bi-person-circle nav-icons"></i>
					<span>Profile</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/settings" id="settings-nav-link" data-nav-link="/settings" class="nav-links">
					${gearSvg}
					<span>Settings</span>
				</a>
			</div>
		</nav>
		<footer class="sidebar-footer">
			<div class="avatar">ZB</div>
			<div>
				<div class="avatar-name">ZECCOBOSS</div>
				<div class="avatar-plan">Free plan</div>
			</div>
		</footer>
	`;

	sidebar.append(AppLogo(), buildNode(content));

	return sidebar.getElement();
};

// Export Aside
export default Aside;
