import axios from "axios";
import appConfig from "../config/app-config.js";

const audioService = async (path, data = {}) => {
	const url = new URL(path, appConfig.apiUrl);
	axios.defaults.withCredentials = true;

	try {
		const res = await axios.get(url, appConfig.apiUrl);
		res.failed = false;
		return res;
	} catch (error) {
		console.log(error.message);
		return {
			status: 500,
			error: "Network error",
			failed: true,
		};
	}
};

export { audioService };
