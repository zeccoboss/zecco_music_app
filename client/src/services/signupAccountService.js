import axios from "axios";

const signupAccountService = async (url, data) => {
	try {
		const res = await axios.post(url, data);
		if (!res.ok) throw new Error("Could not process request");

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.error(error);
		return { message: "Signup failed!" };
	}
};

export { signupAccountService };
