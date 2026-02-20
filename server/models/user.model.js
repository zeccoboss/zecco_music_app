const mongoose = require("mongoose");
const { rolesList } = require("../config/roles-list.config");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		fullname: { type: String, default: null },
		username: { type: String, required: false },
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			lowercase: true,
			trim: true,
		},
		roles: { type: [Number], default: [rolesList.User], required: true },
		password: { type: String, required: true },
		bio: { type: String, default: null },
		verified: { type: Boolean, required: true, default: false, index: true },
		refreshToken: { default: "", type: String },
		avatarImageId: {
			type: Schema.Types.ObjectId,
			ref: "Image",
			default: null,
		},
		coverImageId: {
			type: Schema.Types.ObjectId,
			ref: "Image",
			default: null,
		},
		followersId: {
			type: [{ type: Schema.Types.ObjectId, ref: "User" }],
			default: [],
		},
		followingId: {
			type: [{ type: Schema.Types.ObjectId, ref: "User" }],
			default: [],
		},
		playlistIds: {
			type: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
			default: [],
		},
		recentPlaysId: {
			type: Schema.Types.ObjectId,
			ref: "RecentPlay",
			default: null,
		},
		verificationToken: { type: String, required: false, default: "" },
		verificationTokenExpiry: Date,
		lastUserVerificationSentAt: Date,
		lastPasswordVerificationSentAt: Date,
	},
	{ timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
