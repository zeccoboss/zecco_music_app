import { networkHandler } from "@zecco/core/network-handler";

export const networkGuard = async (ctx, next) => {
	networkHandler.init();
	console.log(networkHandler.getStatus());

	// if (!navigator.onLine && ctx.path !== "/") {
	// 	const { OfflineView } =
	// 		await import("@zecco/components/OfflineView/OfflineView.js");
	// 	const outlet =
	// 		document.getElementById("main") ??
	// 		document.getElementById("mobile-main");
	// 	outlet?.replaceChildren(OfflineView());
	// 	return;
	// }
	await next();
};
