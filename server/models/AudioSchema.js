const mongoose = require("mongoose");
const { Schema } = mongoose;

const AudioSchema = Schema(
	{
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
		audioFormat: {
			type: String,
			default: "audio/mpeg",
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
	},
	{ _id: false }
);

module.exports = AudioSchema;
