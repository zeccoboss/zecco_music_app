const router = require("express").Router();

// Controllers
const authController = require("../../controllers/users-auth.controller");
const {
	handleVerifyEmail,
	handleResendEmailVerification,
} = require("../../controllers/auth-token.controller");
const {
	handleForgotPassword,
	handleResetPassword,
} = require("../../controllers/auth-password.controller");

// Middlewares
const { validate } = require("../../middlewares/validate.middleware");
const {
	loginLimiter,
	registerLimiter,
	forgotPasswordLimiter,
} = require("../../middlewares/rate-limit.middleware");

// Validators
const {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
} = require("../../validators/auth.validator");

// ================= AUTH ROUTES =================

// Register
router.post(
	"/register",
	registerLimiter,
	validate(registerSchema),
	authController.handleRegister,
);

// Login
router.post(
	"/login",
	loginLimiter,
	validate(loginSchema),
	authController.handleLogin,
);

// Login
router.post(
	"/logout",
	// loginLimiter,
	// validate(loginSchema),
	authController.handleLogout,
);

// Forgot password (send reset link)
router.post(
	"/forgot-password",
	forgotPasswordLimiter,
	validate(forgotPasswordSchema),
	handleForgotPassword,
);

// Reset password (with token)
router.post(
	"/reset-password",
	loginLimiter,
	validate(resetPasswordSchema),
	handleResetPassword,
);

// ================= EMAIL VERIFICATION =================

// Verify email
router.get("/verify/:token", handleVerifyEmail);

// Resend verification email
router.post(
	"/resend-verification",
	forgotPasswordLimiter,
	handleResendEmailVerification,
);

module.exports = router;
