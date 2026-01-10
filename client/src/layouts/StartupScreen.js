import CreateElement from "../utils/CreateElement.js";

const StartupScreen = () => {
	const startupScreen = new CreateElement("div");

	startupScreen.setId("startup-screen");
	startupScreen.addClass("startup_screen");
	("show_startup_screen");
	startupScreen.setInnerHTML(`
		<div class="strt_up_container">
			<span class="letter-one">Z</span><span class="letter-two">e</span><span class="letter-three">c</span><span class="letter-four">c</span><span class="letter-five">o</span><span class="letter-six">M</span><span class="letter-seven">u</span><span class="letter-eight">s</span><span class="letter-nine">i</span><span class="letter-ten">c</span>
		</div>
	`);

	return startupScreen.getElement();
};

export default StartupScreen;
