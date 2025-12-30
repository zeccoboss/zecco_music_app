import CreateElement from "../utils/CreateElement.js";

const ProfilePage = () => {
	const profilePage = new CreateElement("div");

	profilePage.setId("profile-page");
	profilePage.addClass("profile_page");

	const htmlContent = `
      Profile Page
   `;

	profilePage.setInnerHTML(htmlContent);

	return profilePage.getElement();
};

export default ProfilePage;
