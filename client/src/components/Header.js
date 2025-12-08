import { mobleScreen } from "../core/screenBreakePoints.js";
import { navigateSearch } from "../events/navigateSearch.js";
import { pushHistory } from "../routes/router.js";
// import navigateSignup from "../events/navigateSignup.js";
import CreateElement from "../utils/CreateElement.js";
import { magnifierSvg, musicIconSvg } from "../utils/SVG_ICONS.js";
const Header = () => {
	// Create element
	const header = new CreateElement("header", "Header");

	// Set attribute
	header.addClass("header", "");
	header.setId("header");

	const htmlContent = `
		<a href="/" class="logo">${musicIconSvg}<span>zecco_music</span></a>

		<form action="" class="search_form">
			${magnifierSvg}
			<input type="search" name="search" id="search-input" class="search_input" placeholder="Search..." />
		</form>

		<div class="header_sign_btn">
			<button class="header_signup_btn">
				<a href="/signup">Sign Up</a>
			</button>
			<button class="header_signin_btn">
				<a href="/login">Login</a>
			</button>
		</div>
	`;

	header.setInnerHTML(htmlContent);

	const headerSVGs = header.getChildren("svg", "el");
	const musicIcon = header.getChild(".bi-music-note", "class");

	if (mobleScreen.matches) {
		headerSVGs.forEach((svg) => {
			if (svg.classList.contains("music_icon-optional")) {
				svg.setAttribute("width", "13");
				svg.setAttribute("height", "13");
			} else {
				svg.setAttribute("width", `30`);
				svg.setAttribute("height", `30`);
			}
		});
	} else {
		musicIcon.setAttribute("width", "35");
		musicIcon.setAttribute("height", "35");
	}

	const searchInput = header.getChild("search_input", "class");

	searchInput.addEventListener("input", (e) => {
		navigateSearch();
		const searchValue = e.target.value;
		pushHistory("/search");

		console.log(searchValue);
	});

	// return header element
	return header.getElement();
};

export default Header;
