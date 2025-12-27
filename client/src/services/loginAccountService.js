import axios from "axios";

const loginAccountService = async (url, data) => {
	try {
		const res = await axios.post(url, data);
		return { data: res.data, status: res.status, message: res.message };
	} catch (error) {
		return { message: error.message, status: error.status };
	}
};

export { loginAccountService };
