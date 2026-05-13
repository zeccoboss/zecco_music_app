const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user.model");
const { rolesList } = require("../config/roles-list.config");

const SENSITIVE_FIELDS =
	"-password -refreshToken -verificationToken -verificationTokenExpiry -passwordVerificationToken -passwordVerificationTokenExpiry -lastPasswordVerificationSentAt -lastUserVerificationSentAt";

// ── GET /users ─────────────────────────────────────────────────────────────────
const getAllUsers = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 20,
			verified,
			search,
			sortBy = "createdAt",
			order = "desc",
		} = req.query;

		const pageNum = Math.max(1, parseInt(page));
		const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
		const skip = (pageNum - 1) * limitNum;

		const filter = {};
		if (verified !== undefined) filter.verified = verified === "true";
		if (search) {
			const regex = { $regex: search, $options: "i" };
			filter.$or = [
				{ username: regex },
				{ email: regex },
				{ fullname: regex },
			];
		}

		const SORTABLE = ["createdAt", "username", "email"];
		const sortField = SORTABLE.includes(sortBy) ? sortBy : "createdAt";
		const sortOrder = order === "asc" ? 1 : -1;

		const [users, total] = await Promise.all([
			UserModel.find(filter)
				.select(SENSITIVE_FIELDS)
				.sort({ [sortField]: sortOrder })
				.skip(skip)
				.limit(limitNum),
			UserModel.countDocuments(filter),
		]);

		const totalPages = Math.ceil(total / limitNum);

		return res.status(200).json({
			success: true,
			data: users,
			pagination: {
				total,
				totalPages,
				currentPage: pageNum,
				limit: limitNum,
				hasNextPage: pageNum < totalPages,
				hasPrevPage: pageNum > 1,
			},
		});
	} catch (err) {
		console.error("[Users] getAllUsers:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── GET /users/:uuid ───────────────────────────────────────────────────────────
const getUser = async (req, res) => {
	try {
		const { uuid } = req.params; // 👈 was destructuring {id} but using uuid
		const isOwner = req.user.uuid === uuid;
		const isAdmin = req.user.roles?.includes(rolesList.Admin);

		const user = await UserModel.findOne({ uuid }).select(SENSITIVE_FIELDS);

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		if (!isOwner && !isAdmin) {
			return res.status(200).json({
				success: true,
				data: {
					uuid: user.uuid,
					username: user.username,
					fullname: user.fullname,
					bio: user.bio,
					avatarImageId: user.avatarImageId,
					coverImageId: user.coverImageId,
				},
			});
		}

		return res.status(200).json({ success: true, data: user });
	} catch (err) {
		console.error("[Users] getUser:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const getMe = async (req, res) => {
	try {
		const userId = req.user._id;

		const user = await UserModel.findById(userId)
			.select(SENSITIVE_FIELDS)
			.populate(
				"avatarImageId coverImageId",
				"uuid name format dimensions storage.baseUrl storage.key",
			);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (err) {
		console.error("[Users] getMe:", err);

		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── POST /users ────────────────────────────────────────────────────────────────
const createUser = async (req, res) => {
	try {
		const { username, fullname, email, password } = req.body;

		const existingEmail = await UserModel.findOne({ email });
		if (existingEmail) {
			return res
				.status(409)
				.json({ success: false, message: "Email already exists" });
		}

		const user = await UserModel.create({
			uuid: uuidv4(),
			username,
			fullname,
			email,
			password: await bcrypt.hash(password, 10),
			roles: [rolesList.User],
			verified: true,
			authProviders: ["local"],
			avatarImageId: null,
			coverImageId: null,
		});

		return res.status(201).json({
			success: true,
			message: "User created successfully",
			data: { uuid: user.uuid, username: user.username, email: user.email },
		});
	} catch (err) {
		console.error("[Users] createUser:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── PUT /users/me ──────────────────────────────────────────────────────────────
const updateUser = async (req, res) => {
	try {
		const userId = req.user._id; // internal _id for DB lookup
		const { username, fullname, bio } = req.body;

		const user = await UserModel.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		if (username) user.username = username;
		if (fullname) user.fullname = fullname;
		if (bio !== undefined) user.bio = bio;

		await user.save();

		return res.status(200).json({
			success: true,
			message: "Profile updated",
			data: {
				uuid: user.uuid,
				username: user.username,
				fullname: user.fullname,
				bio: user.bio,
			},
		});
	} catch (err) {
		console.error("[Users] updateUser:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── DELETE /users/:uuid ────────────────────────────────────────────────────────
const deleteUser = async (req, res) => {
	try {
		const { uuid } = req.params; // 👈 was {id} but using uuid
		const isAdmin = req.user.roles?.includes(rolesList.Admin);
		const isOwner = req.user.uuid === uuid; // 👈 compare uuids not _id vs id

		if (!isAdmin && !isOwner) {
			return res.status(403).json({ success: false, message: "Forbidden" });
		}

		const user = await UserModel.findOneAndDelete({ uuid });
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		return res
			.status(200)
			.json({ success: true, message: "User deleted successfully" });
	} catch (err) {
		console.error("[Users] deleteUser:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

module.exports = {
	getAllUsers,
	getUser,
	getMe,
	createUser,
	updateUser,
	deleteUser,
};
