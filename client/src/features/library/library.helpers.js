const filterLibraryContent = (tab) => {
	const sections = {
		liked: document.querySelector("#lib-liked-section"),
		uploaded: document.querySelector("#lib-uploads-section"),
		playlists: document.querySelector("#lib-playlists-section"),
		following: document.querySelector("#lib-following-section"),
		recent: document.querySelector("#lib-recent-section"),
	};

	const visibleSections = Object.values(sections).filter(Boolean);
	if (visibleSections.length === 0) return;

	visibleSections.forEach((section) => {
		section.style.display = "none";
	});

	if (tab !== "all" && sections[tab]) {
		sections[tab].style.display = "block";
	} else {
		visibleSections.forEach((section) => {
			section.style.display = "block";
		});
	}
};

export { filterLibraryContent };
