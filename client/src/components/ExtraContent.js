import LoginForm from "../fragments/LoginForm.js";
import SignpForm from "../fragments/SignupForm.js";
import CreateElement from "../utils/CreateElement.js";

const ExtraContent = () => {
	const extraContent = new CreateElement("div");

	extraContent.setId("extra-content");
	extraContent.addClass("extra_content");

	extraContent.getElement().append(LoginForm(), SignpForm());

	return extraContent.getElement();
};

export default ExtraContent;
