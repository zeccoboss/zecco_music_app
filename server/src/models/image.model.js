const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema(
	{
		ownerId: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		uuid: { type: String, required: true },
		name: { required: true, type: String },
		path: { type: String, default: null },
		category: {
			enum: ["avatar", "cover", "banner", "others"],
			type: String,
			required: true,
		},
		size: { type: String, required: true },
		storage: {
			key: { type: String, required: true },
			baseUrl: { type: String, required: true },
			type: { type: String, required: true, enum: ["s3", "local"] },
		},
		format: { type: String, default: "image/jpeg", required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	},
);

const ImageModel = mongoose.model("Image", ImageSchema);
module.exports = ImageModel;
