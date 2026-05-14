// ============================================================
//  router.js  —  SPA Client-Side Router
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

	#historyStack = [];
	#historyIndex = -1;

	// ============================================================
	//  OUTLETS
	// ============================================================

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

	register(routes) {
		this.#routes = routes;
		return this;
	}

	setNotFound(handler) {
		this.#notFound = handler;
		return this;
	}

	// ============================================================
	//  AUTH & LAYOUT
	// ============================================================

	setAuthChecker(fn) {
		this.#authChecker = fn;
		return this;
	}

	setLayoutBuilder(fn) {
		this.#layoutBuilder = fn;
		return this;
	}

	// ============================================================
	//  MIDDLEWARE
	// ============================================================

	use(fn) {
		this.#middlewares.push(fn);
		return this;
	}

	// ============================================================
	//  INTERNAL HELPERS
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

	match(path) {
		return this.#match(path.split("/").filter(Boolean), this.#routes);
	}

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

	async #runMiddlewares(ctx) {
		for (const mw of this.#middlewares) {
			let called = false;
			await mw(ctx, () => {
				called = true;
			});
			if (!called) return false;
		}
		return true;
	}

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

	async #render(stack, ctx) {
		const leaf = stack.at(-1);
		const outletName = leaf.outlet ?? "main";

		// 1. Handle Shell Restoration
		if (outletName !== "root") {
			const mainOutlet = this.#outlets.get("main");
			const rootOutlet = this.#outlets.get("root");

			if ((!mainOutlet || !mainOutlet.isConnected) && this.#layoutBuilder) {
				try {
					const { shell, main } = await this.#layoutBuilder();
					if (rootOutlet) rootOutlet.replaceChildren(shell);
					this.addOutlet("main", main);
				} catch (err) {
					console.error("[Router] Shell build failed:", err);
				}
			}
		} else {
			// Clear main if we are moving to root (Auth/404)
			this.#unmountCurrent("main");
			this.#mounted.delete("main");
		}

		// 2. Component Resolution
		let componentFn = leaf.component;
		if (leaf.lazy) {
			const mod = await leaf.component();
			componentFn = mod.default ?? mod;
		}
		if (!componentFn) return;

		const node = await componentFn(ctx);
		if (!(node instanceof Node)) return;

		// 3. Mount
		const outlet = this.#outlets.get(outletName);
		if (!outlet) return;

		this.#unmountCurrent(outletName);
		outlet.replaceChildren(node);
		this.#mounted.set(outletName, node);
	}

	// ============================================================
	//  INTERNAL — NAVIGATION CORE
	// ============================================================

	async #navigate(url, historyMode = "push") {
		const fullUrl = new URL(url, location.origin);
		const path = fullUrl.pathname;
		const query = this.#parseQuery(fullUrl.searchParams);

		if (historyMode === "push")
			this.#scrollPositions.set(location.pathname, scrollY);

		let match = this.match(path);

		// If 404, create virtual match so it passes through middlewares/render
		if (!match && this.#notFound) {
			match = {
				stack: [{ path, component: this.#notFound, outlet: "root" }],
				params: {},
			};
		}

		if (!match) {
			this.#isNavigating = false;
			return;
		}

		const ctx = {
			path,
			params: match.params,
			query,
			input: { ...match.params, ...query },
		};

		if (!this.#runGuards(match.stack)) {
			this.#isNavigating = false;
			return await this.#navigate("/auth/login", "replace");
		}

		const ok = await this.#runMiddlewares(ctx);
		if (!ok) {
			this.#isNavigating = false;
			return;
		}

		document.body.classList.add("route-loading");
		try {
			await this.#render(match.stack, ctx);
		} finally {
			document.body.classList.remove("route-loading");
		}

		if (historyMode !== "pop") {
			const newUrl = path + fullUrl.search;
			historyMode === "replace"
				? history.replaceState({ path }, "", newUrl)
				: history.pushState({ path }, "", newUrl);
		}

		this.#syncHistory(path, historyMode);

		queueMicrotask(() => {
			scrollTo(0, this.#scrollPositions.get(path) ?? 0);
		});

		this.#isNavigating = false;
	}

	#syncHistory(path, mode) {
		if (mode === "replace") {
			if (this.#historyIndex >= 0)
				this.#historyStack[this.#historyIndex] = path;
			return;
		}
		if (mode === "pop") {
			const curr = this.#historyIndex;
			let found = -1;
			for (let i = curr - 1; i >= 0; i--)
				if (this.#historyStack[i] === path) {
					found = i;
					break;
				}
			if (found === -1)
				for (let i = curr + 1; i < this.#historyStack.length; i++)
					if (this.#historyStack[i] === path) {
						found = i;
						break;
					}

			if (found !== -1) this.#historyIndex = found;
			else {
				this.#historyStack = [path];
				this.#historyIndex = 0;
			}
			return;
		}
		this.#historyStack = this.#historyStack.slice(0, this.#historyIndex + 1);
		this.#historyStack.push(path);
		this.#historyIndex = this.#historyStack.length - 1;
	}

	// ============================================================
	//  PUBLIC API
	// ============================================================

	navigate(path) {
		if (!this.#isNavigating) {
			this.#isNavigating = true;
			this.#navigate(path, "push");
		}
	}
	replace(path) {
		if (!this.#isNavigating) {
			this.#isNavigating = true;
			this.#navigate(path, "replace");
		}
	}

	back(fallback = "/") {
		if (this.#isNavigating) return;
		if (this.#historyIndex > 0) {
			this.#historyIndex--;
			this.#isNavigating = true;
			this.#navigate(this.#historyStack[this.#historyIndex], "pop");
		} else {
			this.navigate(fallback);
		}
	}

	interceptLinks() {
		document.addEventListener("click", (e) => {
			const anchor = e.target.closest("a");
			if (!anchor) return;

			if (anchor.hasAttribute("data-back")) {
				e.preventDefault();
				return this.back(anchor.getAttribute("data-fallback") || "/");
			}

			const href = anchor.getAttribute("href");
			if (!href || href.startsWith("http") || href === "#") return;

			e.preventDefault();
			anchor.hasAttribute("data-replace")
				? this.replace(href)
				: this.navigate(href);
		});
		return this;
	}

	init() {
		this.#historyStack = [location.pathname];
		this.#historyIndex = 0;
		window.addEventListener("popstate", () => {
			if (this.#isNavigating) return;
			this.#isNavigating = true;
			this.#navigate(location.href, "pop");
		});
		this.interceptLinks();
		this.#navigate(location.href, "pop");
		return this;
	}
}

export const router = new Router();
