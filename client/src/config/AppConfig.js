class AppConfig {
	#appName = "ZeccoMusicApp";
	#creator = "ZECCO";
	#devs = ["ZECCO"];

	#globalDocument = document; // get reference to the document object
	#apiDevUrl = "http://localhost:3500";
	#apiBaseUrl = null;

	get appName() {
		return this.#appName;
	}

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

	get getAppData() {
		return {
			appName: this.#appName,
			creator: this.#creator,
			developers: this.#devs,
		};
	}

	get date() {
		const date = new Date();
		return date;
	}
}

const appConfig = new AppConfig();
export default appConfig;
