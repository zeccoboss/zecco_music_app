function buildNode(item) {
	if (item instanceof Node) {
		return item;
	} else if (typeof item === "string") {
		const template = document.createElement("template");
		template.innerHTML = item;
		return template.content;
	} else {
		console.warn("Unknown content type: ", item);
	}
}

function buildFragment(items, handlerFn) {}

export { buildNode, buildFragment };
