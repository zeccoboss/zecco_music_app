const usersAuthController = require("../controllers/usersAuthController");
const router = require("express").Router();

router.post("/", usersAuthController.validateLogin);

module.exports = router;
