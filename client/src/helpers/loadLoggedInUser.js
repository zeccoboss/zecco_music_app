import { getUserProfile } from "../services/getUserProfile.js";

const loadLoggedInUser = async (token) => {
	const axiosDetails = await getUserProfile("/profile", token);

	console.log("User: ".userProfile);
};

export default loadLoggedInUser;
