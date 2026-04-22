import CreateElement from "../../utils/create-element";

const MobilePasswordPage = () => {
	const page = new CreateElement("div");

	page
		.addClass("forgot-password-page", "mobile-form-page", "app-page")
		.setId("forgot-password-page").innerHTML = `
		
		An email has been sent to example@example.com
	`;

	return page.getElement();
};
export { MobilePasswordPage };
