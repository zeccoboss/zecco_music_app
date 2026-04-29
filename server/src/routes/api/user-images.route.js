const { updateImage } = require("../../controllers/user-images.controller");
const router = require("express").Router();
const multer = require("multer");

// ── Multer: memory storage, images only, 5 MB cap ─────────────────────────────
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Only image files are allowed"));
		}
		cb(null, true);
	},
});

router.patch("/me/images", upload.single("image"), updateImage);

// Catches Multer errors specifically — must be defined after the route
router.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		// e.g. LIMIT_FILE_SIZE
		return res.status(400).json({ success: false, message: err.message });
	}
	if (err) {
		// fileFilter rejection — "Only image files are allowed"
		return res.status(400).json({ success: false, message: err.message });
	}
	next();
});

module.exports = router;
