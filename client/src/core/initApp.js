import { handleLogin } from "../events/handleLogin.js";
import { handleSignup } from "../events/handleSignup.js";
import {
	preventFormBehaviour,
	preventLinksBehaviour,
} from "../events/preventPageRefresh.js";
import { router } from "../routes/router.js";

const initApp = async (message) => {
	console.log(message);

	router(); // Start the route on page load

	preventLinksBehaviour(); // Stop page refresh when any link is clicked
	preventFormBehaviour(); // Stop page refresh on submiting form

	await handleLogin(); // Handle user login
	await handleSignup(); // Handle user signup
};

export { initApp };
