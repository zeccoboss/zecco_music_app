const { profileController } = require("../controllers/profile.controller");

const router = require("express").Router();
router.get("/", profileController);

module.exports = router;
