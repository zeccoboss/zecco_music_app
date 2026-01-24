function navigationSpinner(overlay, container, duration, formsToRender = []) {
	formsToRender.forEach((form) => {
		form.render
			? (() => {
					form.element.style.display = "flex";
			  })()
			: (() => {
					form.element.style.display = "none";
			  })();
	});

	setTimeout(() => {
		overlay.classList.remove("show_overlay");
		container.classList.add("show_extra_content");
	}, duration);
}

function navigateHomeSpinner(
	{ extraContent, overlay },
	duration,
	clearExtraLayers
) {
	// overlay.classList.remove("show_overlay");

	setTimeout(() => {
		clearExtraLayers(extraContent, overlay);
		// overlay.classList.remove("show_overlay");
	}, duration);
}

export { navigationSpinner, navigateHomeSpinner };
