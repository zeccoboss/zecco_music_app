const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema(
	{
		ownerId: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		audioIds: {
			type: [{ type: Schema.Types.ObjectId, ref: "Audio" }],
			default: [],
		},
		name: { required: true, type: String },
		public: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);
module.exports = PlaylistModel;
