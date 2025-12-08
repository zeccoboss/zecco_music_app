import {
	preventFormBehaviour,
	preventLinksBehaviour,
} from "../events/preventPageRefresh.js";
import { router } from "../routes/router.js";

const initApp = (message) => {
	console.log(message);

	router();
	preventLinksBehaviour();
	preventFormBehaviour();
};

export { initApp };
