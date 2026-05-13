const router = require("express").Router();
const {
	googleRedirect,
	googleCallback,
	gitHubRedirect,
	gitHubCallback,
} = require("../../controllers/oauth.controller");

// Google
router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);

// GitHub
router.get("/github", gitHubRedirect);
router.get("/github/callback", gitHubCallback);

module.exports = router;
