export const authRedirect = async (ctx, next) => {
	const protectedRoutes = ["/upload", "/settings", "/profile"];
	const isProtected = protectedRoutes.some((r) => ctx.path.startsWith(r));
	const getUser = () => null;

	if (isProtected && !getUser()) {
		// save where they were trying to go
		// router.navigate(`/auth/login?redirect=${ctx.path}`); // TODO: Uncomment this line later
		return; // don't call next() — blocks navigation
	}
	await next();
};
