import { routes } from "./routesConfig";

class Router {
	// Define routes
	#routes = routes;

	#navigate(path, fromPopstate = false) {
		let matched = false; // keep

		// Loop through routes
		for (const route of this.#routes) {
			const match = path.match(route.pattern); // Access route that matches route

			// When theres a match call its handler
			if (match) {
				// Call and if token avai	lable pass it to the handler
				route.handler({ token: match[1] ?? match[2] ?? match[3] });
				matched = true; // Resign matched to true
				break; // Exit if match available
			}
		}

		// Check and call the 404 handler
		if (!matched) {
			const noResourceRoute = routes.find((r) => r.pattern === 404);
			noResourceRoute.handler();
		}

		if (!fromPopstate) {
			history.pushState({}, "", path); // Push the path to history the buttons navigation's
		}
	}

	#handleLocation() {
		const path = window.location.pathname;
		this.#navigate(path);
	}

	initRoutes() {
		window.onpopstate = () => this.#handleLocation(); // For back/forwards button
		this.#handleLocation(); //
	}

	// Keep track of navigation history
	navigateTo(path) {
		this.#navigate(path, false);
	}
}

// Create an instance to give out
const router = new Router();

export { router };
