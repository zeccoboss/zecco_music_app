import CreateElement from "../utils/create-element.js";

const StartupScreen = () => {
	const startupScreen = new CreateElement("div");

	startupScreen.setId("startup-screen");
	startupScreen.addClass("startup_screen");
	("show_startup_screen");
	startupScreen.setInnerHTML(`
		<div class="strt_up_container">
	
		</div>
	`);

	return startupScreen.getElement();
};

export default StartupScreen;
