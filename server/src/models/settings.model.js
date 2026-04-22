const mongoose = require("mongoose");
const { Schema } = mongoose;

constSettingsSchema = new Schema(
	{
		ownerId: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		uuid: { type: String, required: true },
	},
	{ timestamps: true },
);

const SettingsModel = mongoose.model("Image", SettingsSchema);
module.exports = SettingsModel;
