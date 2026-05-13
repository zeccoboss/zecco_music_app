// Utility function to build a Node from a string or return the Node if it's already a Node
function buildNode(item) {
	// If item is already a Node, return it. If it's a string, parse it as HTML and return the resulting Node(s).
	if (item instanceof Node) {
		return item; // Already a Node, return as is
	} else if (typeof item === "string") {
		// Create a template element to parse the HTML string
		const template = document.createElement("template");

		// Parse the HTML string into DOM nodes
		template.innerHTML = item;

		// Return the DocumentFragment containing the parsed nodes
		return template.content;
	} else {
		console.warn("Unknown content type: ", item);
	}
}

// Utility function to build a DocumentFragment from an array of items (strings or Nodes) and an optional handler function
function buildFragment(items, handlerFn) {
	const fragment = document.createDocumentFragment();

	items.forEach((item) => {
		const node = buildNode(item); // Build a Node from the item (string or Node)

		if (handlerFn && typeof handlerFn === "function") {
			handlerFn(node); // Call the handler function with the created Node
		}

		fragment.appendChild(node); // Append the Node to the DocumentFragment
	});

	return fragment; // Return the built DocumentFragment
}

export { buildNode, buildFragment };
