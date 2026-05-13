import CreateElement from "@zecco/utils/dom/create-element.js";

function getTag(selector, parentNode) {
	if (!selector || typeof selector !== "string") {
		console.error("[DOM]: Selector must be a string:", selector);
		return null;
	}

	// No parent → global query
	if (!parentNode) return document.querySelector(selector);

	// CreateElement instance
	if (parentNode instanceof CreateElement) {
		return parentNode.getChild(selector) || null;
	}

	// Native DOM node
	if (parentNode instanceof Node) {
		return parentNode.querySelector(selector);
	}

	console.warn("[DOM]: Invalid parentNode passed:", parentNode);
	return null;
}

function getMultiTags(selector, parentNode) {
	if (!selector || typeof selector !== "string") {
		console.error("[DOM]: Selector must be a string:", selector);
		return [];
	}

	// No parent
	if (!parentNode) return Array.from(document.querySelectorAll(selector));

	// CreateElement instance
	if (parentNode instanceof CreateElement) {
		return Array.from(parentNode.getChildren(selector) || []);
	}

	// Native DOM node
	if (parentNode instanceof Node) {
		return Array.from(parentNode.querySelectorAll(selector));
	}

	console.warn("[DOM]: Invalid parentNode passed:", parentNode);
	return [];
}

export { getTag, getMultiTags };
