// ============================================================
/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <Skipping the return in forEach> */
//  router.js  —  SPA Client-Side Router
//  Rendering : Named outlets  →  outlet.replaceChildren(node)
//  History   : Internal stack + browser History API in sync
//  Lifecycle : node.__onUnmount called before every replacement
// ============================================================

import { getMultiTags } from "@zecco/helpers/dom-helper";

export class Router {
	// ── Private fields ─────────────────────────────────────────
	#routes = [];
	#middlewares = [];
	#outlets = new Map();
	#notFound = null;
	#authChecker = null;

	#scrollPositions = new Map();
	#prefetched = new Set();
	#isNavigating = false;

	#layoutBuilder = null;

	#mounted = new Map();

	// Internal history — parallel to window.history
	// Each entry: { path, index }
	// #historyIndex points at the "current" slot.
	// Invariant: always in sync with what the browser shows.
	#historyStack = [];
	#historyIndex = -1;

	// ============================================================
	//  OUTLETS
	// ============================================================

	/**
	 * Register a named render target.
	 *
	 * Convention:
	 *   "main" → <main> inside the layout shell  (regular pages)
	 *   "root" → #app root element               (auth pages, 404)
	 *
	 * @param {string}  name
	 * @param {Element} node
	 */
	addOutlet(name, node) {
		if (!node) {
			console.warn(`[Router] addOutlet("${name}"): node is null.`);
			return this;
		}
		this.#outlets.set(name, node);
		return this;
	}

	// ============================================================
	//  ROUTE REGISTRATION
	// ============================================================

	/**
	 * Load the full route tree.
	 *
	 * Route shape:
	 *   path      {string}    "/segment" or bare "segment" for children.
	 *                         Prefix ":" for dynamic params — ":username".
	 *   component {Function}  async (ctx) => Node | void
	 *   outlet    {string}    Target outlet name. Default: "main".
	 *   guard     {string}    "auth" | "admin" | omit for public.
	 *   lazy      {boolean}   If true, component = () => import("…").
	 *   children  {Array}     Nested routes (same shape, relative paths).
	 *
	 * @param {Array} routes
	 */
	register(routes) {
		this.#routes = routes;
		return this;
	}

	/**
	 * Register a 404 handler. Should return a Node.
	 * Placed in the "root" outlet automatically.
	 *
	 * @param {Function} handler  async (ctx) => Node | void
	 */
	setNotFound(handler) {
		this.#notFound = handler;
		return this;
	}

	// ============================================================
	//  AUTH
	// ============================================================

	/**
	 * Provide a function that returns the current user or null.
	 * Called fresh on every navigation — never cached.
	 *
	 * @param {Function} fn  () => user | null
	 */
	setAuthChecker(fn) {
		this.#authChecker = fn;
		return this;
	}

	// ============================================================
	//  MIDDLEWARE
	// ============================================================

	/**
	 * Add a global async middleware.
	 * Must call next() to let the navigation continue.
	 * Skipping next() aborts the navigation silently.
	 *
	 * @param {Function} fn  async (ctx, next) => void
	 */
	use(fn) {
		this.#middlewares.push(fn);
		return this;
	}

	// ============================================================
	//  INTERNAL — QUERY PARSING
	// ============================================================

