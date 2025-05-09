const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  roleController.getAllRoles
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  roleController.getRoleById
);
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  roleController.createRole
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  roleController.updateRole
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  roleController.deleteRole
);

module.exports = router;
