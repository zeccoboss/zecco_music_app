import { mobileScreen } from "@zecco/core/screen-break-points";
import { SearchDesktop } from "./SearchDesktop";
import { SearchMobile } from "./SearchMobile";

/**
 * SearchPage — Main search router component
 * Handles state management, responsive switching, and event binding
 *
 * @async
 * @param {Object} ctx - Router context with query params
 * @returns {Promise<Element>} The search page element with __onUnmount lifecycle
 */
export const SearchPage = async (ctx) => {
	const root = document.createElement("section");
	root.className = "search-page";

	let state = "idle"; // idle | searching | results | no-results | error
	let isMounted = true;
	let controller = null; // For request cancellation

	/**
	 * Render the appropriate UI based on screen size
	 */
	const renderView = async () => {
		if (!isMounted) return;

		const isMobile = mobileScreen.matches;
		const UIComponent = isMobile ? SearchMobile : SearchDesktop;

		// Call async component
		const view = await UIComponent({
			state,
			ctx,
		});

		if (!isMounted) return;

		// Replace DOM
		root.replaceChildren(view);
	};

	/**
	 * Perform search (replace with real API call)
	 */
	const performSearch = async (query) => {
		try {
			if (!isMounted || !query.trim()) {
				state = "idle";
				await renderView();
				return;
			}

			state = "searching";
			await renderView();

			// TODO: Replace with real API call
			// Example: const results = await searchMusic(query, { signal: controller?.signal });
			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (!isMounted) return;

			// TODO: Check if results exist
			state = "results"; // or "no-results"
			await renderView();
		} catch (error) {
			if (error?.name !== "AbortError" && isMounted) {
				console.error("[SearchPage] Search error:", error);
				state = "error";
				await renderView();
			}
		}
	};

	// ── Initial render (idle state) ──
	await renderView();

	// ── Lifecycle cleanup ──
	root.__onUnmount = () => {
		isMounted = false;
		controller?.abort(); // Cancel in-flight requests
	};

	return root;
};

export default SearchPage;
