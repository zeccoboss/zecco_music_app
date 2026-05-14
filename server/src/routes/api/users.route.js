const router = require("express").Router();
const usersControllers = require("../../controllers/users/users.controller");
const { rolesList } = require("../../config/roles-list.config");
const { verifyRoles } = require("../../middlewares/verify-roles.middleware");
const { validate } = require("../../middlewares/validate.middleware"); // Added
const { createUserSchema } = require("../../validators/user.validator");
const verifyJWT = require("../../middlewares/verify-jwt.middleware");

// ── PUBLIC ROUTES ───────────────────────────────────────────
// Accessible by anyone (guests and logged-in users)
router.route("/profile/:identifier").get(usersControllers.getUserProfile);

// ── PROTECTED ROUTES ────────────────────────────────────────
// Everything below this requires a valid login
router.use(verifyJWT);

// ── ADMIN ONLY ROUTES ───────────────────────────────────────
router.use(verifyRoles(rolesList.Admin));

router
	.route("/")
	.get(usersControllers.getAllUsers)
	.post(validate(createUserSchema), usersControllers.createUser);

router.route("/:uuid").delete(usersControllers.deleteUser);

module.exports = router;
