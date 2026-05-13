const uploader = require("../../middlewares/multer.middleware");
const router = require("express").Router();
const { validate } = require("../../middlewares/validate.middleware");
const { updateAudioSchema } = require("../../validators/audio.validator");
const multer = require("multer");
const verifyJWT = require("../../middlewares/verify-jwt.middleware");

const {
	getAllAudios,
	getAudio,
	uploadAudio,
	updateAudio,
	deleteAudio,
} = require("../../controllers/audio.controller");

const { streamAudio } = require("../../controllers/audio.stream.controller");

// Public reads
router.get("/", getAllAudios);
router.get("/:uuid", getAudio);

// Actions (resource-based)
router.get("/:uuid/stream", verifyJWT, streamAudio);
// router.get("/:uuid/download", verifyJWT, downloadAudio); // TODO: to be added later
// router.get("/:uuid/metadata", getAudioMetadata); // TODO: to be added later

// Upload
router.post("/upload", verifyJWT, uploader.single("audio"), uploadAudio);

// Mutations
router.patch("/:uuid", verifyJWT, validate(updateAudioSchema), updateAudio);
router.delete("/:uuid", verifyJWT, deleteAudio);

// TODO: Add them later
// Future features
// router.post("/:uuid/like")
// router.post("/:uuid/comment")
// router.post("/:uuid/share")
// Multer error handling middleware

router.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return res.status(400).json({ success: false, message: err.message });
	}
	if (err) {
		console.error("Unexpected error in Multer middleware:", err);
		return res.status(400).json({ success: false, message: err.message });
	}
	next();
});

module.exports = router;
