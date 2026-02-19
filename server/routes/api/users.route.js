const { rolesList } = require("../../config/roles-list.config");
const usersControllers = require("../../controllers/users.controller");
const { verifyRoles } = require("../../middlewares/verify-roles.middleware");
const router = require("express").Router();

router
	.route("/")
	.get(usersControllers.getAllUsers)
	.post(
		verifyRoles(rolesList.Editor, rolesList.Editor),
		usersControllers.createUser,
	)
	.put(
		verifyRoles(rolesList.Editor, rolesList.Editor),
		usersControllers.updateUser,
	)
	.delete(verifyRoles(rolesList.Editor), usersControllers.deleteUser);

router.get("/:id", usersControllers.getUser);

module.exports = router;
