const usersAuthController = require("../controllers/users-auth.controller");
const {
	handleVerifyEmail,
	handleResendEmailVerification,
} = require("../controllers/auth-token.controller");
const {
	handleForgotPassword,
	handleResetPassword,
} = require("../controllers/auth-password.controller");

const router = require("express").Router();
router.post("/register", usersAuthController.handleRegister);
router.post("/login", usersAuthController.handleLogin);
router.post("/logout", usersAuthController.handleLogout);
router.get("/verify/:token", handleVerifyEmail);
router.post("/resend-verification", handleResendEmailVerification);
router.post("/forgot-password", handleForgotPassword);
router.get("/reset-password/:token", handleResetPassword);

module.exports = router;
