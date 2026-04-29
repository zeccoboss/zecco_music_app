const { z } = require("zod");

const registerSchema = z.object({
	// fullname: z
	// 	.string({ required_error: "Full name is required" })
	// 	.min(2, "Full name must be at least 2 characters")
	// 	.max(100),

	username: z
		.string({ required_error: "Username is required" })
		.min(3, "Username must be at least 3 characters")
		.max(30)
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"Username can only contain letters, numbers, and underscores",
		),

	email: z
		.string({ required_error: "Email is required" })
		.email("Invalid email address"),

	password: z
		.string({ required_error: "Password is required" })
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

const loginSchema = z.object({
	identifier: z
		.string({ required_error: "Email or username is required" })
		.min(1, "Email or username is required"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email("Invalid email address"),
});

const resetPasswordSchema = z
	.object({
		token: z.string({ required_error: "Reset token is required" }).min(1),
		password: z
			.string({ required_error: "Password is required" })
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[0-9]/, "Password must contain at least one number"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

module.exports = {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
};
