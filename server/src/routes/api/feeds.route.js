const express = require("express");
const router = express.Router();
const optionalJWT = require("../../middlewares/optional-jwt.middleware");

const {
	getDiscover,
	getExplore,
	getForYou,
} = require("../../controllers/users/feeds.controller");

router.get("/discover", getDiscover);
router.get("/explore", getExplore);
router.get("/for-you", optionalJWT, getForYou);
// verifyJWT;

module.exports = router;
