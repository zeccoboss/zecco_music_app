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
		let {
			limit = 20,
			cursor, // Base64 encoded string: "timestamp_id"
			artist,
			album,
			genre,
			year,
			hasAudio,
			hasCover,
			ownerId,
			q,
			sortBy = "createdAt",
			order = "desc",
		} = req.query;

		const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
		const sortOrder = order === "asc" ? 1 : -1;

		// 1. Build Filter
		const filter = {};

		// Helper to escape regex special characters (Security Fix)
		const safeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

		if (artist) filter.artist = { $regex: safeRegex(artist), $options: "i" };
		if (album) filter.album = { $regex: safeRegex(album), $options: "i" };
		if (year) filter.year = parseInt(year);
		if (hasAudio !== undefined) filter.hasAudio = hasAudio === "true";
		if (hasCover !== undefined) filter.hasCover = hasCover === "true";

		if (genre) {
			filter.genre = { $in: genre.split(",").map((g) => g.trim()) };
		}

		if (q) {
			const searchRegex = { $regex: safeRegex(q), $options: "i" };
			filter.$or = [
				{ title: searchRegex },
				{ artist: searchRegex },
				{ album: searchRegex },
			];
		}

		// Visibility & Ownership Logic
		const isOwner =
			ownerId && req.user && ownerId.toString() === req.user._id.toString();
		if (isOwner) {
			filter.ownerId = ownerId;
		} else {
			filter.visibility = "public";
			if (ownerId) filter.ownerId = ownerId;
		}

		// 2. Advanced Cursor Logic (Tie-breaker Fix)
		if (cursor) {
			try {
				// Decode Base64 cursor
				const decodedCursor = Buffer.from(cursor, "base64").toString(
					"ascii",
				);
				const [cursorTime, cursorId] = decodedCursor.split("_");

				const cursorDate = new Date(cursorTime);
				const op = order === "asc" ? "$gt" : "$lt";

				// This logic ensures no records are skipped if they share the same timestamp
				filter.$or = [
					{ createdAt: { [op]: cursorDate } },
					{
						createdAt: cursorDate,
						_id: { [op]: cursorId },
					},
				];
			} catch (e) {
				return res
					.status(400)
					.json({ success: false, message: "Invalid cursor format" });
			}
		}

		// 3. Database Query
		const audios = await AudioModel.find(filter)
			.populate(
				"coverImageId",
				"uuid name format dimensions storage.baseUrl storage.key",
			)
			.select("-__v")
			.sort({
				createdAt: sortOrder,
				_id: sortOrder, // Always sort by ID as secondary to ensure stability
			})
			.limit(limitNum + 1)
			.lean(); // Faster performance for read-only ops

		// 4. Pagination Metadata
		const hasNextPage = audios.length > limitNum;
		if (hasNextPage) audios.pop();

		let nextCursor = null;
		if (hasNextPage) {
			const lastItem = audios[audios.length - 1];
			// Create a compound string "timestamp_id" and encode it
			const rawCursor = `${lastItem.createdAt.toISOString()}_${lastItem._id}`;
			nextCursor = Buffer.from(rawCursor).toString("base64");
		}

		return res.status(200).json({
			success: true,
			data: audios,
			nextCursor,
			hasNextPage,
			count: audios.length,
		});
	} catch (err) {
		console.error("[Audio] getAllAudios Error:", err);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// ── GET /api/media/audio/:id ───────────────────────────────────────────────────
const getAudio = async (req, res) => {
	try {
		const audio = await AudioModel.findOne({
			uuid: req.params.uuid,
		}).populate("coverImageId", "storage dimensions format uuid");

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
		const audio = await AudioModel.findOne({ uuid: req.params.uuid });

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
		const audio = await AudioModel.findOne({ uuid: req.params.uuid });

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
