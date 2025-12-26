import axios from "axios";

const loginAccountService = async (url, data) => {
	try {
		const res = await axios.post(url, data);
		return res.data;
	} catch (error) {
		console.error(error);
		return { message: "login failed!" };
	}
};

export { loginAccountService };
