const mongoose = require("mongoose");
const { rolesList } = require("../config/roles-list.config");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		uuid: { type: String, required: true, unique: true, index: true },
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
		refreshToken: { default: null, type: String },
		isActive: { type: Boolean, default: true },
		playerState: {
			currentTrack: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Track",
				default: null,
			},
			progressMs: { type: Number, default: 0 },
			isPlaying: { type: Boolean, default: false },
			lastUpdated: { type: Date, default: Date.now },
		},
		avatarImageId: {
			type: Schema.Types.ObjectId,
			ref: "Image",
		},
		bannerImageId: {
			type: Schema.Types.ObjectId,
			ref: "Image",
		},
		settingsId: {
			type: Schema.Types.ObjectId,
			ref: "Settings",
			default: null,
		},
		// Will hold multi Users ID's which are documents in the the Playlist collection
		followingId: {
			type: [{ type: [Schema.Types.ObjectId], ref: "User" }],
			default: [],
		},
		followersId: {
			type: [{ type: [Schema.Types.ObjectId], ref: "User" }],
			default: [],
		},
		authProviders: {
			type: [String],
			enum: ["local", "google", "github"],
			default: ["local"],
		},
		uploadsTracksId: {
			type: [Schema.Types.ObjectId],
			ref: "Track",
			default: [],
		},
		likedTracksIds: [
			{
				type: Schema.Types.ObjectId,
				ref: "Track",
			},
		],
		// Will hold multi playlist ID's which are documents in the the Playlist collection
		playlistIds: {
			type: [{ type: [Schema.Types.ObjectId], ref: "Playlist" }],
			default: [],
		},
		recentPlaysIds: {
			type: [Schema.Types.ObjectId],
			ref: "RecentPlay",
			default: [],
		},
		// Verifying email
		verificationToken: { type: String, default: null },
		verificationTokenExpiry: { type: Date, default: null },
		lastUserVerificationSentAt: { type: Date, default: null },

		// Verifying password
		passwordVerificationToken: { type: String, default: null },
		passwordVerificationTokenExpiry: { type: Date, default: null },
		lastPasswordVerificationSentAt: { type: Date, default: null },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (_doc, ret) => {
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
	},
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
