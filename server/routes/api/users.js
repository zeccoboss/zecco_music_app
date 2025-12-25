const usersControllers = require("../../controllers/usersController");
const router = require("express").Router();

router
	.route("/")
	.get(usersControllers.getAllUsers)
	.post(usersControllers.createUser)
	.delete(usersControllers.deleteUser)
	.put(usersControllers.updateUser);

router.get("/:id", usersControllers.getUser);

module.exports = router;
