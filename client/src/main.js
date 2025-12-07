import Aside from "./components/Aside.js";
import Container from "./components/Container.js";
import ExtraContent from "./components/ExtraContent.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Overlay from "./components/Overlay.js";
import StartupScreen from "./components/StartupScreen.js";
import "./style.css";
import { initApp } from "./utils/initApp.js";

const renderApp = (app) => {
	app.append(
		Header(),
		Container(Main, Aside),
		Footer(),
		StartupScreen(),
		Overlay(),
		ExtraContent()
	);

	document.addEventListener(
		"DOMContentLoaded",
		initApp("Starting Application...")
	);

	console.log("");
};

renderApp(document.querySelector("#app"));
