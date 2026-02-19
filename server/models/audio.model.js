const mongoose = require("mongoose");
const { Schema } = mongoose;

const audioSchema = new Schema({
	ownerId: {
		ref: "User",
		required: true,
		index: true,
		type: Schema.Types.ObjectId,
	},
	category: { type: String, default: "uploaded" },
	codec: { type: String, default: null },
	name: { type: String },
	title: { type: String, default: null },
	artist: { type: String, default: null },
	artists: { type: Array, default: [] },
	duration: { type: Number, default: null },
	bitrate: { type: Number, default: null },
	sampleRate: { type: Number, default: null },
	album: { type: String, default: null },
	genre: {
		type: [String],
		default: [],
		enum: ["hip hop", "afrobeat"],
		index: true,
	},
	hasAudio: { type: Boolean, default: false },
	hasCover: { type: Boolean, default: false },
	hasVideo: { type: Boolean, default: false },
	coverImageId: { type: String, default: null, index: true },
	videoId: { type: String, required: false },
	year: { type: Number, default: null },
	path: { type: String, default: null },
	createdAt: { type: Date, required: true },
	format: { type: String, required: true, default: "audio/mpeg" },
});

const AudioModel = mongoose.model("Audio", audioSchema);
module.exports = AudioModel;
