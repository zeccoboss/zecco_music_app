const { profieController } = require("../controllers/profileController");

const router = require("express").Router();
router.get("/", profieController);

module.exports = router;
