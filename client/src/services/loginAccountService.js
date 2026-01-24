import axios from "axios";
import appConfig from "../config/AppConfig.js";

const loginAccountService = async (path, data = {}) => {
	const url = new URL(path, appConfig.apiUrl);
	axios.defaults.withCredentials = true;

	try {
		const res = await axios.post(url, data);
		return res;
	} catch (error) {
		console.log(error.response.data);
		return (
			error.response ?? {
				status: 500,
				data: { error: "Network error" },
			}
		);
	}
};

export { loginAccountService };
