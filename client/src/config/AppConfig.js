class AppConfig {
	#appName = "ZeccoMusicApp";
	#creator = "ZECCO";
	#devs = ["ZECCO"];

	#globalDocument = document;
	#apiDevUrl = "http://localhost:7835";
	#apiBaseUrl = null;

	set pageTitle(title = "Home") {
		this.#globalDocument.title = title;
	}

	get pageTitle() {
		const title = this.#globalDocument.title;
		return title;
	}

	get apiUrl() {
		return this.#apiBaseUrl ?? this.#apiDevUrl;
	}

	getAppData() {
		console.log("Bellow is the available application data: ");
		console.log("");
		console.log("App name: ", this.#appName);
		console.log("Developers: ", this.#creator);
		console.log("Developers: ", this.#devs);
	}
}

const appConfig = new AppConfig();
export default appConfig;
