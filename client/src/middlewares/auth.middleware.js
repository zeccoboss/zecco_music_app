//

import { appConfig } from "@zecco/config/app.config";
import { router } from "@zecco/routes/router";
import { readFromLocalStorage } from "@zecco/services/storage/local-storage";
import { store } from "@zecco/store/store";

export const authRedirect = async (ctx, next) => {
	const protectedRoutes = appConfig.PROTECTED_ROUTES; // Get the list of protected routes from the app configuration

	// Check if the current path starts with any of the protected routes (e.g., "/dashboard", "/profile", etc.)
	const isProtected = protectedRoutes.some((r) => ctx.path.startsWith(r));

	//
	const getUser = () => store.token;

	if (isProtected && !getUser()) {
		// Pass the redirect route directly into next() to let the router handle it cleanly
		await next(`/auth/login?redirect=${encodeURIComponent(ctx.path)}`);
		return;
	}
	await next();
};
