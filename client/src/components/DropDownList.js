import CreateElement from "../utils/CreateElement.js";
const defaultContent = `<li>No content passed</li>`;

export function DropDownList(id = "no_content", className = "no_content") {
	const dropDownList = new CreateElement("ul");
	dropDownList.setId(id);
	dropDownList.addClass(className);
	dropDownList.setInnerHTML(defaultContent);
	return dropDownList;
}
