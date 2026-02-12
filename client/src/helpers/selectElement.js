function getTag(selector) {
	if (typeof selector === "string")
		return document.querySelector(`${selector}`);
}

function getMultiTags(selector, flag) {
	if (typeof selector === "string")
		return document.querySelectorAll(`${selector}`);
}

export { getTag, getMultiTags };
