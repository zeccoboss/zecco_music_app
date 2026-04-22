const { v4: uuidV4 } = require("uuid");
class AppConfig {
	#appName = "ZeccoStreams";

	#port = process.env.NODE_ENV === "production" ? process.env.PORT : 3500;
	#client_base_url = null;
	#client_dev_url = `http://localhost:5173/`;

	get base() {
		return process.env.NODE_ENV === "production"
			? process.env.BASE_URL
			: `http://localhost:${this.port}`;
	}

	get appName() {
		return this.#appName;
	}

	get port() {
		return this.#port;
	}

	get client() {
		return process.env.NODE_ENV === "production"
			? this.#client_base_url
			: this.#client_dev_url;
	}

	date() {
		return Date.now();
	}

	imageName(type) {
		if (!type) {
			console.error("[AppConfig]: Give a valid image type");
			return;
		}
		const time = new Date().toTimeString();
		const date = `${new Date().toDateString()}-${time.slice(0, time.indexOf(" "))}`;
		return `${this.#appName}-${type}-${uuidV4()}-${date}`;
	}

	get audioName() {
		const time = new Date().toTimeString();
		const date = `${new Date().toDateString()}-${time.slice(0, time.indexOf(" "))}`;
		return `${this.#appName}-${uuidV4()}-${date}`;
	}

	// Get the path for local
	local = {
		bannerPath: "images/user-banner.jpg",
		adminAvatarPath: "images/admin-avatar.png",
		userAvatarPath: "images/user-avatar.png",
		coverPath: "images/audio-cover.png",
	};
}

const appConfig = new AppConfig();

module.exports = appConfig;
