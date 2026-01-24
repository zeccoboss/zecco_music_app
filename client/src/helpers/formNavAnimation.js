import loadingImg from "../assets/images/logo.jpg";
import { overlayInstance } from "../layouts/Overlay";

const formNavAnimation = () => {
	overlayInstance.innerHTML = "";
	overlayInstance.innerHTML = `
		<div class="overlay_logo_container">
			<img src="${loadingImg}" alt="" height="300" width="300" class="overlay_logo"/>
		</div>
	`;
};

export { formNavAnimation };
