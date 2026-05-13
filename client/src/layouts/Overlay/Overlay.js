import CreateElement from "@zecco/utils/dom/create-element";

// Create element
const overlayInstance = new CreateElement("div");
overlayInstance.addClass("overlay");

const Overlay = () => overlayInstance.getElement();

export { Overlay, overlayInstance };
