const mongoose = require("mongoose");
const { Schema } = mongoose;

const mediaSchema = new Schema({
	owner: {
		required: true,
		ref: "User",
		type: Schema.Types.ObjectId,
	},
	type: {
		type: String,
		enum: ["audio", "video", "image", "unknown"],
		required: true,
		default: "unknown",
	},
	category: {
		required: true,
		enum: ["uploaded", "created", "favorite", "unknown"],
		type: String,
		default: "unknown",
	},
	media: {
		type: Schema.Types.Mixed,
		required: true,
		default: {},
	},
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
