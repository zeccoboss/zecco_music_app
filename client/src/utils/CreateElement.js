class CreateElement {
	static instances = new Set();

	constructor(elementName, text, html) {
		this.element = document.createElement(`${elementName}`);

		if (html) this.element.innerHTML = html;
		else if (text) this.element.innerText = text;
		CreateElement.instances.add(this.element);
	}

	static getInstances() {
		return CreateElement.instances;
	}

	setAttribute(name, value) {
		if (typeof name !== "string") {
			console.warn(`${name}, Not a valid attribute`);
			return;
		} else this.element.setAttribute(name, value);
	}

	append(...items) {
		this.element.append(...items);
	}

	appendChild(child) {
		this.element.appendChild(child);
	}

	appendContent(...items) {
		items.forEach((item) => {
			if (item instanceof Node) {
				this.appendChild(item);
			} else if (typeof item === "string") {
				const tlp = document.createElement("template");
				tlp.innerHTML = item;
				this.element.append(tlp.content);
			} else {
				console.warn("Unknown content type: ", item);
			}
		});
	}

	addEvent(type, handler) {
		this.element.addEventListener(`${type}`, handler);
	}

	remove() {
		this.element.remove();
	}

	getElement() {
		return this.element;
	}

	getChild(selector) {
		return this.element.querySelector(`${selector}`);
	}

	getChildren(selector) {
		return this.element.querySelectorAll(`${selector}`);
	}

	set type(type) {
		if (!type) return;
		this.element.setAttribute("type", type);
	}

	disableElement(value) {
		this.element.disabled = value;
	}

	setId(id) {
		this.element.id = id;
	}

	addClass(...items) {
		items.forEach((cl) => {
			if (cl !== "") this.element.classList.add(cl);
		});
	}

	hasClass(identifier) {
		return !!this.element.classList.contains(identifier);
	}

	removeClass(...items) {
		items.forEach((cl) => {
			if (cl !== "") this.element.classList.remove(cl);
		});
	}

	placeholder(placeholder) {
		this.element.placeholder = placeholder;
	}

	columns(columns) {
		this.element.cols = columns;
	}

	rows(rows) {
		this.element.rows = rows;
	}

	setValue(value) {
		this.element.value = value;
	}

	clearValue(value = "") {
		this.element.value = value;
	}

	set innerText(text) {
		if (!text) return;
		this.element.innerText = text;
	}

	set innerHTML(html) {
		if (!html || typeof html !== "string") return;
		this.element.innerHTML = html;
	}

	get outerHTML() {
		return this.element.outerHTML;
	}

	style(key, value) {
		if (
			!key ||
			!value ||
			typeof key !== "string" ||
			typeof value !== "string"
		) {
			console.warn("Invalid style");
			return;
		}
		this.element.style[key] = value;
	}
}

export default CreateElement;
