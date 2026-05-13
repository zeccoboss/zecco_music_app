export const analyticsLogger = async (ctx, next) => {
	const start = performance.now();
	await next();
	const duration = performance.now() - start;

	console.log(`[Nav] ${ctx.path} rendered in ${duration.toFixed(1)}ms`);
	// later: send to your analytics service
};
