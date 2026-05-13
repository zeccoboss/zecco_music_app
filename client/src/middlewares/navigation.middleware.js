import { getMultiTags } from "@zecco/helpers/dom-helper";

export const activeLinkSwitcher = async (ctx, next) => {
	// 1. Get the current path from the router context
	const path = ctx.path;

	// 2. Remove "active-nav" from every link that has the data attribute
	const links = getMultiTags("[data-nav-link]");
	for (const link of links) link.classList.remove("active-nav");

	// 3. Use the CSS selector to find the EXACT link matching this URL
	const activeLink = document.querySelector(`[data-nav-link="${path}"]`);

	// 4. Add the class if a match was found (the ?. prevents errors if no link exists)
	activeLink?.classList.add("active-nav");

	await next();
};
