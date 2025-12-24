const router = require("express").Router();
const path = require("node:path");

router.get("/", (_req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "views", "index.html"));
});

module.exports = router;
