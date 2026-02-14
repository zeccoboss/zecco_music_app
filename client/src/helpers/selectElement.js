import CreateElement from "../utils/CreateElement";

function getTag(selector, parentNode) {
	// Make sure parentNode not and a create element and is also a node
	const selectCondition =
		parentNode instanceof CreateElement === false &&
		parentNode instanceof Node;

	if (!selector || typeof selector !== "string") {
		console.error("Required selector string, value passed: ", selector);
		return null;
	} else if (!parentNode) {
		return document.querySelector(`${selector}`);
	} else if (parentNode instanceof CreateElement) {
		// console.log(parentNode instanceof CreateElement);
		// console.log(parentNode?.getChild(`${selector}`));
		return parentNode?.getChild(`${selector}`);
	} else if (selectCondition) {
		return parentNode.querySelector(`${selector}`);
	}
}

function getMultiTags(selector, parentNode) {
	// Make sure parentNode not and a create element and is also a node
	const selectCondition =
		parentNode instanceof CreateElement === false &&
		parentNode instanceof Node;

	if (!selector || typeof selector !== "string") {
		console.error("Required selector string, value passed: ", selector);
		return null;
	} else if (!parentNode) {
		return document.querySelectorAll(`${selector}`);
	} else if (parentNode instanceof CreateElement) {
		// console.log(parentNode instanceof CreateElement);
		// console.log(parentNode?.getChild(`${selector}`));
		return parentNode?.getChild(`${selector}`);
	} else if (selectCondition) {
		return parentNode.querySelectorAll(`${selector}`);
	}
}

export { getTag, getMultiTags };
