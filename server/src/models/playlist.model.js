const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema(
	{
		user: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		uuid: { type: String, required: true, unique: true, index: true },
		trackIds: {
			type: [{ type: Schema.Types.ObjectId, ref: "Track" }],
			default: [],
		},
		name: { required: true, type: String, trim: true },
		description: { type: String, default: "" }, // Added for better UI
		visibility: {
			type: String,
			enum: ["public", "private"], // Restricts values for safety
			default: "public",
		},
		coverUrl: {
			type: String,
			default: "default-playlist-cover.png", // Fallback image
		},
	},
	{ timestamps: true },
);

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);
module.exports = PlaylistModel;
