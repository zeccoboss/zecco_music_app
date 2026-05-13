/** biome-ignore-all assist/source/organizeImports: <I know where they're from> */
import {
	bigScreen,
	largeScreen,
	mobileScreen,
} from "./core/screen-break-points";
import { rebuildLayout, setCurrentScreen } from "./layouts/buildLayout";
import { router } from "./routes/router";
import { applyMiddleware } from "./middlewares";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/base.css";
import "./styles/media.css";
import "./styles/auth-shared.mobile.css";
import "./styles/auth-shared.desktop.css";

const bootstrap = async () => {
	const screen = mobileScreen.matches
		? "mobile"
		: bigScreen.matches
			? "big"
			: "large";

	setCurrentScreen(screen);

	await rebuildLayout(screen);
	// ── For middleware initialization and start up ───────────────────────────────────
	applyMiddleware();

	const onBreakpointChange = (newScreen) => async (e) => {
		if (!e.matches) return;

		setCurrentScreen(newScreen);

		await rebuildLayout(newScreen);

		router.replace(location.pathname + location.search);
	};

	mobileScreen.addEventListener("change", onBreakpointChange("mobile"));
	bigScreen.addEventListener("change", onBreakpointChange("big"));
	largeScreen.addEventListener("change", onBreakpointChange("large"));
};

bootstrap();
