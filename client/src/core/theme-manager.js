import { checkedSvg as ckSvg } from "../assets/svgs/svg-icons.js";
import {
	getLocalStorageData,
	setToLocalStorage,
} from "../helpers/get-local-storage-data";
import { getTag } from "../helpers/select-element";

class ThemeManager {
	#root = document.documentElement; // Get the root of the page
	#app = getTag("#app");
	#storedTheme = getLocalStorageData("Theme");
	#globalTheme = window.matchMedia("(prefers-color-scheme: dark)"); // Checks for dark mood
	#themes = {
		Dark: {
			"--background": "hsl(0, 0%, 10%)",
			"--text": "hsl(0, 3%, 89%)",
			"--accent": "hsl(213, 100%, 50%)",
			"--muted": "rgb(187, 187, 187)",
			"--svg-color": "rgb(221, 221, 221)",
		},
		Light: {
			"--background": "hsl(0, 0%, 100%)",
			"--text": "hsl(0, 2%, 12%)",
			"--accent": "hsl(213, 100%, 50%)",
			"--muted": "rgb(86, 85, 85)",
			"--svg-color": "rgb(21, 20, 20)",
		},
	};

	#systemDarkMood = () => this.#syncTheme("Dark", "System"); // Sync the changes to the page
	#systemLightMood = () => this.#syncTheme("Light", "System"); // Sync the changes to the page

	#changeThemeEvent = (e) => {
		e.matches ? this.#systemDarkMood() : this.#systemLightMood(); // Apply theme due to the global theme
	};

	#applyTheme(name) {
		const data = Object.entries(this.#themes[name]); // Covert object to arrays
		// biome-ignore lint/suspicious/useIterableCallbackReturn: <Need to keep it short not returning values>
		data.forEach(([key, value]) => this.#root.style.setProperty(key, value));
	}

	// Clear all theme attribute from app
	#clearTheme(...keys) {
		for (const key of keys) this.#app.removeAttribute("data-theme", key); // For the numbers of keys passed remove the attribute
		setToLocalStorage("Theme", ""); // Clear saved theme
	}

	// Call to clear all theme attr from page, add the required theme attr then save to local storage
	#syncTheme(name, defaultTheme) {
		this.#applyTheme(name); // Call to change the css variables
		this.#clearTheme("Dark", "Light", "System"); // Clear the attr from the root element
		this.#app.setAttribute("data-theme", defaultTheme ?? name); // Add the provided theme attr value
		setToLocalStorage("Theme", defaultTheme ?? name); //  Save the provided theme
		// Check and remover the event listener when it switches from system to dark or light mood
		if (
			(name === "Dark" && !defaultTheme) ||
			(name === "Light" && !defaultTheme)
		) {
			this.#globalTheme.removeEventListener(
				"change",
				this.#changeThemeEvent,
			);
		}

		// Default value is "System" pass it to the render method if available to render on page
		this.#renderTheme(defaultTheme ?? name);
	}

	#renderTheme(theme) {
		// Select the required elements
		const darkBtn = getTag(".theme_btn_dark");
		const lightBtn = getTag(".theme_btn_light");
		const systemBtn = getTag(".theme_btn_system");
		const themePlaceholder = getTag("[data-theme-placeholder]");

		themePlaceholder.innerHTML = theme; // Show current theme on page
		const btnContent = () => `<span>${theme}</span>${ckSvg}`; // Add them value and checked icon on the page

		darkBtn.innerHTML = theme === "Dark" ? btnContent() : "Dark";
		lightBtn.innerHTML = theme === "Light" ? btnContent() : "Light";
		systemBtn.innerHTML = theme === "System" ? btnContent() : "System";
	}

	// Initialize the theme on first app load use the return to break the flow in this method
	init() {
		if (this.#storedTheme === "Dark") return this.setDark(); // Light mood
		if (this.#storedTheme === "Light") return this.setLight(); // Light mood
		if (this.#storedTheme === "System") return this.setSystem(); // Light mood
	}

	setSystem() {
		const matchedDarkTheme = this.#globalTheme.matches; // Will match if its on dark theme
		matchedDarkTheme ? this.#systemDarkMood() : this.#systemLightMood(); // Apply theme due to the global theme
		this.#globalTheme.addEventListener("change", this.#changeThemeEvent); // Add Event when its on system mood
	}
	setLight = () => this.#syncTheme(`Light`); // Sync the changes to the page  And set Light theme
	setDark = () => this.#syncTheme("Dark"); // Sync the changes to the page And set Dark theme
}

export const themeManager = new ThemeManager();