	#parseQuery(searchParams) {
		const query = {};
		for (const [key, raw] of searchParams.entries()) {
			if (raw === "true") {
				query[key] = true;
				continue;
			}
			if (raw === "false") {
				query[key] = false;
				continue;
			}
			const n = Number(raw);
			query[key] = !Number.isNaN(n) && raw.trim() !== "" ? n : raw;
		}
		return query;
	}

	// ============================================================
	//  INTERNAL — ROUTE MATCHING
	// ============================================================

	#match(segments, routes, parentParams = {}, stack = []) {
		for (const route of routes) {
			const routeSegs = route.path.split("/").filter(Boolean);

			if (routeSegs.length > segments.length) continue;

			const matches = routeSegs.every(
				(seg, i) => seg.startsWith(":") || seg === segments[i],
			);
			if (!matches) continue;

			const params = { ...parentParams };
			routeSegs.forEach((seg, i) => {
				if (seg.startsWith(":")) params[seg.slice(1)] = segments[i];
			});

			const remaining = segments.slice(routeSegs.length);
			const nextStack = [...stack, route];

			if (remaining.length === 0) return { stack: nextStack, params };

			if (route.children?.length) {
				const child = this.#match(
					remaining,
					route.children,
					params,
					nextStack,
				);
				if (child) return child;
			}
		}
		return null;
	}

	#syncActiveLinks(currentPath) {
		const links = document.querySelectorAll("[data-nav-link]");
		links.forEach((link) => {
			// Compare href with current path
			if (link.getAttribute("href") === currentPath) {
				link.classList.add("active-nav");
			} else {
				link.classList.remove("active-nav");
			}
		});
	}

	/**
	 * Public route matcher — inspect metadata before navigating.
	 *
	 * @param   {string} path
	 * @returns {{ stack: Array, params: Object } | null}
	 */
	match(path) {
		return this.#match(path.split("/").filter(Boolean), this.#routes);
	}

	// ============================================================
	//  INTERNAL — GUARDS
	// ============================================================

	#runGuards(stack) {
		const user = this.#authChecker?.();
		for (const route of stack) {
			if (!route.guard) continue;
			if (route.guard === "auth" && !user) return false;
			if (route.guard === "admin" && (!user || user.role !== "admin"))
				return false;
		}
		return true;
	}

	// ============================================================
	//  INTERNAL — MIDDLEWARE CHAIN
	// ============================================================

	async #runMiddlewares(ctx) {
		for (const mw of this.#middlewares) {
			let called = false;
			await mw(ctx, () => {
				called = true;
			});
			if (!called) return;
		}
	}

	// ============================================================
	//  INTERNAL — UNMOUNT LIFECYCLE
	// ============================================================

	#unmountCurrent(outletName) {
		const node = this.#mounted.get(outletName);
		if (!node) return;
		try {
			node.__onUnmount?.();
		} catch (err) {
			console.error(`[Router] __onUnmount error ("${outletName}"):`, err);
		}
	}

	// ============================================================
	//  INTERNAL — RENDER PIPELINE
	// ============================================================

	// ============================================================
	//  INTERNAL — RENDER PIPELINE
	// ============================================================

	async #render(stack, ctx) {
		const leaf = stack.at(-1);
		const outletName = leaf.outlet ?? "main";

		// ── 1. LAYOUT & OUTLET SYNC ──────────────────────────────
		// If we are heading to a standard page (usually "main"),
		// we must ensure the layout shell actually exists in the DOM.
		if (outletName !== "root") {
			const mainOutlet = this.#outlets.get("main");
			const rootOutlet = this.#outlets.get("root");

			// If the main outlet was wiped out of the DOM (e.g., by an Auth page),
			// or if it hasn't been registered yet, trigger the layout builder.
			if ((!mainOutlet || !mainOutlet.isConnected) && this.#layoutBuilder) {
				try {
					const { shell, main } = await this.#layoutBuilder();

					// Restore the shell into the root (#app)
					if (rootOutlet) {
						rootOutlet.replaceChildren(shell);
					}

					// Re-register the fresh main outlet so the router knows where to render
					this.addOutlet("main", main);
				} catch (err) {
					console.error("[Router] Failed to rebuild layout shell:", err);
				}
			}
		} else {
			// SAFETY: If we are rendering into "root" (Auth/404),
			// explicitly unmount whatever was in "main" to stop players/timers.
			this.#unmountCurrent("main");
			this.#mounted.delete("main");
		}

		// ── 2. COMPONENT RESOLUTION ──────────────────────────────
		let componentFn = leaf.component;

		// Handle lazy loading if the route is marked as lazy
		if (leaf.lazy) {
			try {
				const mod = await leaf.component();
				componentFn = mod.default ?? mod;
			} catch (err) {
				console.error(
					`[Router] Failed to load lazy component for "${ctx.path}":`,
					err,
				);
				return;
			}
		}

		if (!componentFn) return;

		// Execute the component factory
		const node = await componentFn(ctx);

		if (!node) return;

		if (!(node instanceof Node)) {
			console.warn(
				`[Router] "${ctx.path}" component did not return a DOM Node ` +
					`(got ${typeof node}). Nothing rendered.`,
			);
			return;
		}

		// ── 3. DOM INJECTION & LIFECYCLE ─────────────────────────
		const outlet = this.#outlets.get(outletName);

		if (!outlet) {
			console.warn(
				`[Router] Outlet "${outletName}" not registered. ` +
					`Check your addOutlet() calls or layoutBuilder.`,
			);
			return;
		}

		// Run __onUnmount for the component currently in THIS outlet
		this.#unmountCurrent(outletName);

		// Perform the physical DOM swap
		outlet.replaceChildren(node);

		// Track the new node for future unmounting
		this.#mounted.set(outletName, node);
	}

	// ============================================================
	//  INTERNAL — TRANSITIONS
	// ============================================================

	#startTransition() {
		document.body.classList.add("route-loading");
	}
	#endTransition() {
		document.body.classList.remove("route-loading");
	}

	// ============================================================
	//  INTERNAL — HISTORY STACK
	// ============================================================

	/**
	 * Sync the internal stack with a navigation.
	 *
	 * push    → truncate forward entries, append new path, advance index.
	 * replace → overwrite current slot, index stays put.
	 * pop     → find the path in the existing stack and move the index.
	 *           If not found (direct landing / external nav), rebuild
	 *           from that path.
	 *
	 * @param {string}  path
	 * @param {"push"|"replace"|"pop"} mode
	 */
	#syncHistory(path, mode) {
		if (mode === "replace") {
			// Overwrite current slot — no new entry, no index change.
			if (this.#historyIndex >= 0) {
				this.#historyStack[this.#historyIndex] = path;
			}
			return;
		}

		if (mode === "pop") {
			// Browser back/forward pressed — find where we landed.
			// Search the stack for this path near the current index.
			// We search both directions and pick the nearest hit.
			const curr = this.#historyIndex;
			let found = -1;

			// Prefer searching backwards first (back button is more common).
			for (let i = curr - 1; i >= 0; i--) {
				if (this.#historyStack[i] === path) {
					found = i;
					break;
				}
			}
			if (found === -1) {
				for (let i = curr + 1; i < this.#historyStack.length; i++) {
					if (this.#historyStack[i] === path) {
						found = i;
						break;
					}
				}
			}

			if (found !== -1) {
				this.#historyIndex = found;
			} else {
				// Path not in our stack (user navigated externally or
				// page was a direct landing). Treat as a fresh start.
				this.#historyStack = [path];
				this.#historyIndex = 0;
			}
			return;
		}

		// mode === "push"
		// Truncate any forward entries then append.
		this.#historyStack = this.#historyStack.slice(0, this.#historyIndex + 1);
		this.#historyStack.push(path);
		this.#historyIndex = this.#historyStack.length - 1;
	}

	// ============================================================
	//  INTERNAL — NAVIGATION CORE
	// ============================================================

	/**
	 * @param {string}  url
	 * @param {"push"|"replace"|"pop"} historyMode
	 */
	async #navigate(url, historyMode = "push") {
		const fullUrl = new URL(url, location.origin);
		const path = fullUrl.pathname;
		const segments = path.split("/").filter(Boolean);
		const query = this.#parseQuery(fullUrl.searchParams);

		// Save scroll before leaving current page.
		// Only meaningful for push — replace/pop handle scroll differently.
		if (historyMode === "push") {
			this.#scrollPositions.set(location.pathname, scrollY);
		}

		// ── Match ────────────────────────────────────────────────
		const match = this.#match(segments, this.#routes);

		if (!match) {
			console.warn("[Router] No route matched:", path);

			if (this.#notFound) {
				const ctx = { path, params: {}, query, input: query };
				const node = await this.#notFound(ctx);

				if (node instanceof Node) {
					const outlet = this.#outlets.get("root");
					if (outlet) {
						this.#unmountCurrent("root");
						outlet.replaceChildren(node);
						this.#mounted.set("root", node);
					}
				}
			}

			this.#isNavigating = false;
			return;
		}

		// ── Context ──────────────────────────────────────────────
		const ctx = {
			path,
			params: match.params,
			query,
			input: { ...match.params, ...query },
		};

		// ── Guards ───────────────────────────────────────────────
		if (!this.#runGuards(match.stack)) {
			// Use replace so the blocked URL is not left in history.
			await this.#navigate("/auth/login", "replace");
			return;
		}

		// ── Middlewares ──────────────────────────────────────────
		await this.#runMiddlewares(ctx);

		// ── Transition + render ──────────────────────────────────
		this.#startTransition();
		try {
			await this.#render(match.stack, ctx);
		} catch (err) {
			console.error("[Router] Render error:", err);
		} finally {
			this.#endTransition();
		}

		// ── Browser history API ──────────────────────────────────
		if (historyMode !== "pop") {
			const newUrl = path + fullUrl.search;
			historyMode === "replace"
				? history.replaceState({ path }, "", newUrl)
				: history.pushState({ path }, "", newUrl);
		}

		// ── Internal stack sync ──────────────────────────────────
		this.#syncHistory(path, historyMode);

		// ── Scroll restore ───────────────────────────────────────
		queueMicrotask(() => {
			scrollTo(0, this.#scrollPositions.get(path) ?? 0);
		});

		// this.#syncActiveLinks(path); // TODO: can uncomment later if i choose to ignore middleware
		this.#isNavigating = false;
	}

	/**
	 * Register the async function that builds the shell.
	 * @param {Function} fn - async () => { shell: DocumentFragment, main: Element }
	 */
	setLayoutBuilder(fn) {
		this.#layoutBuilder = fn;
		return this;
	}

	// ============================================================
	//  PUBLIC — NAVIGATE
	// ============================================================

	/**
	 * Navigate to a path. Pushes a new browser history entry.
	 * Ignored while a navigation is already in progress.
	 *
	 * @param {string} path  e.g. "/library?tab=albums"
	 */
	navigate(path) {
		if (this.#isNavigating) return;
		this.#isNavigating = true;
		this.#navigate(path, "push");
	}

	// ============================================================
	//  PUBLIC — REPLACE
	// ============================================================

	/**
	 * Navigate to a path by replacing the current history entry.
	 * The current page is removed from the back-button stack.
	 *
	 * Use after login, after guard redirects, for URL corrections.
	 *
	 * @param {string} path
	 */
	replace(path) {
		if (this.#isNavigating) return;
		this.#isNavigating = true;
		this.#navigate(path, "replace");
	}

	/** Semantic alias for replace(). Signals intent: logic redirect. */
	redirect(path) {
		this.replace(path);
	}

	// ============================================================
	//  PUBLIC — BACK
	// ============================================================

	/**
	 * Go to the previous entry in the router's internal history stack.
	 *
	 * Safer than calling history.back() directly because:
	 *   • Uses the router's own stack — never exits your app.
	 *   • Has a guaranteed fallback when no history exists
	 *     (user landed directly, or opened a fresh tab).
	 *
	 * @param {string} [fallback="/"]  Where to go if no history exists.
	 *
	 * @example
	 * backBtn.addEventListener("click", () => router.back("/"));
	 * // HTML shorthand (interceptLinks handles it):
	 * // <a href="#" data-back data-fallback="/">← Back</a>
	 */
	back(fallback = "/") {
		if (this.#isNavigating) return;

		if (this.#historyIndex > 0) {
			this.#historyIndex--;
			const target = this.#historyStack[this.#historyIndex];
			this.#isNavigating = true;
			// "pop" mode: moves the pointer only, no new history push/replace.
			this.#navigate(target, "pop");
		} else {
			// Nothing behind us — go to fallback as a normal navigation.
			this.navigate(fallback);
		}
	}

	// ============================================================
	//  PUBLIC — FORWARD
	// ============================================================

	/**
	 * Go to the next entry in the router's internal history stack.
	 * Only works after back() has been called this session.
	 * Silently ignored if already at the latest entry.
	 *
	 * @example
	 * forwardBtn.addEventListener("click", () => router.forward());
	 */
	forward() {
		if (this.#isNavigating) return;
		if (this.#historyIndex >= this.#historyStack.length - 1) return;

		this.#historyIndex++;
		const target = this.#historyStack[this.#historyIndex];
		this.#isNavigating = true;
		// "pop" mode: moves the pointer only, no new history push/replace.
		this.#navigate(target, "pop");
	}

	// ============================================================
	//  PUBLIC — STATE CHECKS
	// ============================================================

	/** @returns {boolean} */
	canGoBack() {
		return this.#historyIndex > 0;
	}

	/** @returns {boolean} */
	canGoForward() {
		return this.#historyIndex < this.#historyStack.length - 1;
	}

	// ============================================================
	//  PUBLIC — PREFETCH
	// ============================================================

	/**
	 * Warm up a lazy route before the user navigates to it.
	 * Safe to call repeatedly — already-fetched paths are skipped.
	 *
	 * @param {string} path
	 */
	prefetch(path) {
		if (this.#prefetched.has(path)) return;

		const match = this.#match(path.split("/").filter(Boolean), this.#routes);
		if (!match) return;

		this.#prefetched.add(path);
		for (const route of match.stack) {
			if (route.lazy && route.component) route.component().catch(() => {});
		}
	}

	// ============================================================
	//  PUBLIC — LINK INTERCEPTION
	// ============================================================

	/**
	 * Attach one delegated click listener to document.
	 * All internal <a> tags are intercepted automatically.
	 * External links (http/https) pass through untouched.
	 * Hover fires prefetch before the user clicks.
	 *
	 * Supported data attributes on <a> tags:
	 *   data-replace              → calls replace() instead of navigate()
	 *   data-back                 → calls back()
	 *   data-fallback="<path>"    → fallback used with data-back
	 */
	interceptLinks() {
		document.addEventListener("click", (e) => {
			const anchor = e.target.closest("a");
			if (!anchor) return;

			if (anchor.hasAttribute("data-back")) {
				e.preventDefault();
				this.back(anchor.getAttribute("data-fallback") || "/");
				return;
			}

			if (anchor.hasAttribute("data-navigation")) {
				e.classList.add("active-nav");
				const navs = getMultiTags("[data-navigation]");
				for (n of navs) {
					if (n.hasAttribute("data-navigation"))
						n.classList.remove("active-nav");
				}
				this.back(anchor.getAttribute("data-fallback") || "/");
			}

			const href = anchor.getAttribute("href");
			if (!href || href.startsWith("http") || href === "#") return;

			e.preventDefault();
			anchor.hasAttribute("data-replace")
				? this.replace(href)
				: this.navigate(href);
		});

		document.addEventListener("mouseover", (e) => {
			const anchor = e.target.closest("a");
			if (!anchor) return;
			const href = anchor.getAttribute("href");
			if (href && !href.startsWith("http") && href !== "#") {
				this.prefetch(href);
			}
		});

		return this;
	}

	/**
	 * Use IntersectionObserver to prefetch links as they enter the viewport.
	 */
	observeLinks() {
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const href = entry.target.getAttribute("href");
				if (href && !href.startsWith("http")) this.prefetch(href);
			}
		});
		document.querySelectorAll("a[href]").forEach((a) => io.observe(a));
		return this;
	}

	// ============================================================
	//  PUBLIC — INIT
	// ============================================================

	/**
	 * Boot the router. Call once, after:
	 *   1. The layout shell is in the DOM.
	 *   2. All outlets are registered via addOutlet().
	 *   3. Routes are registered via register().
	 */
	init() {
		if (this.#outlets.size === 0) {
			console.warn(
				"[Router] No outlets registered. " +
					"Call addOutlet() before init() or nothing will render.",
			);
		}

		// Seed internal stack with the landing URL.
		this.#historyStack = [location.pathname];
		this.#historyIndex = 0;

		// Browser back/forward buttons → "pop" mode.
		window.addEventListener("popstate", () => {
			if (this.#isNavigating) return;
			this.#isNavigating = true;
			this.#navigate(location.href, "pop");
		});

		this.interceptLinks();
		this.observeLinks();

		// Render current URL. "pop" mode → no history push on load.
		this.#navigate(location.href, "pop");

		return this;
	}
}

// ============================================================
//  SINGLETON EXPORT
// ============================================================
export const router = new Router();
