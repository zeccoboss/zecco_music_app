const { z } = require("zod");

const updateUserSchema = z
	.object({
		fullname: z
			.string()
			.min(2, "Full name must be at least 2 characters")
			.max(100)
			.optional(),

		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.max(30)
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"Username can only contain letters, numbers, and underscores",
			)
			.optional(),

		// Prevent clients from sending fields they shouldn't touch
		email: z
			.undefined({ message: "Email cannot be updated here" })
			.optional(),
		password: z
			.undefined({ message: "Password cannot be updated here" })
			.optional(),
		roles: z
			.undefined({ message: "Roles cannot be updated here" })
			.optional(),

		bio: z.string().max(300, "Bio must be under 300 characters").optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided",
	});

const createUserSchema = z.object({
	fullname: z.string().min(2).max(100),
	username: z
		.string()
		.min(3)
		.max(30)
		.regex(/^[a-zA-Z0-9_]+$/),
	email: z.string().email(),
	password: z
		.string()
		.min(8)
		.regex(/[A-Z]/, "Must contain uppercase")
		.regex(/[0-9]/, "Must contain a number"),
});

const updateSettingsSchema = z.object({
	theme: z.enum(["light", "dark", "system"]).optional(),
	preferredTrackQuality: z.enum(["low", "normal", "high", "auto"]).optional(),
	region: z.string().optional(),
	privacy: z
		.object({
			showRecentPlays: z.boolean().optional(),
			showProfilePicture: z.boolean().optional(),
			showPlaylists: z.boolean().optional(),
			showListeningActivity: z.boolean().optional(),
		})
		.optional(),
});

module.exports = { updateSettingsSchema, updateUserSchema, createUserSchema };
