const mongoose = require("mongoose");
const { Schema } = mongoose;

const trackSchema = new Schema(
	{
		user: {
			ref: "User",
			required: true,
			type: Schema.Types.ObjectId,
		},
		uuid: { type: String, required: true, unique: true },
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
		format: { type: String, required: true, default: "track/mpeg" },
		hasAudio: { type: Boolean, default: false },
		hasCover: { type: Boolean, default: false },
		hasVideo: { type: Boolean, default: false },
		size: { type: String, required: true },
		videoId: { type: Schema.Types.ObjectId, default: null, ref: "Video" },
		year: { type: Number, default: null },
		genre: {
			type: [String],
			default: [],
		},
		coverImageId: {
			type: Schema.Types.ObjectId,
			default: null,
			ref: "Image",
		},
		storage: {
			key: { type: String, required: true },
			baseUrl: { type: String, required: true },
			type: {
				type: String,
				required: true,
				enum: ["s3", "local"],
				lowercase: true,
				trim: true,
			},
		},
		visibility: {
			type: String,
			enum: ["public", "private", "unlisted"],
			default: "public",
			lowercase: true,
			trim: true,
		},
		playCount: { type: Number, default: 0 },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	},
);

// --- INDEXES ---
// Primary pagination index (matches your controller sort/filter)
trackSchema.index({ visibility: 1, createdAt: -1, _id: -1 });

// Fast lookups for owner collections
trackSchema.index({ user: 1, createdAt: -1 });

// Search optimization
trackSchema.index({ artist: 1 });
trackSchema.index({ genre: 1 });

const TrackModel = mongoose.model("Track", trackSchema);
module.exports = TrackModel;
