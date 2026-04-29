const { v4: uuidv4 } = require("uuid");
const { processAudio } = require("../metadata/meta-manager.metadata");
const { deleteObject, BUCKETS } = require("../services/minio.service");
const AudioModel = require("../models/audio.model");
const ImageModel = require("../models/image.model");

// ── GET /api/media/audio ───────────────────────────────────────────────────────
// Query params:
//   Pagination : page, limit
//   Filters    : artist, album, genre, year, hasAudio, hasCover, ownerId
//   Search     : q (searches title, artist, album at once)
//   Sort       : sortBy (field), order (asc | desc)
const getAllAudios = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 20,
			artist,
			album,
			genre,
			year,
			hasAudio,
			hasCover,
			ownerId,
			q, // free-text search
			sortBy = "createdAt",
			order = "desc",
		} = req.query;

		const pageNum = Math.max(1, parseInt(page));
		const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // cap at 100
		const skip = (pageNum - 1) * limitNum;

		// ── Build filter object ────────────────────────────────────────────────
		const filter = {};

		// Exact / targeted filters
		if (artist) filter.artist = { $regex: artist, $options: "i" };
		if (album) filter.album = { $regex: album, $options: "i" };
		if (ownerId) filter.ownerId = ownerId;
		if (year) filter.year = parseInt(year);

		// Boolean flags — only apply when explicitly passed
		if (hasAudio !== undefined) filter.hasAudio = hasAudio === "true";
		if (hasCover !== undefined) filter.hasCover = hasCover === "true";

		// Genre — schema is [String] so use $in
		if (genre) {
			const genres = genre.split(",").map((g) => g.trim());
			filter.genre = { $in: genres };
		}

		// Free-text search across title, artist, album
		if (q) {
			const regex = { $regex: q, $options: "i" };
			filter.$or = [{ title: regex }, { artist: regex }, { album: regex }];
		}

		// Non-owners only see public tracks
		// If filtering by ownerId and it matches the requester, show all their tracks
		if (ownerId && ownerId.toString() === req.user._id.toString()) {
			// Owner sees all their own tracks regardless of visibility
			filter.ownerId = ownerId;
		} else {
			// Everyone else only sees public tracks
			filter.visibility = "public";
			if (ownerId) filter.ownerId = ownerId;
		}

		// ── Sort ───────────────────────────────────────────────────────────────
		const SORTABLE_FIELDS = [
			"createdAt",
			"title",
			"artist",
			"album",
			"year",
			"duration",
			"bitrate",
		];
		const sortField = SORTABLE_FIELDS.includes(sortBy) ? sortBy : "createdAt";
		const sortOrder = order === "asc" ? 1 : -1;

		// ── Query ──────────────────────────────────────────────────────────────
		const [audios, total] = await Promise.all([
			AudioModel.find(filter)
				.populate(
					"coverImageId",
					// Fields to return from ImageModel — no ownerId, no storage internals
					"uuid name format dimensions storage.baseUrl storage.key",
				)
				.select("-__v")
				.sort({ [sortField]: sortOrder })
				.skip(skip)
				.limit(limitNum),

			AudioModel.countDocuments(filter),
		]);

		const totalPages = Math.ceil(total / limitNum);

		return res.status(200).json({
			success: true,
			data: audios,
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
		console.error("[Audio] getAllAudios:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

// ── GET /api/media/audio/:id ───────────────────────────────────────────────────
const getAudio = async (req, res) => {
	try {
		const audio = await AudioModel.findById(req.params.id).populate(
			"coverImageId",
			"storage dimensions format uuid",
		);

		if (!audio) {
			return res
				.status(404)
				.json({ success: false, message: "Audio not found" });
		}

		return res.status(200).json({ success: true, data: audio });
	} catch (err) {
		console.error("[Audio] getAudio:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

const uploadAudio = async (req, res) => {
	if (!req.file) {
		return res
			.status(400)
			.json({ success: false, message: "No file uploaded" });
	}

	const userId = req.user._id;

	try {
		// ── Daily upload limit check ───────────────────────────────────────────
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0); // midnight of today in server time

		const uploadedToday = await AudioModel.countDocuments({
			ownerId: userId,
			createdAt: { $gte: startOfDay },
		});

		if (uploadedToday >= 10) {
			return res.status(429).json({
				success: false,
				message:
					"Daily upload limit reached. You can upload up to 10 tracks per day.",
				data: {
					limit: 10,
					used: uploadedToday,
					resetsAt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000), // tomorrow midnight
				},
			});
		}

		// ── Process upload ─────────────────────────────────────────────────────
		const audio = await processAudio(userId, req.file);

		if (!audio) {
			return res
				.status(500)
				.json({ success: false, message: "Audio processing failed" });
		}

		return res.status(201).json({
			success: true,
			data: audio,
			data: {
				audio,
				uploadsRemaining: 10 - (uploadedToday + 1), // helpful for frontend
			},
		});
	} catch (err) {
		console.error("[Audio] uploadAudio:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

// ── PATCH /api/media/audio/:id ─────────────────────────────────────────────────
// Only allows editing metadata fields — never storage, ownerId, or uuid
const updateAudio = async (req, res) => {
	const EDITABLE_FIELDS = [
		"title",
		"artist",
		"artists",
		"album",
		"genre",
		"year",
		"category",
		"visibility",
	];

	// Strip out anything the client shouldn't be able to change
	const updates = {};
	for (const field of EDITABLE_FIELDS) {
		if (req.body[field] !== undefined) updates[field] = req.body[field];
	}

	if (Object.keys(updates).length === 0) {
		return res
			.status(400)
			.json({ success: false, message: "No valid fields to update" });
	}

	try {
		const audio = await AudioModel.findById(req.params.id);

		if (!audio) {
			return res
				.status(404)
				.json({ success: false, message: "Audio not found" });
		}

		// Ownership check — only the uploader can edit their track
		if (audio.ownerId.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: "Forbidden" });
		}

		const updated = await AudioModel.findByIdAndUpdate(
			req.params.id,
			{ $set: updates },
			{ new: true, runValidators: true },
		);

		return res.status(200).json({ success: true, data: updated });
	} catch (err) {
		console.error("[Audio] updateAudio:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

// ── DELETE /api/media/audio/:id ────────────────────────────────────────────────
// Hard delete: removes audio from MinIO, cover image from MinIO + ImageModel, then AudioModel
const deleteAudio = async (req, res) => {
	try {
		const audio = await AudioModel.findById(req.params.id);

		if (!audio) {
			return res
				.status(404)
				.json({ success: false, message: "Audio not found" });
		}

		// Ownership check
		if (audio.ownerId.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: "Forbidden" });
		}

		// ── 1. Delete audio file from MinIO ────────────────────────────────────
		await deleteObject({ bucket: BUCKETS.audios, key: audio.storage.key });

		// ── 2. Delete cover art if it exists ──────────────────────────────────
		if (audio.coverImageId) {
			try {
				const coverImage = await ImageModel.findById(audio.coverImageId);
				if (coverImage) {
					await deleteObject({
						bucket: BUCKETS.images,
						key: coverImage.storage.key,
					});
					await ImageModel.findByIdAndDelete(audio.coverImageId);
				}
			} catch (err) {
				// Don't block the delete if cover cleanup fails
				console.error("[Audio] Cover cleanup failed:", err);
			}
		}

		// ── 3. Delete AudioModel record ────────────────────────────────────────
		await AudioModel.findByIdAndDelete(req.params.id);

		return res
			.status(200)
			.json({ success: true, message: "Audio deleted successfully" });
	} catch (err) {
		console.error("[Audio] deleteAudio:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

// createAudio is intentionally omitted — uploads go through uploadAudio
module.exports = {
	getAllAudios,
	getAudio,
	uploadAudio,
	updateAudio,
	deleteAudio,
};
