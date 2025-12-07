import CreateElement from "../utils/CreateElement.js";

const ExtraContent = () => {
	const extraContent = new CreateElement("div");

	extraContent.setId("extra-content");
	extraContent.addClass("extra_content");

	extraContent.setInnerHTML("<h2>Extra Content</h2>");

	return extraContent.getElement();
};

export default ExtraContent;
