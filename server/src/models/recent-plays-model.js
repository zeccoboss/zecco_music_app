const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecentPlaySchema = new Schema(
	{
		ownerId: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		uuid: { type: String, required: true },
		audioIds: {
			type: [{ type: Schema.Types.ObjectId, ref: "Audio" }],
			default: [],
		},
		name: { required: true, type: String },
		public: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const RecentPlayModel = mongoose.model("RecentPlay", RecentPlaySchema);
module.exports = RecentPlayModel;
