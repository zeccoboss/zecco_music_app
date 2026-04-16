const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema(
	{
		ownerId: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		name: { required: true, type: String },
		path: { type: String, default: null },
		bucketName: { required: true, type: String, default: "videos" },
		format: { type: String, default: "image/jpeg", required: true },
	},
	{ timestamps: true },
);

const VideoModel = mongoose.model("Video", VideoSchema);
module.exports = VideoModel;
