const router = require("express").Router();
const socialController = require("../../controllers/social.controller");
const verifyJWT = require("../../middlewares/verify-jwt.middleware");

router.use(verifyJWT);

// Use UUIDs in the URL for security/consistency
router.post("/follow/:targetUuid", socialController.followUser);
router.post("/unfollow/:targetUuid", socialController.unfollowUser);

module.exports = router;
