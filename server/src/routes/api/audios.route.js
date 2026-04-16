const audiosControllers = require("../../controllers/audio.controller");
const verifyJWT = require("../../middlewares/verify-jwt.middleware");
const uploader = require("../../middlewares/multer.middleware");
const router = require("express").Router();

const { uploadAudio } = audiosControllers;

router
	.get("/", audiosControllers.getAllAudios)
	.get("/:uuid", uploader.single("audio"), audiosControllers.getAudio)
	.delete("/:uuid", audiosControllers.deleteAudio)
	.put("/:uuid", audiosControllers.updateAudio)
	.post("/upload", verifyJWT, uploader.single("audio"), uploadAudio);

module.exports = router;
