// controllers/audio.stream.controller.js
const AudioModel = require("../models/audio.model");
const { getPresignedUrl, BUCKETS } = require("../services/minio.service");

// ── GET /api/media/audio/:id/stream ───────────────────────────────────────────
// Does NOT stream bytes through Express.
// Verifies access, then returns a short-lived MinIO presigned URL.
// The frontend fetches audio directly from MinIO using that URL.
const streamAudio = async (req, res) => {
	try {
		const audio = await AudioModel.findById(req.params.id).select(
			"ownerId storage hasAudio",
		);

		// Only the owner can stream private tracks, but public/unlisted tracks are streamable by anyone
		const isOwner = audio.ownerId.toString() === req.user._id.toString();

		if (!audio) {
			return res
				.status(404)
				.json({ success: false, message: "Track not found" });
		}

		if (!audio.hasAudio) {
			return res
				.status(422)
				.json({ success: false, message: "Track has no audio data" });
		}

		// Access control: private tracks can only be streamed by the owner
		if (audio.visibility === "private" && !isOwner) {
			return res
				.status(403)
				.json({ success: false, message: "This track is private" });
		}

		// ── Generate presigned URL (60 seconds) ────────────────────────────────
		const streamUrl = await getPresignedUrl({
			bucket: BUCKETS.audios,
			key: audio.storage.key,
			expiresIn: 60,
		});

		if (!streamUrl) {
			return res.status(500).json({
				success: false,
				message: "Could not generate stream URL",
			});
		}

		return res.status(200).json({
			success: true,
			data: {
				streamUrl,
				expiresIn: 60, // tell the frontend how long the URL is valid
			},
		});
	} catch (err) {
		console.error("[Audio] streamAudio:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

module.exports = { streamAudio };
