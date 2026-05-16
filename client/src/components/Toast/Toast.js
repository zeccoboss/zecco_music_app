import CreateElement from "@zecco/utils/dom/create-element";
import "./Toast.styles.css";

export const Toast = () => {
	if (!isOpen) return null;

	const root = new CreateElement("div");
	root.setClass("toast");
	root.addClass("toast");

	return root.getElement;
};
