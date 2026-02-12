class AppConfig {
	constructor() {
		this.appName = "ZeccoMusicApp";
	}

	#port = process.env.NODE_ENV === "production" ? process.env.PORT : 3500;
	#client_base_url = null;
	#client_dev_url = `http://localhost:${this.#port}`;

	get baseUrl() {
		return process.env.NODE_ENV === "production"
			? process.env.BASE_URL
			: `http://localhost:${this.port}`;
	}

	get port() {
		return this.#port;
	}

	get clientUrl() {
		return this.#client_base_url ?? this.#client_dev_url;
	}
}

const AppConfig1 = {
	appName: "ZeccoMusicApp",
	port: process.env.PORT || 3500,

	get baseUrl() {
		if (process.env.NODE_ENV === "production") {
			return process.env.BASE_URL;
		}
		return `http://localhost:${this.port}`;
	},

	paths: {
		audio: "audio-files",
		images: "image-files",
		defaultCover: "images/default/music.default.png",
	},
};

const appConfig = new AppConfig();

module.exports = appConfig;
