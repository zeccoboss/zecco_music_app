// ============================================================
//  buildLayout.js
//
//  Builds the static layout shell for the current screen.
//  Returns a DocumentFragment as the shell so #app in index.html
//  stays as the grid container — no duplicate #app elements.
//
//  main.js does:
//    const { shell, main } = await buildLayout(screen);
//    app.replaceChildren(shell);   // Fragment children go into #app
//    router.addOutlet("main", main);
//
//  Returns { shell: DocumentFragment, main: Element }:
//    shell → fragment containing sidebar + main + footer
//    main  → the empty <main> element (router outlet "main")
//
//  Auth pages render into outlet "root" (#app itself) — they
//  replace #app's children entirely via router.replaceChildren.
//  When navigating back, rebuildLayout restores the shell.
// ============================================================

import { router } from "@zecco/routes/router";
import Aside from "./Aside/Aside";
import FooterDesktop from "./Footer/FooterDesktop";
import FooterMobile from "./Footer/FooterMobile";
import MainDesktop from "./Main/MainDesktop";
import { MainMobile } from "./Main/MainMobile";
import { MiniPlayer } from "./MniPlayer/MiniPlayer";
import Overlay from "./Overlay/Overlay";

// import { MainDesktop } from "./Main/MainDesktop.js";
// import { MainMobile } from "./Main/MainMobile.js";
// import { Aside } from "./Aside/Aside.js";
// import { FooterDesktop } from "./Footer/FooterDesktop.js";
// import { FooterMobile } from "./Footer/FooterMobile.js";

// ── Desktop layout ──────────────────────────────────────────
//
//  #app (stays in index.html — CSS grid container)
//    ├── <aside id="sidebar">       ← Aside()
//    ├── <main  id="main">          ← MainDesktop() ← router outlet
//    └── <footer id="footer">       ← FooterDesktop()
//
//  base.css #app grid:
//    grid-template-areas: "sidebar main" / "sidebar player"

const buildDesktopLayout = async () => {
	const [aside, main, footer] = await Promise.all([
		Promise.resolve(Aside()),
		Promise.resolve(MainDesktop()),
		Promise.resolve(FooterDesktop()),
	]);

	const shell = document.createDocumentFragment();
	shell.append(aside, main, footer);

	return { shell, main };
};

// ── Mobile layout ───────────────────────────────────────────
//
//  #app (stays in index.html — CSS grid container)
//    ├── <main id="mobile-main">    ← MainMobile()  ← router outlet
//    ├── <section id="mini-player">   ← MiniPlayer()
//    └── <footer id="footer">       ← FooterMobile()
//
//
//  media.css #app mobile grid:
//    grid-template-areas: "main" / "mini-player" / "footer"

const buildMobileLayout = async () => {
	const [main, miniPlayer, footer] = await Promise.all([
		Promise.resolve(MainMobile()),
		Promise.resolve(MiniPlayer()),
		Promise.resolve(FooterMobile()),
	]);

	const shell = document.createDocumentFragment();
	shell.append(main, miniPlayer, footer);

	return { shell, main };
};

// ── Public API ──────────────────────────────────────────────

/**
 * Build the app layout shell for the given screen size.
 *
 * Async throughout — factories may fetch session data, theme
 * preferences, or load assets before returning their nodes.
 * Promise.all inside each builder keeps concurrent factories
 * from blocking each other.
 *
 * @param {"mobile"|"big"|"large"} screen
 * @returns {Promise<{ shell: DocumentFragment, main: Element }>}
 */
export const buildLayout = async (screen) => {
	try {
		return screen === "mobile"
			? await buildMobileLayout()
			: await buildDesktopLayout();
	} catch (err) {
		console.error("[buildLayout] Failed:", err);

		// Minimal fallback — router still gets a valid outlet
		const shell = document.createDocumentFragment();
		const main = document.createElement("main");
		main.id = "main";
		shell.append(main);
		return { shell, main };
	}
};

export const rebuildLayout = async (screen) => {
	const overlay = Overlay();

	const app = document.getElementById("app");
	const { shell, main } = await buildLayout(screen);
	app.replaceChildren(overlay, shell);
	router.addOutlet("main", main);
};

// To keep screen layout
let currentScreen = "large";

export const setCurrentScreen = (screen) => {
	currentScreen = screen;
};

export const getCurrentScreen = () => currentScreen;
