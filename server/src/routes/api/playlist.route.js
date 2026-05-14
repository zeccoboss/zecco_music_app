const router = require("express").Router();
const playlistController = require("../../controllers/media/playlist.controller");
const verifyJWT = require("../../middlewares/verify-jwt.middleware");

// Creation and General Retrieval
router.post("/", verifyJWT, playlistController.createPlaylist);
// router.get("/", playlistController.getAllPublicPlaylists); // For Discovery/Search later

// Specific Playlist Actions (Resource-based)
router.patch("/:uuid", verifyJWT, playlistController.updatePlaylist);
router.delete("/:uuid", verifyJWT, playlistController.deletePlaylist);

// Item Management
router.post(
	"/items/toggle",
	verifyJWT,
	playlistController.toggleTrackInPlaylist,
);

module.exports = router;
