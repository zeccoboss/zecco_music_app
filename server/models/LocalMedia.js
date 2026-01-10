const mongoose = require("mongoose");
const { Schema } = mongoose;

const localMediaSchema = new Schema({
	uuid: String,
	fileName: String,
	title: {
		type: String,
		default: null,
	},
	artist: {
		type: String,
		default: null,
	},
	artists: {
		type: Array,
		default: [],
	},
	duration: {
		type: Number,
		default: null,
	},
	bitrate: {
		type: Number,
		default: null,
	},
	sampleRate: {
		type: Number,
		default: null,
	},
	album: {
		type: String,
		default: null,
	},
	genre: {
		type: Schema.Types.Mixed,
		default: null,
	},
	hasAudio: {
		type: Boolean,
		default: false,
	},
	hasCover: {
		type: Boolean,
		default: false,
	},
	hasVideo: {
		type: Boolean,
		default: false,
	},
	year: {
		type: Number,
		default: null,
	},
	coverUrl: {
		type: String,
		default: null,
	},
	coverFormat: {
		type: String,
		default: null,
	},
	audioUrl: {
		type: String,
		default: null,
	},
});
// const a = {
// 	uuid: id,
// 	fileName,
// 	title: common.title ?? null,
// 	artist: common.artist ?? null,
// 	duration: format.duration ?? null,
// 	artists: common.artists ?? null,
// 	bitrate: format.bitrate ?? null,
// 	sampleRate: format.sampleRate ?? null,
// 	album: common.album ?? null,
// 	hasVideo: format.hasVideo ?? false,
// 	hasAudio: !!format.hasAudio,
// 	hasCover: !!cover?.data,
// 	genre: format.genre ?? null,
// 	year: common.year ?? null,
// 	coverUrl: coverUrl,
// 	coverFormat: cover ? cover.format : null,
// 	audioUrl: audioUrl,
// };

// const media = {
// 	title: common.title ?? null,
// 	artist: common.artist ?? null,
// 	duration: format.duration ?? null,
// 	artists: common.artists ?? null,
// 	bitrate: format.bitrate ?? null,
// 	sampleRate: format.sampleRate ?? null,
// 	album: common.album ?? null,
// 	hasVideo: format.hasVideo ?? false,
// 	hasAudio: !!format.hasAudio,
// 	hasCover: !!cover?.data,
// 	genre: format.genre ?? null,
// 	year: common.year ?? null,
// 	coverUrl: coverPath ? coverPath : null,
// 	audioUrl: this.flag === "Public" ? `${filePath}` : "",
// };
const LocalMedia = mongoose.model("localMedia", localMediaSchema);
module.exports = LocalMedia;
