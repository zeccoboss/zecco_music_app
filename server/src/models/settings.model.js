const mongoose = require("mongoose");
const { Schema } = mongoose;

const SettingsSchema = new Schema(
	{
		ownerId: {
			ref: "User",
			required: true,
			index: true,
			type: Schema.Types.ObjectId,
		},
		uuid: { type: String, required: true, unique: true, index: true },
		theme: {
			type: String,
			enum: ["light", "dark", "system"],
			default: "system",
			lowercase: true,
			trim: true,
		},
		visibility: {
			type: String,
			enum: ["public", "private"],
			default: "public",
			lowercase: true,
			trim: true,
		},
		preferredAudioQuality: {
			type: String,
			enum: ["low", "medium", "high", "recommended"],
			default: "high",
			lowercase: true,
			trim: true,
		},
		preferredVideoQuality: {
			type: String,
			enum: ["low", "medium", "high", "recommended"],
			default: "high",
			lowercase: true,
			trim: true,
		},
		region: { type: String, default: "Nigeria" },
		language: { type: String, default: "English" },
		notifications: {
			email: { type: Boolean, default: true },
			push: { type: Boolean, default: true },
		},
		socialLinks: {
			type: Map,
			of: String,
			default: {},
		},
		privacy: {
			showProfilePicture: { type: Boolean, default: true },
			showPlaylists: { type: Boolean, default: true },
			showRecentPlays: { type: Boolean, default: true },
		},
		appearance: {
			accentColor: { type: String, default: "#1DB954" },
			backgroundColor: { type: String, default: "#FFFFFF" },
		},
		otherPreferences: {
			type: Map,
			of: Schema.Types.Mixed,
			default: {},
		},
		banned: { type: Boolean, default: false, index: true },
		banReason: { type: String, default: null },
	},
	{ timestamps: true },
);

const SettingsModel = mongoose.model("Settings", SettingsSchema);
module.exports = SettingsModel;
