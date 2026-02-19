const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({
	ownerId: {
		ref: "Audio" | "User",
		required: true,
		index: true,
		type: Schema.Types.ObjectId,
	},
	name: { required: true, type: String },
	path: { type: String, default: null },
	format: { type: String, default: "image/jpeg", required: true },
	createdAt: { type: Date, required: true },
});

const VideoModel = mongoose.model("Video", VideoSchema);
module.exports = VideoModel;
