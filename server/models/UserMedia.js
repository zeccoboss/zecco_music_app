const mongoose = require("mongoose");
const AudioSchema = require("./AudioSchema");
const { Schema } = mongoose;

const mediaSchema = new Schema({
	owner: {
		required: true,
		ref: "User",
		type: Schema.Types.ObjectId,
	},
	type: {
		type: String,
		enum: ["audio", "video", "image"],
		required: true,
		default: null,
	},
	category: {
		required: true,
		enum: ["upload", "created", "favorite", "local"],
		type: String,
		default: null,
	},
	media: {
		type: AudioSchema,
		required: false,
	},
});

const Media = mongoose.model("UserMedia", mediaSchema);
module.exports = Media;
