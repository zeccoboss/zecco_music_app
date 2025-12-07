import CreateElement from "../utils/CreateElement.js";

const Overlay = () => {
	// Create element
	const overlay = new CreateElement("div");
	overlay.addClass("overlay");

	overlay.setInnerHTML(`
		<div class="overlay_spinner"></div>
		<p>Loading...</p>
	`);
	return overlay.getElement();
};

export default Overlay;
