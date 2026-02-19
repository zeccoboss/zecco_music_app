const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
	ownerId: {
		ref: "User",
		required: true,
		index: true,
		type: Schema.Types.ObjectId,
	},
	songIds: { type: [String], default: [] },
	name: { required: true, type: String },
	public: { type: Boolean, default: false },
	createdAt: { type: Date, required: true },
});

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);
module.exports = PlaylistModel;
