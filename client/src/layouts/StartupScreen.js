import CreateElement from "../utils/CreateElement.js";

const StartupScreen = () => {
	const startupScreen = new CreateElement("div");

	startupScreen.setId("startup-screen");
	startupScreen.addClass("startup_screen");

	startupScreen.setInnerHTML("<h2>Startup Screen</h2>");

	return startupScreen.getElement();
};

export default StartupScreen;
