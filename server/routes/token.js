const router = require("express").Router();
const { verifyToken } = require("../controllers/authTokenController");
router.get("/", verifyToken);

module.exports = router;
