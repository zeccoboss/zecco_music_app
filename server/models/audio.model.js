const mongoose = require("mongoose");
const { Schema } = mongoose;

const audioSchema = new Schema(
	{
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
		artists: { type: [String], default: [] },
		duration: { type: Number, default: null },
		bitrate: { type: Number, default: null },
		sampleRate: { type: Number, default: null },
		album: { type: String, default: null },
		genre: {
			enum: ["hip hop", "afrobeat"],
			type: [String],
			default: [],
		},
		hasAudio: { type: Boolean, default: false, index: true },
		hasCover: { type: Boolean, default: false },
		hasVideo: { type: Boolean, default: false },
		coverImageId: {
			type: Schema.Types.ObjectId,
			default: null,
			index: true,
			ref: "Image",
		},
		videoId: { type: Schema.Types.ObjectId, required: false, ref: "Video" },
		year: { type: Number, default: null },
		bucketName: { type: String, default: "audios" },
		path: { type: String, default: null },
		format: { type: String, required: true, default: "audio/mpeg" },
	},
	{ timestamps: true },
);

const AudioModel = mongoose.model("Audio", audioSchema);
module.exports = AudioModel;
