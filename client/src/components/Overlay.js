import CreateElement from "../utils/CreateElement.js";

const Overlay = () => {
	// Create element
	const overlay = new CreateElement("div");
	overlay.addClass("overlay");

	overlay.setInnerHTML(`
		<div id="spiner_wrapper">
			<div class="overlay_spinner_one"></div>
			<div class="overlay_spinner_two"></div>
		</div>
		
		<p class="overlay_p">Loading...</p>
	`);

	return overlay.getElement();
};

export default Overlay;
