const audiosControllers = require("../../controllers/audiosController");
const verifyJWT = require("../../middlewares/verifyJWT");
const uploader = require("../../middlewares/multer");
const router = require("express").Router();

const { handleAudioUpload } = audiosControllers;

router
	.get("/", audiosControllers.getAllAudios)
	.get("/:uuid", uploader.single("audio"), audiosControllers.getAudio)
	.delete("/:uuid", audiosControllers.deleteAudio)
	.put("/:uuid", audiosControllers.updateAudio)
	.post("/upload", verifyJWT, uploader.single("audio"), handleAudioUpload);

module.exports = router;
