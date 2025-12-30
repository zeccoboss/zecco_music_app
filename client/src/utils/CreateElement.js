class CreateElement {
	constructor(elementName, innerText, innerHTML) {
		const element = document.createElement(`${elementName}`);
		this.element = element;
		this.element.innerHTML = innerHTML ? innerHTML : "";
		this.element.innerText = innerText ? innerText : "";
	}

	append(...elArray) {
		this.element.append(...elArray);
	}

	addEvent(eventType, eventFunction) {
		this.element.addEventListener(`${eventType}`, eventFunction);
	}

	remove() {
		this.element.innerHTML = "";
		this.element.remove();
	}

	getElement() {
		return this.element;
	}

	getChild(selector, flag) {
		if (flag === "id") {
			return selector.includes("#")
				? this.element.querySelector(`${selector}`)
				: this.element.querySelector(`#${selector}`);
		} else if (flag === "class") {
			return selector.includes(".")
				? this.element.querySelector(`${selector}`)
				: this.element.querySelector(`.${selector}`);
		} else if (flag === "el") {
			return this.element.querySelector(`${selector}`);
		} else {
			console.error(`[Flag Error]: "${flag}" not valid a valid flag`);
			return null;
		}
	}

	getChildren(selector, flag) {
		if (flag === "class") {
			return selector.includes(".")
				? this.element.querySelectorAll(`${selector}`)
				: this.element.querySelectorAll(`.${selector}`);
		} else if (flag === "el") {
			return this.element.querySelectorAll(`${selector}`);
		} else {
			console.error(`[Flag Error]: "${flag}" not valid a valid flag`);
			return null;
		}
	}

	setType(type) {
		this.element.setAttribute("type", type);
	}

	disableElement(value) {
		this.element.disabled = value;
	}

	showElement() {
		console.log(this.element);
	}

	setId(id) {
		this.element.id = id;
	}

	addClass(...classArray) {
		classArray.forEach((cl) => {
			if (cl !== "") this.element.classList.add(cl);
		});
	}

	removeClass(...classNames) {
		classNames.forEach((cl) => {
			if (cl !== "") this.element.classList.remove(cl);
		});
	}

	setPlaceHolder(placeholder) {
		this.element.placeholder = placeholder;
	}

	setColumns(columns) {
		this.element.cols = columns;
	}

	setRows(rows) {
		this.element.rows = rows;
	}

	setValue(value) {
		this.element.value = value;
	}

	clearValue(value = "") {
		this.element.value = value;
	}

	setInnerText(text) {
		this.element.innerText = text;
	}

	setInnerHTML(innerHTML) {
		this.element.innerHTML = innerHTML;
	}

	style(declaration) {
		this.element.style.cssText = declaration;
	}
}

export default CreateElement;
