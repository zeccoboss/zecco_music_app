const router = require("express").Router();
const adminController = require("../../controllers/users/admin.controller");
const verifyJWT = require("../../middlewares/verify-jwt.middleware");
const { verifyRoles } = require("../../middlewares/verify-roles.middleware");
const { rolesList } = require("../../config/roles-list.config");

// All routes in this file require being logged in AND having the Admin role
router.use(verifyJWT);
router.use(verifyRoles(rolesList.Admin));

// Dashboard Stats (Total users, total tracks, storage used)
router.get("/stats", adminController.getDashboardStats);

// Content Management
router.get("/tracks", adminController.getAllTracks);
router.delete("/tracks/:uuid", adminController.deleteTrackAsAdmin);

// User Management (Already partially in your users.route.js)
router.patch("/users/:uuid/role", adminController.updateUserRole);

// Toggle user status (Ban/Unban)
router.patch("/users/:uuid/status", adminController.toggleUserStatus);

module.exports = router;
