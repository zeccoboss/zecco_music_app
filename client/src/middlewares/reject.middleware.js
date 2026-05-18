import toast from "@zecco/components/Toast/Toast";
import { appConfig } from "@zecco/config/app.config";

const capitalizeFirstLetter = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const rejectMiddleware = ({ path }) => {
	console.log(path);

	const page = path.split("/")[1]; // Get the first segment of the path to determine which page the user is trying to access

	console.log("Page:", page);

	const protectedPages = appConfig.PROTECTED_ROUTES.map(
		(route) => route.split("/")[1],
	); // Get the first segment of each protected route

	console.log("Protected Pages:", protectedPages);
	log("Attempting to access page:", page);

	// If the user is trying to access a protected page (e.g., "dashboard", "profile", etc.) without being authenticated, show a toast notification
	if (protectedPages.includes(page)) {
		toast({
			message: `You must be logged in to access the /${capitalizeFirstLetter(page)} page.`,
			type: "warning",
			duration: 4000,
		});
	}
};
