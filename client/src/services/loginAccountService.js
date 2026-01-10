import axios from "axios";
import { API } from "../config/apiConfig";

const loginAccountService = async (path, data = {}) => {
	const base = API.DEV_URL;
	const url = new URL(path, base);
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
