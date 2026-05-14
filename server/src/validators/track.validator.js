const { z } = require("zod");

const updateTrackSchema = z
	.object({
		title: z.string().min(1).max(200).optional(),

		artist: z.string().min(1).max(100).optional(),

		artists: z
			.array(z.string().min(1).max(100))
			.max(20, "Too many artists")
			.optional(),

		album: z.string().min(1).max(200).optional(),

		genre: z
			.array(z.string().min(1).max(50))
			.max(10, "Too many genres")
			.optional(),

		year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),

		category: z.enum(["uploaded", "featured", "trending"]).optional(),

		visibility: z.enum(["public", "private", "unlisted"]).optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided",
	});

module.exports = { updateTrackSchema };
