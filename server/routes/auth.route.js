const usersAuthController = require("../controllers/users-auth.controller");
const { verifyToken } = require("../controllers/auth-token.controller");

const router = require("express").Router();

router.post("/register", usersAuthController.handleRegister);
router.post("/login", usersAuthController.handleLogin);
router.post("/logout", usersAuthController.handleLogout);
router.get("/verify/:token", verifyToken);

module.exports = router;
