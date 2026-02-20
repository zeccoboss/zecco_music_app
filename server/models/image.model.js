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
		name: { required: true, type: String },
		path: { type: String, default: null },
		category: {
			enum: ["avatar", "cover", "banner"],
			type: String,
			required: true,
		},
		bucketName: { required: true, type: String, default: "images" },
		format: { type: String, default: "image/jpeg", required: true },
	},
	{ timestamps: true },
);

const ImageModel = mongoose.model("Image", ImageSchema);
module.exports = ImageModel;
