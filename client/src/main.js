import { initApp } from "./core/init-app.js";
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "./core/screen-break-points.js";
import Aside from "./layouts/desktop/Aside.js";
import { Footer } from "./layouts/desktop/Footer";
import { Main } from "./layouts/desktop/Main.js";
import { MobileFooter } from "./layouts/mobile/MobileFooter";
import { MobileMain } from "./layouts/mobile/MobileMain";
import { MiniPlayer } from "./layouts/mobile/MobileMiniPlayer.js";
import { Overlay } from "./layouts/Overlay.js";
import DesktopFullPlayer from "./pages/desktop/DesktopFullPlayer.js";
import { DesktopLoginPage } from "./pages/desktop/DesktopLoginPage.js";
import { DesktopPasswordPage } from "./pages/desktop/DesktopPasswordPage.js";
import { DesktopRegisterPage } from "./pages/desktop/DesktopRegisterPage.js";
import MobileFullPlayer from "./pages/mobile/MobileFullPlayer.js";
import { MobileLoginPage } from "./pages/mobile/MobileLoginPage.js";
import { MobilePasswordPage } from "./pages/mobile/MobilePasswordPage.js";
import { MobileRegisterPage } from "./pages/mobile/MobileRegisterPage.js";
import { NoResourcePage } from "./pages/NoResourcePage.js";
import "./styles/base.css";
import "./styles/media.css";

const renderApp = () => {
	const app = document.querySelector("#app");

	const clearApp = () => {
		app.innerHTML = "";
	};

	const applyMobileContent = async (message) => {
		clearApp();
		app.append(
			await MobileMain(),
			MiniPlayer(),
			MobileFooter(),
			NoResourcePage(),
			MobileLoginPage(),
			MobileRegisterPage(),
			MobileFullPlayer(),
			MobilePasswordPage(),
			// Overlay(),
			// VerificationPage(),
			// FormPage(),
			// ForgotPasswordFormPage(),
		);
		console.warn(message);
		initApp("Starting Application...");
	};

	const applyDesktopContent = async (message) => {
		clearApp();
		app.append(
			Aside(),
			await Main(),
			Footer(),
			NoResourcePage(),
			DesktopFullPlayer(),
			DesktopLoginPage(),
			DesktopRegisterPage(),
			DesktopPasswordPage(),
			// Overlay(),
			// VerificationPage(),
			// FormPage(),
			// ForgotPasswordFormPage(),
		);
		console.warn(message);
		initApp("Starting Application...");
	};

	// Initial render
	if (mobileScreen.matches) applyMobileContent("[Screen Size]: Mobile!");
	else applyDesktopContent("[Screen Size]: Desktop!");

	// Respond to screen size changes
	mobileScreen.addEventListener("change", (e) => {
		if (e.matches) applyMobileContent("[Screen]: Switched to mobile.");
	});
	bigScreen.addEventListener("change", (e) => {
		if (e.matches) applyDesktopContent("[Screen]: Switched to big.");
	});
	largeScreen.addEventListener("change", (e) => {
		if (e.matches) applyDesktopContent("[Screen]: Switched to large.");
	});
};

renderApp();
