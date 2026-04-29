const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const { rolesList } = require("../config/roles-list.config");

// ── GET /users ─────────────────────────────────────────────────────────────────
// Admin only — enforced at route level with verifyRoles
const getAllUsers = async (_req, res) => {
	try {
		const users = await UserModel.find().select(
			"-password -refreshToken -verificationToken -verificationTokenExpiry -lastPasswordVerificationSentAt -lasUserVerificationSentAt",
		);
		res.status(200).json({ success: true, count: users.length, data: users });
	} catch (err) {
		console.error("[Users] getAllUsers:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── GET /users/:id ─────────────────────────────────────────────────────────────
// Public profile for strangers, full profile for owner and admin
const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const requesterId = req.user._id.toString();
		const isOwner = requesterId === id;
		const isAdmin = req.user.roles?.includes(rolesList.Admin);

		const user = await UserModel.findById(id).select(
			"-password -refreshToken -verificationToken -verificationTokenExpiry -passwordVerificationToken -passwordVerificationTokenExpiry -lastPasswordVerificationSentAt -lastUserVerificationSentAt",
		);

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		// Strangers get a stripped public profile
		if (!isOwner && !isAdmin) {
			return res.status(200).json({
				success: true,
				data: {
					_id: user._id,
					username: user.username,
					fullname: user.fullname,
					bio: user.bio,
					avatarImageId: user.avatarImageId,
					coverImageId: user.coverImageId,
				},
			});
		}

		// Owner and admin get the full profile
		return res.status(200).json({ success: true, data: user });
	} catch (err) {
		console.error("[Users] getUser:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── POST /users ────────────────────────────────────────────────────────────────
// Admin only — direct user creation bypassing verification
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
			username,
			fullname,
			email,
			password: await bcrypt.hash(password, 10),
			roles: [rolesList.User],
			verified: true,
			avatarImageId: null,
			coverImageId: null,
		});

		return res.status(201).json({
			success: true,
			message: "User created successfully",
			data: { _id: user._id, username: user.username, email: user.email },
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
// Owner only — users update their own profile, never someone else's
const updateUser = async (req, res) => {
	try {
		const userId = req.user._id; // always from token, never from params
		const { username, fullname } = req.body;

		// Fetch the user to update
		const user = await UserModel.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		// Only update fields that were provided
		if (username) user.username = username;
		if (fullname) user.fullname = fullname;
		if (req.body.bio !== undefined) user.bio = req.body.bio;

		// Avatar and cover image updates would be handled in separate endpoints that manage file uploads and set avatarImageId and coverImageId accordingly
		await user.save();

		// Return the updated profile
		return res.status(200).json({
			success: true,
			message: "Profile updated",
			data: {
				_id: user._id,
				username: user.username,
				fullname: user.fullname,
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

// ── DELETE /users/:id ──────────────────────────────────────────────────────────
// Admin can delete anyone — user can only delete themselves
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const requesterId = req.user._id.toString();
		const isAdmin = req.user.roles?.includes("Admin");

		if (!isAdmin && requesterId !== id) {
			return res.status(403).json({ success: false, message: "Forbidden" });
		}

		const user = await UserModel.findByIdAndDelete(id);
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

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
