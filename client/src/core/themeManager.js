import {
	getLocalStorageData,
	setToLocalStorage,
} from "../helpers/getLocalStorageData";
import { getTag } from "../helpers/selectElement";

class ThemeManager {
	#root = document.documentElement;
	#app = getTag("#app", "id");
	#storedTheme = getLocalStorageData("Theme");
	#globalTheme = window.matchMedia("(prefers-color-scheme: dark)"); // Checks for dark mood
	#themes = {
		dark: {
			"--background": "hsl(0, 0%, 10%)",
			"--text": "hsl(0, 3%, 89%)",
			"--accent": "hsl(213, 100%, 50%)",
			"--muted": "rgb(187, 187, 187)",
			"--svg-color": "rgb(221, 221, 221)",
		},
		light: {
			"--background": "hsl(0, 0%, 100%)",
			"--text": "hsl(0, 2%, 12%)",
			"--accent": "hsl(213, 100%, 50%)",
			"--muted": "rgb(86, 85, 85)",
			"--svg-color": "rgb(21, 20, 20)",
		},
	};

	#applyTheme(name) {
		const data = Object.entries(this.#themes[name]);
		// Loop through and c...setDark
		data.forEach(([key, value]) => {
			this.#root.style.setProperty(key, value);
		});
	}

	// Clear all theme attribute from app
	#clearTheme(...keys) {
		for (const key of keys) this.#app.removeAttribute("data-theme", key); // For the numbers of keys passed remove the attribute
		setToLocalStorage("Theme", ""); // Clear saved theme
	}

	// Call to clear all theme attr from page, add the required theme attr then save to local storage
	#syncTheme(name, defaultTheme) {
		this.#applyTheme(name); // Call to change the css variables
		this.#clearTheme("dark", "light", "system"); // Clear the attr from the root element
		this.#app.setAttribute("data-theme", defaultTheme ?? name); // Add the provided theme attr value
		setToLocalStorage("Theme", defaultTheme ?? name); //  Save the provided theme
	}

	#renderTheme(theme) {
		const themeContainer = getTag("#theme-container");

		// Only add event when the theme container is available
		if (!themeContainer) {
			// console.error("No theme container");
			return;
		} else {
			themeContainer.onclick = (e) => console.log(e.target); // Log the target
		}

		// console.info(`App on ${theme} theme`); // Give log of current theme
	}

	// Initialize the theme on first app load
	init() {
		switch (this.#storedTheme) {
			case "light":
				this.setLight(); // Light mood
				break;
			case "dark":
				this.setDark(); // Dark mood
				break;
			default:
				this.setSystem(); // System mood
				break;
		}
	}

	// System default
	setSystem() {
		const matchedDarkTheme = this.#globalTheme.matches; // /Will match if its on dark theme

		const systemDarkMood = () => {
			this.#syncTheme("dark", "system"); // Sync the changes to the page
			this.#renderTheme("system");
		};

		const systemLightMood = () => {
			this.#syncTheme("light", "system"); // Sync the changes to the page
			this.#renderTheme("system");
		};

		// Apply theme due to the global theme
		matchedDarkTheme ? systemDarkMood() : systemLightMood();

		this.#globalTheme.addEventListener("change", (e) => {
			const match = e.matches; // /Will match if its on dark theme
			match ? systemDarkMood() : systemLightMood(); // Apply theme due to the global theme
		});
	}

	// Apply light theme
	setLight() {
		this.#syncTheme(`light`); // Sync the changes to the page
		this.#renderTheme(`Light`); // Update the theme details on page
	}

	// Apply dark theme
	setDark() {
		this.#syncTheme("dark"); // Sync the changes to the page
		this.#renderTheme(`Dark`); // Update the theme details on page
	}
}

export const themeManager = new ThemeManager();
