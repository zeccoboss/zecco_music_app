function navigationSpinner(overlay, container, duration, formsToRender = []) {
	console.log(formsToRender[0].form);

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

export { navigationSpinner };
