const { rolesList } = require("../../config/roles-list.config");
const usersControllers = require("../../controllers/users.controller");
const { verifyRoles } = require("../../middlewares/verify-roles.middleware");
const router = require("express").Router();
const verifyJWT = require("../../middlewares/verify-jwt.middleware");

const { validate } = require("../../middlewares/validate.middleware");
const { updateUserSchema } = require("../../validators/user.validator");
const createUserSchema =
	require("../../validators/user.validator").createUserSchema;

// Users (Admin only)
router.get("/", verifyRoles(rolesList.Admin), usersControllers.getAllUsers);

router.post(
	"/",
	verifyRoles(rolesList.Admin),
	validate(createUserSchema),
	usersControllers.createUser,
);

// Current logged-in user
router.get("/me", verifyJWT, usersControllers.getMe);

router.put(
	"/me",
	verifyJWT,
	validate(updateUserSchema),
	usersControllers.updateUser,
);

// User by ID (Admin only)
router.get("/:uuid", verifyRoles(rolesList.Admin), usersControllers.getUser);

router.delete(
	"/:uuid",
	verifyRoles(rolesList.Admin),
	usersControllers.deleteUser,
);
module.exports = router;
