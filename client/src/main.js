import Aside from "./layouts/Aside.js";
import Container from "./layouts/Container.js";
import ExtraContent from "./layouts/ExtraContent.js";
import Footer from "./layouts/Footer.js";
import Header from "./layouts/Header.js";
import Main from "./layouts/Main.js";
import MobileFooter from "./layouts/MobileFooter.js";
import MobileHeader from "./layouts/MobileHeader.js";
import MobileMain from "./layouts/MobileMain.js";
import Overlay from "./layouts/Overlay.js";
import StartupScreen from "./layouts/StartupScreen.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "./core/screenBreakePoints.js";
import "./styles/style.css";
import "./styles/media_querries.css";
import { initApp } from "./core/initApp.js";
import ProfilePage from "./pages/profilePage.js";

const renderApp = (app) => {
	const applyMobileContent = (message) => {
		console.warn("Clearing app...");
		app.innerHTML = ""; // Clear the app
		console.warn("Appending app content...");

		// Add Components to app
		app.append(
			MobileHeader(),
			MobileMain(),
			MobileFooter(),
			StartupScreen(),
			Overlay(),
			ExtraContent(),
			ProfilePage()
		);

		console.warn(message);

		// Start it's functionality ones DOM is completely built
		document.addEventListener(
			"DOMContentLoaded",
			initApp("Starting Application...")
		);

		console.log(""); // empty string to show app is fully loaded from additional logs
	};

	const applyBigScreenContent = (message) => {
		console.warn("Clearing app...");
		app.innerHTML = ""; // Clear the app
		console.warn("Appending app content...");

		// Add Components to app
		app.append(
			Header(),
			Container(Main, Aside),
			Footer(),
			StartupScreen(),
			Overlay(),
			ProfilePage(),
			ExtraContent()
		);

		console.warn(message);

		// Start it's functionality ones DOM is completely built
		document.addEventListener(
			"DOMContentLoaded",
			initApp("Starting Application...")
		);

		console.log(""); // empty string to show app is fully loaded from additional logs
	};

	const applyLargeScreenContent = (message) => {
		console.warn("Clearing app...");
		app.innerHTML = ""; // Clear the app
		console.warn("Appending app content...");

		// Add Components to app
		app.append(
			Header(),
			Container(Main, Aside),
			Footer(),
			StartupScreen(),
			Overlay(),
			ProfilePage(),
			ExtraContent()
		);

		console.warn(message);

		// Start it's functionality ones DOM is completely built
		document.addEventListener(
			"DOMContentLoaded",
			initApp("Starting Application...")
		);

		console.log(""); // empty string to show app is fully loaded from additional logs
	};

	// Check screen size and pass appropraite layouts
	if (mobileScreen.matches) {
		applyMobileContent("[Screen Size]: Mobile screen!");
	} else if (bigScreen.matches) {
		applyBigScreenContent("[Screen Size]: Large screen!");
	} else if (largeScreen.matches) {
		applyBigScreenContent("[Screen Size]: Large screen!");
	}

	// Listen to changes on screen size and render the corresponding layouts
	mobileScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyMobileContent(
				"[Mobile Screen]: Listened and changed to mobile device screen."
			);
	});

	// Listen to changes on screen size and render the corresponding layouts
	bigScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyBigScreenContent(
				`[Big Screen]: Listened and changed to device Big device screen.`
			);
	});

	// Listen to changes on screen size and render the corresponding layouts
	largeScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyLargeScreenContent(
				`[Large Screen]: Listened and changed to device Large device screen.`
			);
	});
};

// Render Application
renderApp(document.querySelector("#app"));
