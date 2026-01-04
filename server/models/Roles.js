const mongoose = require("mongoose");
const { ROLES_LIST } = require("../config/roles_list");
const { Schema } = mongoose;

const roleSChema = new Schema(
	{
		_id: false,
		Admin: {
			type: Number,
		},
		Editor: {
			type: Number,
		},
		User: {
			type: Number,
			default: ROLES_LIST.User,
			required: true,
		},
	},
	{ _id: false }
);

module.exports = roleSChema;
