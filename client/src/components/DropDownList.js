import CreateElement from "../utils/CreateElement.js";
const defaultContent = `<li>No content passed</li>`;

const DropDownList = (id = "no_content", className = "no_content") => {
	const dropDownList = new CreateElement("ul");
	dropDownList.setId(id);
	dropDownList.addClass(className);
	dropDownList.innerHTML = defaultContent;
	return dropDownList;
};

export { DropDownList };
