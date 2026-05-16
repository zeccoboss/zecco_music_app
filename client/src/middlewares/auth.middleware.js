//

import { router } from "@zecco/routes/router";
import { readFromLocalStorage } from "@zecco/services/storage/local-storage";

export const authRedirect = async (ctx, next) => {
	const protectedRoutes = ["/uploads", "/settings", "/profile"]; // Add more protected routes as needed
	const isProtected = protectedRoutes.some((r) => ctx.path.startsWith(r));
	const getUser = () => readFromLocalStorage("user");

	if (isProtected && !getUser()) {
		// Pass the redirect route directly into next() to let the router handle it cleanly
		await next(`/auth/login?redirect=${encodeURIComponent(ctx.path)}`);
		return;
	}
	await next();
};
