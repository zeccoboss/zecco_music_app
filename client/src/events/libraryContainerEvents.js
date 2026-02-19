import { closest, matches } from "../helpers/eventDelegationHelpers";
import { getMultiTags, getTag } from "../helpers/selectElement";

const libraryContainerEvents = (libraryContainer) => {
	const header = getTag(".header");
	// Make an anonymous function so it will run first on lot not to break layout
	const libraryBtnsCtn = (() => getTag(".library_btns_ctn"))();

	libraryContainer.addEventListener("click", (e) => {
		switch (true) {
			case closest(".uploaded_tab", e):
				console.log("uploaded tab ");
				break;
			case closest(".liked_tab", e):
				console.log("liked tab");
				break;
			case closest(".recent-play_tab", e):
				console.log("recently play tab tab");
				break;
			case closest(".lib_playlist_card", e):
				console.log("Playlist");
				break;
			case closest(".lib_artist_card", e):
				console.log("Artist");
				break;
		}
	});

	libraryBtnsCtn.addEventListener("click", (e) => {
		// Select elements
		const librarySections = getMultiTags(".lib_secs", libraryContainer);
		const userLibraryTabs = getMultiTags(".lib_card");

		function showTab(identifier) {
			// const uploadTab = getTag("uploaded_tab", "class");
			for (const sec of librarySections) {
				sec.style.display = "block"; // Show all of them case where they've been hidden

				// Loop through sections
				if (!sec.classList.contains("user_library")) {
					sec.style.display = "none"; // Hide the ones that don't match the selector
				}
			}
			// Loop through library tabs
			for (const tab of userLibraryTabs) {
				tab.style.display = "grid"; // Show all of them case where they;ve been hidden
				if (!tab.classList.contains(identifier)) {
					tab.style.display = "none"; // Hide the ones that don't match the selector
				}
			}
		}

		function showSection(identifier) {
			// const uploadTab = getTag("uploaded_tab", "class");
			for (const sec of librarySections) {
				sec.style.display = "block";
				// Loop through sections
				if (!sec.classList.contains(identifier)) {
					sec.style.display = "none"; // Hide the ones that don't match the selector
				}
			}
		}

		// Get the closest target if bubbling matches
		switch (true) {
			case matches(".all_tab_btn"):
				for (const sec of librarySections) sec.style.display = "block"; // Show all sections
				for (const tab of userLibraryTabs) tab.style.display = "grid"; // Show all tabs
				break;
			case matches(".liked_tab_btn"):
				showTab("liked_tab"); // Liked tab
				break;
			case matches(".uploaded_tab_btn"):
				showTab("uploaded_tab"); // Upload tab
				break;
			case matches(".recent_play_tab_btn"):
				showTab("recent_play_tab"); // Recent play tab
				break;
			case matches(".lib_playlists_btn"):
				showSection("lib_playlist_sec"); // Liked playlist
				break;
			case matches(".lib_artist_btn"):
				showSection("lib_artist_sec"); // Liked following
				break;
		}
	});
};

export { libraryContainerEvents };
