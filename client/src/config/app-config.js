class AppConfig {
	#appName = "ZeccoStream";
	#creator = "ZECCO";
	#devs = ["ZECCO"];

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
}

const appConfig = new AppConfig();
export default appConfig;
