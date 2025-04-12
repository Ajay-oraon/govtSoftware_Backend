// userRoutes.js
const express = require("express");
const { User } = require("../models");
const UserController = require("../controllers/userController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();
const userController = new UserController(User);

router.post(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  userController.createUser.bind(userController)
);
router.get(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  userController.getAllUsers.bind(userController)
);
router.get(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  userController.getUser.bind(userController)
);
router.put(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  userController.updateUser.bind(userController)
);

router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  userController.deleteUser.bind(userController)
);

module.exports = router;
