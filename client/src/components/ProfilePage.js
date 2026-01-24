import CreateElement from "../utils/CreateElement.js";

const ProfileSection = () => {
	const profileSection = new CreateElement("div");

	profileSection.setId("profile-section");
	profileSection.addClass("profile_section");

	const htmlContent = `
      Profile Section
   `;

	profileSection.setInnerHTML(htmlContent);
	return profileSection.getElement();
};

export default ProfileSection;
