import CreateElement from "../utils/CreateElement.js";

const ProfileSection = () => {
	// Create element
	const profileSection = new CreateElement("section");

	// Set attributes
	profileSection.addClass("profile_section", "main_sections");
	profileSection.setId("profile-section");

	profileSection.innerHTML = `
		<div class="recent_search_container">
			<p>No user yet...</p>
		</div>
	`;

	//
	return profileSection.getElement();
};

export default ProfileSection;
