import { navigationSpinner } from "../helpers/loading-spinner.js";
import { Router } from "../routes/router.js";

const navigateRegisterForm = (e) => {
	const router = new Router();
	router.navigate(e.getAttribute("href"));
};

export default navigateRegisterForm;
