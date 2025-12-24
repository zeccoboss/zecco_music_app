import Aside from "./components/Aside.js";
import Container from "./components/Container.js";
import ExtraContent from "./components/ExtraContent.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import MobileFooter from "./components/MobileFooter.js";
import MobileHeader from "./components/MobileHeader.js";
import MobileMain from "./components/MobileMain.js";
import Overlay from "./components/Overlay.js";
import StartupScreen from "./components/StartupScreen.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "./core/screenBreakePoints.js";
import "./style.css";
import "./media_querries.css";
import { initApp } from "./utils/initApp.js";

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

	// Check screen size and pass appropraite components
	if (mobileScreen.matches) {
		applyMobileContent("[Screen Size]: Mobile screen!");
	} else if (bigScreen.matches) {
		applyBigScreenContent("[Screen Size]: Large screen!");
	} else if (largeScreen.matches) {
		applyBigScreenContent("[Screen Size]: Large screen!");
	}

	// Listen to changes on screen size and render the corresponding components
	mobileScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyMobileContent(
				"[Mobile Screen]: Listened and changed to mobile device screen."
			);
	});

	// Listen to changes on screen size and render the corresponding components
	bigScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyBigScreenContent(
				`[Big Screen]: Listened and changed to device Big device screen.`
			);
	});

	// Listen to changes on screen size and render the corresponding components
	largeScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyLargeScreenContent(
				`[Large Screen]: Listened and changed to device Large device screen.`
			);
	});
};

// Render Application
renderApp(document.querySelector("#app"));
