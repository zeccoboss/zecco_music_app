import CreateElement from "../utils/CreateElement.js";
import loadingImg from "../assets/images/loading_img.jpg";

const Overlay = () => {
	// Create element
	const overlay = new CreateElement("div");
	overlay.addClass("overlay");

	overlay.setInnerHTML(`
		<div class="overlay_logo_container">
			<img src="${loadingImg}" alt="" height="300" width="300" class="overlay_logo"/>
		</div>
		
	`);

	return overlay.getElement();
};

export default Overlay;
