const router = require("express").Router();
const searchController = require("../../controllers/media/search.controller");

// Search is usually public — users don't need to log in to browse music
router.get("/", searchController.searchAll);
router.get("/suggestions", searchController.getSuggestions);

module.exports = router;
