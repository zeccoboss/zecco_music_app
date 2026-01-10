const handleAudioUpload = require("../../controllers/uploadAudioController");
const router = require("express").Router();

router.post("/", handleAudioUpload);

module.exports = router;
