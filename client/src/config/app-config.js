class AppConfig {
	#appName = "ZeccoStream";
	#apiDevUrl = "http://localhost:3500";
	#apiBaseUrl = null;

	get app_name() {
		return this.#appName;
	}

	set page_title(title = "Home") {
		document.title = title;
	}

	get api_url() {
		return this.#apiBaseUrl ?? this.#apiDevUrl;
	}

	get themes() {
		return {
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
	}
}

const appConfig = new AppConfig();
export default appConfig;
