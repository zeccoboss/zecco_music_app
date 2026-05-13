const showSubSection = (container, options = {}) => {
	if (!container) {
		console.warn("[ShowSubSection]: container not provided");
		return;
	}

	const { id, content } = options;

	// get all sub sections inside THIS container only
	const subSections = container.querySelectorAll(".sub-section");

	if (!subSections.length) {
		console.warn("showSubSection: no sub-sections found in container");
		return;
	}

	// remove active from all
	subSections.forEach((el) => {
		el.classList.remove("active-sub-section");
	});

	let target = null;

	// find by id
	if (id) {
		target = container.querySelector(`#${id}`);
	}

	// fallback: find by data-content
	if (!target && content) {
		target = container.querySelector(
			`.sub-section[data-content="${content}"]`,
		);
	}

	if (!target) {
		console.warn(
			`showSubSection: no matching sub-section found for`,
			options,
		);
		return;
	}

	target.classList.add("active-sub-section");
};

export default showSubSection;
