import axios from "axios";

const signupAccountService = async (url, data) => {
	try {
		const res = await axios.post(url, data);
		// return res.data;
		return { data: res.data, status: res.status, message: res.message };
	} catch (error) {
		return { status: error.status, message: error.message };
	}
};

export { signupAccountService };
