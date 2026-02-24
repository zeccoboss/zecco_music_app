// biome-ignore assist/source/organizeImports: <Might fix later>
import { headerEvent } from "../events/header-events.js";
import { preventLinksBehavior } from "../events/prevent-page-refresh.js";
import { router } from "../routes/router.js";
import { themeManager } from "./theme-manager.js";
import { sidebarHandler } from "../events/sidebar-handler.js";
import { mobileScreen } from "./screen-break-points.js";
import { globalEventHandler } from "../events/global-event-handler.js";

// Core function to connect functionality
const initApp = async (message) => {
	console.log(message);
	router.initRoutes(); // Initializes the routes on page load
	globalEventHandler(); // For the document (managing of modals, popups...)
	preventLinksBehavior(); // Prevent page refresh when an anchor tag is clicked
	headerEvent(); // Add event to the header
	themeManager.init(); // Initialize the application theme
	if (!mobileScreen.matches) sidebarHandler(); // Only call when on larger screen's
};

export { initApp };
