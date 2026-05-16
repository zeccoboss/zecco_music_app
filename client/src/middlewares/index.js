/** biome-ignore-all assist/source/organizeImports: <Not intentional for not sorting import> */
import { getTag } from "@zecco/helpers/dom-helper.js";
import { routes } from "@zecco/routes/config.routes";
import { readFromLocalStorage } from "@zecco/services/storage/local-storage.js";
import { networkGuard } from "./network.middleware";
import { authRedirect } from "./auth.middleware";
import { loadingIndicator } from "./loading.middleware";
import { titleUpdater } from "./title.middleware";
import { scrollRestoration } from "./scroll.middleware";
import { analyticsLogger } from "./analytics.middleware";
import { layoutSwitcher } from "./layout.middleware";
import { router } from "@zecco/routes/router.js";
import { buildLayout, getCurrentScreen } from "@zecco/layouts/buildLayout";
import { activeLinkSwitcher } from "./navigation.middleware";
import { toast } from "@zecco/components/Toast/Toast.js";

export const applyMiddleware = () => {
	router
		.register(routes)
		.setNotFound(notFound)
		.use(networkGuard)
		.setAuthChecker(() => readFromLocalStorage("user"))
		.setGuardRejectHandler(({ path }) => {
			toast({
				message: "You need to be logged in to access that page.",
				type: "warning",
				duration: 4000,
			});
		})
		.addOutlet("root", getTag("#app"))
		.setLayoutBuilder(() => buildLayout(getCurrentScreen()))
		.use(activeLinkSwitcher)
		.use(layoutSwitcher)
		.use(authRedirect)
		.use(loadingIndicator)
		.use(scrollRestoration)
		.use(titleUpdater)
		.use(analyticsLogger)

		.init();
};

const notFound = async (ctx) => {
	const { NotFoundPage } =
		await import("@zecco/pages/NotFound/NotFoundPage.js");

	return NotFoundPage(ctx);
};
