const mongoose = require("mongoose");
const { Schema } = mongoose;
const roleSChema = require("./Roles");

const profileSchema = new Schema(
	{
		path: {
			type: String,
			default: "images/users/default_profile.png",
		},
	},
	{ _id: false }
);

const userSchema = new Schema({
	username: {
		type: String,
		required: false,
		default: "",
	},
	email: {
		type: String,
		required: true,
	},
	roles: {
		type: roleSChema,
		required: true,
	},
	fullname: {
		type: String,
		default: "",
	},
	password: {
		type: String,
		required: true,
	},
	isVerified: {
		type: Boolean,
		required: true,
		default: false,
	},
	playlist: {
		type: Array,
		default: [],
	},
	refreshToken: {
		default: "",
		type: String,
	},
	profile: {
		type: profileSchema,
		required: true,
	},
	verificationToken: String,
	verificationTokenExpiry: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
