const uploader = require("../../middlewares/multer.middleware");
const router = require("express").Router();
const { validate } = require("../../middlewares/validate.middleware");
const { updateAudioSchema } = require("../../validators/audio.validator");
const multer = require("multer");

const {
	getAllAudios,
	getAudio,
	uploadAudio,
	updateAudio,
	deleteAudio,
} = require("../../controllers/user-audio.controller");

const { streamAudio } = require("../../controllers/audio.stream.controller");

router.get("/", getAllAudios);
router.get("/:id", getAudio);
router.get("/:id/stream", streamAudio);
router.post("/upload", uploader.single("audio"), uploadAudio);
router.patch("/:id", validate(updateAudioSchema), updateAudio);
router.delete("/:id", deleteAudio);

// Multer error handling middleware
router.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return res.status(400).json({ success: false, message: err.message });
	}
	if (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
	next();
});

module.exports = router;
