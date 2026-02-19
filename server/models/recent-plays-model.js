const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecentPlaySchema = new Schema({
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

const RecentPlayModel = mongoose.model("RecentPlay", RecentPlaySchema);
module.exports = RecentPlayModel;
