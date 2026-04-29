const { rolesList } = require("../../config/roles-list.config");
const usersControllers = require("../../controllers/users.controller");
const { verifyRoles } = require("../../middlewares/verify-roles.middleware");
const router = require("express").Router();

const { validate } = require("../../middlewares/validate.middleware");
const { updateUserSchema } = require("../../validators/user.validator");
const createUserSchema =
	require("../../validators/user.validator").createUserSchema;

// users.route.js
router.get("/", verifyRoles(rolesList.Admin), usersControllers.getAllUsers);
router.get("/:id", usersControllers.getUser);
router.post(
	"/",
	verifyRoles(rolesList.Admin),
	validate(createUserSchema),
	usersControllers.createUser,
);
router.put("/me", validate(updateUserSchema), usersControllers.updateUser); // 👈 /me not /:id
router.delete("/:id", usersControllers.deleteUser); // ownership check is inside the controller

router.get("/:id", usersControllers.getUser);

module.exports = router;
