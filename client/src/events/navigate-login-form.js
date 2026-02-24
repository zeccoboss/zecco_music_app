import { Router } from "../routes/router.js";

const navigateLoginForm = (e) => {
	const router = new Router();
	router.navigate(e.currentTarget.getAttribute("href"));
};

export default navigateLoginForm;
