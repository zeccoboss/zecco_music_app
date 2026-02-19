const mongoose = require("mongoose");
const { rolesList } = require("../config/roles-list.config");
const { Schema } = mongoose;

const roleSChema = new Schema(
	{
		Admin: { type: Number },
		Editor: { type: Number },
		User: { type: Number, default: rolesList.User, required: true },
	},
	{ _id: false },
);

const userSchema = new Schema({
	fullname: { type: String, default: null },
	username: { type: String, required: false },
	email: { type: String, required: true, unique: true, index: true },
	roles: { type: roleSChema, required: true, index: true },
	password: { type: String, required: true },
	verified: { type: Boolean, required: true, default: false, index: true },
	refreshToken: { default: "", type: String },
	avatarImageId: { type: String, required: false },
	coverImageId: { type: String, required: false },
	playlistIds: { type: [String], unique: true, default: [] },
	verificationToken: String,
	verificationTokenExpiry: Date,
	lasUserVerificationSentAt: Date,
	lastPasswordVerificationSentAt: Date,
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
