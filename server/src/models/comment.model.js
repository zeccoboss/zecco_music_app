const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		content: { type: String, required: true, trim: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		track: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Track",
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
