import { appConfig } from "@zecco/config/app.config";
import { getTag } from "@zecco/helpers/dom-helper";
import {
	readFromLocalStorage,
	writeToLocalStorage,
} from "@zecco/services/storage/local-storage";

class ThemeManager {
	// Private fields to manage theme state, access DOM elements, and handle system theme changes. The constructor initializes these fields and sets up event listeners for system theme changes when the "System" theme is selected.
	#root = document.documentElement;
	#app = getTag("#app");
	#storedTheme = readFromLocalStorage("Theme");
	#globalTheme = window.matchMedia("(prefers-color-scheme: dark)");
	#themes = appConfig.themes;

	// Private methods to handle theme changes based on system preferences, apply themes, clear themes, synchronize themes, and render the current theme in the UI. These methods interact with the DOM to update styles and save the user's theme preference in local storage.
	#systemDarkMood = () => this.#syncTheme("Dark", "System"); // Apply the dark theme when the system preference is for dark mode.
	#systemLightMood = () => this.#syncTheme("Light", "System"); // Apply the light theme when the system preference is for light mode.

	// Event handler for changes in the system theme preference. It checks if the new preference matches dark mode and applies the corresponding theme.
	#changeThemeEvent = (e) => {
		e.matches ? this.#systemDarkMood() : this.#systemLightMood();
	};

	// Apply the selected theme by setting CSS variables on the root element based on the theme's properties defined in the app configuration.
	#applyTheme(name) {
		const data = Object.entries(this.#themes[name]);
		data.forEach(([key, value]) => {
			this.#root.style.setProperty(key, value);
		});
	}

	// Clear the theme by removing the data-theme attribute from the app element for the specified theme keys and clearing the stored theme in local storage.
	#clearTheme(...keys) {
		for (const key of keys) this.#app.removeAttribute("data-theme", key);
		writeToLocalStorage("Theme", "");
	}

	// Synchronize the theme by applying the selected theme, clearing other themes, setting the data-theme attribute on the app element, saving the preference in local storage, and rendering the current theme in the UI. It also removes the event listener for system theme changes if a specific theme (Dark or Light) is selected without the "System" option.
	#syncTheme(name, defaultTheme) {
		// Apply the selected theme and clear other themes to ensure only one theme is active at a time. Update the data-theme attribute on the app element and save the user's theme preference in local storage.
		this.#applyTheme(name);
		this.#clearTheme("Dark", "Light", "System");
		this.#app.setAttribute("data-theme", defaultTheme ?? name);
		writeToLocalStorage("Theme", defaultTheme ?? name);

		// If the user selects a specific theme (Dark or Light) without the "System" option, remove the event listener for system theme changes to prevent automatic theme switching based on system preferences.
		if (
			(name === "Dark" && !defaultTheme) ||
			(name === "Light" && !defaultTheme)
		) {
			// Remove the event listener for system theme changes to prevent automatic theme switching based on system preferences when a specific theme is selected.
			this.#globalTheme.removeEventListener(
				"change",
				this.#changeThemeEvent,
			);
		}

		// Render the current theme in the UI by updating the content of theme buttons and a placeholder element to reflect the selected theme.
		this.#renderTheme(defaultTheme ?? name);
	}

	// Render the current theme in the UI by updating the content of theme buttons and a placeholder element to reflect the selected theme. It selects the relevant DOM elements for the theme buttons and placeholder, updates their content based on the current theme, and adds a checkmark icon to indicate the active theme.
	#renderTheme(theme) {
		// Select the required elements
		const darkBtn = getTag(".theme_btn_dark");
		const lightBtn = getTag(".theme_btn_light");
		const systemBtn = getTag(".theme_btn_system");
		const themePlaceholder = getTag("[data-theme-placeholder]");

		// Update the theme placeholder with the current theme
		themePlaceholder.innerHTML = theme;
		const btnContent = () =>
			`<span>${theme}</span><i class="bi bi-check"></i>`;

		// Update the buttons to reflect the current theme selection, adding a checkmark icon to the active theme button.
		darkBtn.innerHTML = theme === "Dark" ? btnContent() : "Dark";
		lightBtn.innerHTML = theme === "Light" ? btnContent() : "Light";
		systemBtn.innerHTML = theme === "System" ? btnContent() : "System";
	}

	// Initialize the theme manager by checking the stored theme preference and applying the corresponding theme. If the stored theme is "Dark", it applies the dark theme; if it's "Light", it applies the light theme; and if it's "System", it applies the system theme and sets up event listeners for changes in system theme preferences.
	init() {
		// Apply the dark theme if the stored theme preference is "Dark"
		if (this.#storedTheme === "Dark") return this.setDark();

		// Apply the light theme if the stored theme preference is "Light"
		if (this.#storedTheme === "Light") return this.setLight();

		// Apply the system theme and set up event listeners for changes in system theme preferences if the stored theme preference is "System"
		if (this.#storedTheme === "System") return this.setSystem();
	}

	// Set the theme to match the system preference by checking if the system prefers dark mode and applying the corresponding theme. It also adds an event listener to handle changes in the system theme preference.
	setSystem() {
		const matchedDarkTheme = this.#globalTheme.matches; // Check if the system prefers dark mode

		// Apply the corresponding theme based on the system preference
		matchedDarkTheme ? this.#systemDarkMood() : this.#systemLightMood();

		// Add an event listener to handle changes in the system theme preference
		this.#globalTheme.addEventListener("change", this.#changeThemeEvent);
	}

	// Set the theme to light mode by synchronizing the theme with the "Light" option.
	setLight = () => this.#syncTheme(`Light`);

	// Set the theme to dark mode by synchronizing the theme with the "Dark" option.
	setDark = () => this.#syncTheme("Dark");
}

export const themeManager = new ThemeManager();
