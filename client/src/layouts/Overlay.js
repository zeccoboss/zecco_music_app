/** biome-ignore-all assist/source/organizeImports: <explanation> */
import CreateElement from "../utils/CreateElement.js";

// Create element
const overlayInstance = new CreateElement("div");
overlayInstance.addClass("overlay");

const Overlay = () => overlayInstance.getElement();

export { Overlay, overlayInstance };
