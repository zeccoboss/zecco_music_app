const usersAuthController = require("../controllers/usersAuthController");
const { verifyToken } = require("../controllers/authTokenController");

const router = require("express").Router();

router.post("/register", usersAuthController.handleRegister);
router.post("/login", usersAuthController.handleLogin);
router.post("/logout", usersAuthController.handleLogout);
router.get("/verify/:token", verifyToken);

module.exports = router;
