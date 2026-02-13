import CreateElement from "../utils/CreateElement";

function getTag(selector, parent) {
	// Make sure parent not and a create element and is also a node
	const selectCondition =
		parent instanceof CreateElement === false && parent instanceof Node;

	if (!selector || typeof selector !== "string") {
		console.error("Required selector string, value passed: ", selector);
		return null;
	} else if (!parent) {
		return document.querySelector(`${selector}`);
	} else if (parent instanceof CreateElement) {
		// console.log(parent instanceof CreateElement);
		// console.log(parent?.getChild(`${selector}`));
		return parent?.getChild(`${selector}`);
	} else if (selectCondition) {
		return parent.querySelector(`${selector}`);
	}
}

function getMultiTags(selector, flag) {
	if (typeof selector === "string")
		return document.querySelectorAll(`${selector}`);
}

export { getTag, getMultiTags };
