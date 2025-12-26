import axios from "axios";

const signupAccountService = async (url, data) => {
	try {
		const res = await axios.post(url, data);
		if (res.status === 409) {
			throw new Error("User alredy exist");
		}
		return res.data;
	} catch (error) {
		console.error(error);
		return { message: error.message };
	}
};

export { signupAccountService };
