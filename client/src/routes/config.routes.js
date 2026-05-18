// ============================================================
/** biome-ignore-all assist/source/organizeImports: <To organize imports> */
//  config.routes.js
//
//  Route table for the SoniqStream SPA.
//
//  Outlet rules:
//    "main"  (default) — rendered inside <main> within the layout shell
//    "root"            — rendered into #app, covers full viewport
//                        Use for: auth pages, 404, verification
//
//  Guard values:
//    "auth"  — user must be logged in (setAuthChecker returns truthy)
//    "admin" — user must have role "admin"
//
//  Lazy loading:
//    Set lazy: true and component: () => import("./Page.js")
//    The module is not loaded until the user first visits.
// ============================================================

export const routes = [
	// ── Public pages — rendered into <main> ──────────────────
	{
		path: "/",
		component: import("@zecco/pages/Home/HomePage.js"),
		// outlet: "main" is the default — no need to specify
	},
	{
		path: "/search",
		component: import("@zecco/pages/Search/SearchPage.js"),
	},
	{
		path: "/library",
		component: import("@zecco/pages/Library/LibraryPage.js"),
		guard: "auth",
	},

	// ── Auth-guarded pages ───────────────────────────────────

	{
		path: "/uploads",
		component: import("@zecco/pages/Upload/UploadPage.js"),
		guard: "auth",
	},
	{
		path: "/settings",
		component: import("@zecco/pages/Settings/SettingsPage.js"),
		guard: "auth",
	},
	{
		// /profile/zeccoboss → ctx.params.username = "zeccoboss"
		path: "/profile",
		component: import("@zecco/pages/Profile/ProfilePage.js"),
		guard: "auth",
	},

	// ── Auth pages — rendered into #app root ─────────────────
	// These cover the full viewport on top of the layout shell.
	// They use outlet: "root" so the sidebar/footer stay in the DOM
	// but are hidden behind the auth page (z-index / position: fixed).

	{
		path: "/auth/login",
		component: import("@zecco/pages/Login/LoginPage.js"),
		outlet: "root",
	},
	{
		// Register is a single page that manages its own 3-step flow
		// internally — no child routes needed.
		path: "/auth/register",
		component: import("@zecco/pages/Register/RegisterPage.js"),
		outlet: "root",
	},
	{
		// Forgot password — manages its own 5-step flow internally.
		path: "/auth/forgot-password",
		component: import("@zecco/pages/Password/PasswordPage.js"),
		outlet: "root",
	},
	{
		// Shared verification page — handles both email verify
		// and password reset tokens via ?type=register|reset query param.
		path: "/auth/verify-reset",
		component: import("@zecco/pages/Verification/VerificationPage.js"),
		outlet: "root",
	},

	{
		// Shared verification page — handles both email verify
		// and password reset tokens via ?type=register|reset query param.
		path: "/auth/verify",
		component: import("@zecco/pages/Verification/VerificationPage.js"),
		outlet: "root",
	},

	// ── Lazy-loaded pages ────────────────────────────────────
	// Module not loaded until first visit.

	{
		path: "/admin",
		guard: "admin",
		lazy: true,
		component: () => import("@zecco/pages/Admin/AdminPage.js"),
	},
];
