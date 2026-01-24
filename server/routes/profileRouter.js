const { profileController } = require("../controllers/profileController");

const router = require("express").Router();
router.get("/", profileController);

module.exports = router;
