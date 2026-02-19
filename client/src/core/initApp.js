// biome-ignore assist/source/organizeImports: <Might fix later>
import { headerEvent } from "../events/headerEvents.js";
import { preventLinksBehavior } from "../events/preventPageRefresh.js";
import { router } from "../routes/router.js";
import { themeManager } from "./themeManager.js";
import { sidebarHandler } from "../events/sidebarHandler.js";
import { mobileScreen } from "./screenBreakPoints.js";
import { globalEventHandler } from "../events/globalEventHandler.js";

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
