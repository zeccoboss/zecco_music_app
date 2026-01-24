import axios from "axios";
import appConfig from "../config/AppConfig.js";

async function getUserProfile(path, token) {
	const url = new URL(path, appConfig.apiUrl);
	axios.defaults.withCredentials = true;
	try {
		const res = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		console.log(error.response);
		return (
			error.response ?? {
				status: 500,
				data: { error: "Network error" },
			}
		);
	}
}

export { getUserProfile };
