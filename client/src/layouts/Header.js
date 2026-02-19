// biome-ignore assist/source/organizeImports: <Might arrange them later>
import { bigScreen, largeScreen } from "../core/screenBreakPoints.js";

import CreateElement from "../utils/CreateElement.js";
import {
	magnifierSvg,
	musicIconSvg,
	panelOpenSvg,
} from "../assets/svgs/svgIcons.js";

const Header = () => {
	// Create element
	const headerInstance = new CreateElement("header", "Header");

	// Set attribute
	headerInstance.addClass("header");
	headerInstance.setId("header");

	headerInstance.innerHTML = `
		<div class="header_logo_container">
			<div class="sidebar_toggle_container">
				<button class="sidebar_toggle_btn">${panelOpenSvg}</button>	
				<small class="sidebar_toggle_tooltip" arial-label="Toggle sidebar">Toggle sidebar</small>
			</div>
			<div href="/" class="logo">${musicIconSvg}<span>ZeccoMusic</span></div>
		</div>

		<form action="" class="search_form">
			${magnifierSvg}
			<input type="search" name="search" id="search-input" class="search_input" placeholder="Search..." />
		</form>

		<div class="header_sign_btn">
			<button class="header_signup_btn">
				<a href="/register">Sign Up</a>
			</button>
			<button class="header_signin_btn">
				<a href="/login">Login</a>
			</button>
		</div>
	`;

	// const headerSVGs =headerInstance.getChildren("svg", "element");
	const musicIcon = headerInstance.getChild(".bi-music-note");

	const searchInput = headerInstance.getChild(".search_input");

	searchInput.addEventListener("input", (e) => {
		e.preventDefault();

		const searchValue = e.target.value;
		alert(searchValue);
	});

	if (bigScreen.matches || largeScreen.matches) {
		musicIcon.setAttribute("width", "35");
		musicIcon.setAttribute("height", "35");
	}

	// return header element
	return headerInstance.getElement();
};

export { Header };
