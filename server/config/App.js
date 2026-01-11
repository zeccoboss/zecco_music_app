const AppConfig = {
	appName: "ZeccoMusicApp",
	port: process.env.PORT || 7835,

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

module.exports = AppConfig;
