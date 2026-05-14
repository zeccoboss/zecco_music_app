import { appConfig } from "@zecco/config/app.config";

const appName = appConfig.APP_NAME;

const titles = {
	"/": `Home — ${appName}`,
	"/library": `Library — ${appName}`,
	"/search": `Search — ${appName}`,
	"/upload": `Upload — ${appName}`,
	"/settings": `Settings — ${appName}`,
	"/dashboard": `Dashboard — ${appName}`,
};

export const titleUpdater = async (ctx, next) => {
	await next();
	const title = titles[ctx.path];
	if (title) {
		document.title = title;
		return;
	}
	// dynamic routes like /profile/:username
	const segment = ctx.path.split("/").filter(Boolean)[0] ?? "";
	document.title = segment
		? `${segment.charAt(0).toUpperCase() + segment.slice(1)} — ${appName}`
		: `${appName}`;
};
