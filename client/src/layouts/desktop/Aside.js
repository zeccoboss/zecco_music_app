import {
	gearSvg,
	homeSvg,
	librarySvg,
	magnifierSvg,
	musicIconSvg,
	personProfileSVG,
	uploadSvg,
} from "../../assets/svgs/svg-icons.js";
import CreateElement from "../../utils/create-element.js";

const Aside = () => {
	// Create element
	const aside = new CreateElement("aside");

	// Set attributes and add html content
	aside.setId("sidebar").addClass("sidebar").innerHTML = `
		<div class="logo">
			<div class="logo-icon">${musicIconSvg}</div>
			<h1 class="logo-text">Zecco<span>Stream</span></h1>
		</div>
		<nav class="nav">
			<div class="nav-label">Menu</div>
			<div class="nav-item">
				<a href="/" id="home-nav-link" class="nav-links active">
					${homeSvg}
					<span>Home</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/search" id="search-nav-link" class="nav-links">
					${magnifierSvg}
					<span>Search</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/library" id="lib-nav-link" class="nav-links library-nav">
					${librarySvg}
					<span>Library</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/upload" id="upload-nav-link" class="nav-links">
					${uploadSvg}
					<span>Upload</span>
				</a>
			</div>
		</nav>
		<nav class="nav">
			<div class="nav-label">Account</div>
			<div class="nav-item">
				<a href="/profile" id="profile-nav-link" class="nav-links">
					${personProfileSVG}
					<span>Profile</span>
				</a>
			</div>
			<div class="nav-item">
				<a href="/settings" id="settings-nav-link" class="nav-links">
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

	// const libraryNavLink = aside.getChild(".library_nav");
	// const homeNavLink = aside.getChild("#home-links");
	// const searchNavLink = aside.getChild("#search-link");

	// homeNavLink.addEventListener("click", navigateHome);
	// libraryNavLink.addEventListener("click", navigateLibrary);
	// searchNavLink.addEventListener("click", navigateSearch);

	return aside.getElement();
};

// Export Aside
export default Aside;
