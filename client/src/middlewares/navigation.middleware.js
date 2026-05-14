import { getMultiTags } from "@zecco/helpers/dom-helper";

export const activeLinkSwitcher = async (ctx, next) => {
	const links = getMultiTags("[data-nav-link]");
	for (const link of links) link.classList.remove("active-nav");

	// Use ctx.path which the router already cleaned of query params
	const cleanPath =
		ctx.path.endsWith("/") && ctx.path !== "/"
			? ctx.path.slice(0, -1)
			: ctx.path;

	const activeLink = document.querySelector(`[data-nav-link="${cleanPath}"]`);
	activeLink?.classList.add("active-nav");

	await next();
};
