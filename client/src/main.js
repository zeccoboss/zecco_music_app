import Aside from "./layouts/Aside.js";
import Container from "./layouts/Container.js";
// import ExtraContent from "./layouts/ExtraContent.js";
import Footer from "./layouts/Footer.js";
import Header from "./layouts/Header";
import Main from "./layouts/Main.js";
import MobileFooter from "./layouts/MobileFooter";
import MobileHeader from "./layouts/MobileHeader.js";
import MobileMain from "./layouts/MobileMain.js";
import { Overlay } from "./layouts/Overlay.js";
import StartupScreen from "./layouts/StartupScreen.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "./core/screenBreakPoints.js";
import "./styles/style.css";
import "./styles/media_queries.css";
import { initApp } from "./core/initApp.js";
``;
import { FormPage } from "./pages/FormPage.js";
import { NoResourcePage } from "./pages/NoResourcePage.js";
import { VerificationPage } from "./pages/VerificationPage.js";
import { ForgotPasswordFormPage } from "./pages/ForgotPasswordFormPage.js";

const renderApp = (app) => {
	const applyMobileContent = async (message) => {
		console.warn("Clearing app..");
		app.innerHTML = ""; // Clear the app
		console.warn("Appending app content...");

		// Add Components to app
		app.append(
			MobileHeader(),
			await MobileMain(),
			MobileFooter(),
			// StartupScreen(),
			Overlay(),
			NoResourcePage(),
			VerificationPage(),
			FormPage(),
			ForgotPasswordFormPage(),
			// ExtraContent()
			// ProfilePage()
		);

		console.warn(message);

		// Start it's functionality ones DOM is completely built
		document.addEventListener(
			"DOMContentLoaded",
			initApp("Starting Application..."),
		);

		console.log(""); // empty string to show app is fully loaded from additional logs
	};

	const applyBigScreenContent = async (message) => {
		console.warn("Clearing app...");
		app.innerHTML = ""; // Clear the app
		console.warn("Appending app content...");

		// Add Components to app
		app.append(
			Header(),
			await Container(Main, Aside),
			Footer(),
			// StartupScreen(),
			Overlay(),
			NoResourcePage(),
			VerificationPage(),
			// ExtraContent(),
			FormPage(),
			ForgotPasswordFormPage(),
		);

		console.warn(message);

		// Start it's functionality ones DOM is completely built
		document.addEventListener(
			"DOMContentLoaded",
			initApp("Starting Application..."),
		);

		console.log(""); // empty string to show app is fully loaded from additional logs
	};

	const applyLargeScreenContent = async (message) => {
		console.warn("Clearing app...");
		app.innerHTML = ""; // Clear the app
		console.warn("Appending app content...");

		// Add Components to app
		app.append(
			Header(),
			await Container(Main, Aside),
			Footer(),
			// StartupScreen(),
			Overlay(),
			NoResourcePage(),
			VerificationPage(),
			ForgotPasswordFormPage(),
			FormPage(),
			// ExtraContent()
		);

		console.warn(message);

		// Start it's functionality ones DOM is completely built
		document.addEventListener(
			"DOMContentLoaded",
			initApp("Starting Application..."),
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
				"[Mobile Screen]: Listened and changed to mobile device screen.",
			);
	});

	// Listen to changes on screen size and render the corresponding layouts
	bigScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyBigScreenContent(
				`[Big Screen]: Listened and changed to device Big device screen.`,
			);
	});

	// Listen to changes on screen size and render the corresponding layouts
	largeScreen.addEventListener("change", (e) => {
		if (e.target.matches)
			applyLargeScreenContent(
				`[Large Screen]: Listened and changed to device Large device screen.`,
			);
	});
};

// Render Application
renderApp(document.querySelector("#app"));
