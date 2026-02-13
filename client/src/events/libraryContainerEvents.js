import { getMultiTags, getTag } from "../helpers/selectElement";
import { mobileHeaderInstance } from "../layouts/MobileHeader";

const libraryContainerEvents = (libraryContainer) => {
	// Make an anonymous function so it will run first on lot not to break layout
	const libraryBtnsCtn = (() => {
		return (
			mobileHeaderInstance.getChild(".library_btns_ctn") ||
			libraryContainer.getChild(".library_btns_ctn")
		);
	})();

	libraryContainer.addEvent("click", (e) => {
		// Get the closest target if bubbling matches
		const closest = (name, event = e) => {
			return !!event.target.closest(name); // Return boolean
		};

		switch (true) {
			case closest(".uploaded_tab"):
				console.log("Liked tab ");
				break;
			case closest(".liked_tab"):
				console.log("liked tab");
				break;
			case closest(".recent-play_tab"):
				console.log("recently play tab tab");
				break;
			case closest(".lib_playlist_card"):
				console.log("uploaded tab");
				break;
			case closest(".lib_artist_card"):
				console.log("uploaded tab");
				break;
		}
	});

	libraryBtnsCtn.addEventListener("click", (e) => {
		// Get the closest target if bubbling matches
		function matches(name, event = e) {
			return !!event.target.matches(name); // Return boolean
		}

		// Select elements
		const librarySections = libraryContainer.getChildren(".lib_secs");
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
