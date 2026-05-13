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
		return this;
	}

	append(...items) {
		this.element.append(...items);
		return this;
	}

	appendChild(child) {
		this.element.appendChild(child);
		return this;
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
		return this;
	}

	addEvent(type, handler) {
		this.element.addEventListener(`${type}`, handler);
		return this;
	}

	remove() {
		this.element.remove();
		return this;
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
		return this;
	}

	setId(id) {
		this.element.id = id;
		return this;
	}

	addClass(...items) {
		items.forEach((cl) => {
			if (cl !== "") this.element.classList.add(cl);
		});
		return this;
	}

	hasClass(identifier) {
		return !!this.element.classList.contains(identifier);
	}

	removeClass(...items) {
		items.forEach((cl) => {
			if (cl !== "") this.element.classList.remove(cl);
		});
		return this;
	}

	placeholder(placeholder) {
		this.element.placeholder = placeholder;
		return this;
	}

	columns(columns) {
		this.element.cols = columns;
		return this;
	}

	rows(rows) {
		this.element.rows = rows;
		return this;
	}

	setValue(value) {
		this.element.value = value;
		return this;
	}

	clearValue(value = "") {
		this.element.value = value;
		return this;
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
		return this;
	}
}

export default CreateElement;
