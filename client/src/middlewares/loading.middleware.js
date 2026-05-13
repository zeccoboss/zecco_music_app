export const loadingIndicator = async (ctx, next) => {
	document.body.classList.add("route-loading");
	// your CSS shows a top progress bar on this class
	await next();
	document.body.classList.remove("route-loading");
};
