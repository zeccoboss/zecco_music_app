const AudioModel = require("../models/audio.model");
const { getPresignedUrl, BUCKETS } = require("../services/minio.service");

const streamAudio = async (req, res) => {
	try {
		// 👈 findOne by uuid not findById
		const audio = await AudioModel.findOne({ uuid: req.params.uuid }).select(
			"ownerId storage hasAudio visibility",
		);

		if (!audio) {
			return res
				.status(404)
				.json({ success: false, message: "Track not found" });
		}

		const isOwner = audio.ownerId.toString() === req.user._id.toString();

		if (!audio.hasAudio) {
			return res
				.status(422)
				.json({ success: false, message: "Track has no audio data" });
		}

		if (audio.visibility === "private" && !isOwner) {
			return res
				.status(403)
				.json({ success: false, message: "This track is private" });
		}

		const streamUrl = await getPresignedUrl({
			bucket: BUCKETS.audios,
			key: audio.storage.key,
			expiresIn: 60,
		});

		if (!streamUrl) {
			return res
				.status(500)
				.json({ success: false, message: "Could not generate stream URL" });
		}

		// 👈 findOneAndUpdate by uuid not findByIdAndUpdate
		await AudioModel.findOneAndUpdate(
			{ uuid: req.params.uuid },
			{ $inc: { playCount: 1 } },
		);

		return res.status(200).json({
			success: true,
			data: { streamUrl, expiresIn: 60 },
		});
	} catch (err) {
		console.error("[Audio] streamAudio:", err);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

module.exports = { streamAudio };
