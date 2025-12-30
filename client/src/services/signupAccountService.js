import axios from "axios";

const signupAccountService = async (url, data = {}) => {
	try {
		const res = await axios.post(url, data);
		return res;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};

export { signupAccountService };
