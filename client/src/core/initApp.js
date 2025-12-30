import { headerEvent } from "../events/headerEvents.js";
import {
	preventFormBehaviour,
	preventLinksBehaviour,
} from "../events/preventPageRefresh.js";
import { router } from "../routes/router.js";
import { validateLogin } from "../validators/validateLogin.js";
import { validateRegister } from "../validators/validateRegister.js";

const initApp = async (message) => {
	console.log(message);

	router(); // Start the route on page load

	preventLinksBehaviour(); // Stop page refresh when any link is clicked
	preventFormBehaviour(); // Stop page refresh on submiting form

	await validateLogin(); // Handle user login
	await validateRegister(); // Handle user signup

	headerEvent();
};

export { initApp };
