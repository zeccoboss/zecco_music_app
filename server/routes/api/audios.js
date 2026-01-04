const audiosControllers = require("../../controllers/audiosController");
const router = require("express").Router();

router
	.route("/")
	.get(audiosControllers.getAllAudios)
	.post(audiosControllers.createAudio)
	.delete(audiosControllers.deleteAudio)
	.put(audiosControllers.updateAudio);

router.get("/:id", audiosControllers.getAudio);

module.exports = router;
