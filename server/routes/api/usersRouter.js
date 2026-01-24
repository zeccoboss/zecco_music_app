const { ROLES_LIST } = require("../../config/roles_list");
const usersControllers = require("../../controllers/usersController");
const { verifyRoles } = require("../../middlewares/verifyRoles");
const router = require("express").Router();

router
	.route("/")
	.get(usersControllers.getAllUsers)
	.post(
		verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Editor),
		usersControllers.createUser
	)
	.put(
		verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Editor),
		usersControllers.updateUser
	)
	.delete(verifyRoles(ROLES_LIST.Editor), usersControllers.deleteUser);

router.get("/:id", usersControllers.getUser);

module.exports = router;
