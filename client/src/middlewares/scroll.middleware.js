// middlewares/scroll.middleware.js

import { getTag } from "@zecco/helpers/dom-helper";

// Local map to store { "/path": scrollTopValue }
const scrollPositions = new Map();

// Track the path we are currently ON so we know where to save the scroll
// when the user triggers a navigation to a NEW path.
let lastPath = window.location.pathname;

export const scrollRestoration = async (ctx, next) => {
	// 1. Identify the scrollable container
	const container = getTag("#main") ?? getTag("#mobile-main");

	// 2. SAVE: Before the new page renders, save the scroll of the path we are LEAVING
	if (container) {
		scrollPositions.set(lastPath, container.scrollTop);
	}

	// 3. RENDER: Wait for the router to finish rendering the new component
	await next();

	// 4. RESTORE: Now that the new DOM is in place, update our tracker and restore scroll
	lastPath = ctx.path;
	const savedScroll = scrollPositions.get(ctx.path) ?? 0;

	if (container) {
		// We use requestAnimationFrame to ensure the browser has finished
		// the "paint" of the new content before we try to scroll it.
		requestAnimationFrame(() => {
			container.scrollTop = savedScroll;
		});
	}
};
