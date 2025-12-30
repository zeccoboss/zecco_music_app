const usersAuthController = require("../controllers/usersAuthController");
const router = require("express").Router();

router.post("/", usersAuthController.handleLogin);

module.exports = router;
