import CreateElement from "@zecco/utils/dom/create-element";
import "./Overlay.styles.css";

const Overlay = () => {
	const root = new CreateElement("div");
	root.addClass("overlay", "overlay--hidden").setId("overlay");
	//  "overlay--show";
	return root.getElement();
};

export { Overlay, Overlay as default };
