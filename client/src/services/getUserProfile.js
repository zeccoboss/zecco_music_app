import axios from "axios";
import { API } from "../config/apiConfig";

async function getUserProfile(path, token) {
	const base = API.BASE_URL;
	const url = new URL(path, base);
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
