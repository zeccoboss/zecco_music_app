//

import { router } from "@zecco/routes/router";
import { readFromLocalStorage } from "@zecco/services/storage/local-storage";

// auth.middleware.js
export const authRedirect = async (ctx, next) => {
	const protectedRoutes = ["/uploads", "/settings", "/profile"]; // Corrected path
	const isProtected = protectedRoutes.some((r) => ctx.path.startsWith(r));
	const getUser = () => readFromLocalStorage("user");

	if (isProtected && !getUser()) {
		// Instead of just returning, trigger a replacement to login
		router.replace(`/auth/login?redirect=${ctx.path}`);
		return; // Exit this specific chain execution
	}
	await next();
};
