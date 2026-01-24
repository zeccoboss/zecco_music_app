import { headerEvent } from "../events/headerEvents.js";
import { preventLinksBehavior } from "../events/preventPageRefresh.js";
import { router } from "../routes/router.js";

const initApp = async (message) => {
	console.log(message);
	router.initRoutes(); // Initializes the routes on page load
	preventLinksBehavior(); // Prevent page refresh when an anchor tag is clicked
	headerEvent(); // Add event to the header
};

export { initApp };
