class CreateElement {
	constructor(elementName, innerText, innerHTML) {
		const element = document.createElement(`${elementName}`);
		this.element = element;
		this.element.innerHTML = innerHTML ? innerHTML : "";
		this.element.innerText = innerText ? innerText : "";
	}

	append(elArray) {
		this.element.append(...Array.from(elArray));
	}

	addEvent(eventType, eventFunction) {
		this.element.addEventListener(`${eventType}`, eventFunction);
	}

	getElement() {
		return this.element;
	}

	getChild(selector, flag) {
		if (flag === "id") {
			return selector.includes(".")
				? this.element.querySelector(`${selector}`)
				: this.element.querySelector(`#${selector}`);
		} else if (flag === "class") {
			return selector.includes(".")
				? this.element.querySelector(`${selector}`)
				: this.element.querySelector(`.${selector}`);
		} else if (flag === "el") {
			return this.element.querySelector(`${selector}`);
		} else {
			return console.error(`[Flag]: "${flag}" not valid a valid flag`);
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
			return console.error(`[Flag]: ${flag} not valid`);
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

	addClass(
		classNameOne,
		classNameTwo,
		classNameThree,
		classNameFour,
		classNameFive
	) {
		this.element.classList.add(
			classNameOne,
			!classNameTwo ? (classNameTwo = classNameOne) : classNameTwo,
			!classNameThree ? (classNameThree = classNameOne) : classNameThree,
			!classNameFour ? (classNameFour = classNameOne) : classNameFour,
			!classNameFive ? (classNameFive = classNameOne) : classNameFive
		);
	}

	removeClass(className) {
		this.element.classList.remove(className);
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
