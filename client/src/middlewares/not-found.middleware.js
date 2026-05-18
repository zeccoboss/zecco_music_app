// Middleware function to handle unmatched routes (404 Not Found)
export const notFound = async (ctx) => {
	// Dynamically import the NotFoundPage component when a route is not found. This keeps the initial bundle smaller and only loads the 404 page when needed.
	const { NotFoundPage } =
		await import("@zecco/pages/NotFound/NotFoundPage.js");

	// We return the NotFoundPage component to be rendered in the outlet. The router will handle rendering it in the correct place.
	return NotFoundPage(ctx);
};
