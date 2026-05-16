import CreateElement from "@zecco/utils/dom/create-element";
import "./Modal.styles.css";

export const Modal = ({ isOpen, onClose, children, message }) => {
	if (!isOpen) return null;

	const root = new CreateElement("div");
	root.setClass("modal");
	root.addClass("modal");

	return root.getElement;
};
