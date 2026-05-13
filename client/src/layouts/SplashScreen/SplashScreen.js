// ============================================================
//  SplashScreen.js
//  src/layouts/SplashScreen/SplashScreen.js
//
//  Mounts directly into #app before anything else exists.
//  Exposes a dismiss() method that fades the screen out and
//  removes it from the DOM once the transition ends.
//
//  Usage:
//    import { SplashScreen } from "@zecco/layouts/SplashScreen/SplashScreen.js";
//    const splash = new SplashScreen();
//    splash.mount();
//    // ... do boot work ...
//    await splash.dismiss();
// ============================================================

import logoSrc from "@zecco/assets/images/logo.jpg";
import "./SplashScreen.styles.css";

export class SplashScreen {
	#root = null;
	#bar = null;
	#percent = 0;

	// ── Mount ────────────────────────────────────────────────
	// Call this as the very first thing in main.js, before any
	// async work starts, so the user sees something instantly.
	mount() {
		const app = document.getElementById("app");
		if (!app) {
			console.warn("[SplashScreen] #app not found.");
			return this;
		}

		// Build the node
		this.#root = this.#build();

		// Cache the progress bar fill so #step() can animate it
		this.#bar = this.#root.querySelector(".splash-bar-fill");

		// Place it as the first child of #app so it sits above everything
		app.prepend(this.#root);

		return this;
	}

	// ── Progress ─────────────────────────────────────────────
	// Call step(label) as each boot phase completes to move the
	// progress bar forward and update the status text.
	// Phases are tracked as a running percentage — each call
	// increments by the provided amount (default 20).
	step(label = "", increment = 20) {
		this.#percent = Math.min(100, this.#percent + increment);

		if (this.#bar) {
			this.#bar.style.width = `${this.#percent}%`;
		}

		const status = this.#root?.querySelector(".splash-status");
		if (status && label) status.textContent = label;

		return this;
	}

	// ── Dismiss ──────────────────────────────────────────────
	// Fill the bar to 100%, pause briefly so it's visible, then
	// fade out and remove from DOM. Returns a Promise so you can
	// await it before the router navigates to the first page.
	dismiss() {
		return new Promise((resolve) => {
			if (!this.#root) {
				resolve();
				return;
			}

			// Complete the bar
			if (this.#bar) this.#bar.style.width = "100%";

			const status = this.#root.querySelector(".splash-status");
			if (status) status.textContent = "Ready";

			// Short pause so the user sees 100% before fade
			setTimeout(() => {
				this.#root.classList.add("splash--dismissing");

				// Remove from DOM after the CSS transition ends
				this.#root.addEventListener(
					"transitionend",
					() => {
						this.#root.remove();
						this.#root = null;
						resolve();
					},
					{ once: true },
				);
			}, 350);
		});
	}

	// ── Build DOM ────────────────────────────────────────────
	#build() {
		const el = document.createElement("div");
		el.className = "splash-screen";
		el.setAttribute("aria-label", "Loading SoniqStream");
		el.setAttribute("role", "status");

		el.innerHTML = `
			<div class="splash-inner">

				<div class="splash-logo-wrap">
					<img
						src="${logoSrc}"
						alt="SoniqStream"
						class="splash-logo"
						draggable="false"
					/>
					<div class="splash-logo-glow" aria-hidden="true"></div>
				</div>

				<p class="splash-app-name">SoniqStream</p>
				<p class="splash-tagline">Your sound. Your world.</p>

				<div class="splash-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
					<div class="splash-bar">
						<div class="splash-bar-fill"></div>
					</div>
					<p class="splash-status">Starting up…</p>
				</div>

			</div>

			<p class="splash-footer">SoniqStream &copy; 2025</p>
		`;

		return el;
	}
}
