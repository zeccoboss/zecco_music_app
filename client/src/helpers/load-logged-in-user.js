import { getUserProfile } from "../services/get-user-profile.js";

const loadLoggedInUser = async (token) => {
	const axiosDetails = await getUserProfile("/profile", token);

	console.log("User: ".userProfile);
};

export default loadLoggedInUser;
