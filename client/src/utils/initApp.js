import { preventLinksBehaviour } from "../events/preventLinksBehaviour.js";
import { router } from "../routes/router.js";

const initApp = (message) => {
	console.log(message);

	router();
	preventLinksBehaviour();
};

export { initApp };
