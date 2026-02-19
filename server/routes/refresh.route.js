const refreshTokenController = require("../controllers/refresh-token.controller");
const router = require("express").Router();

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
