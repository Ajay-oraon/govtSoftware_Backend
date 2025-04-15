const Role = require("../models/Role");
const User = require("../models/User");

// Create Role
exports.createRole = async (req, res) => {
  const { roleName, description, status, permissions } = req.body;

  try {
    const exists = await Role.findOne({ where: { roleName } });
    if (exists) return res.status(400).json({ message: "Role already exists" });

    const role = await Role.create({
      roleName,
      description,
      status,
      permissions,
    });

    res.status(201).json({ message: "Role created successfully", role });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all roles with users
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        { model: User, as: "users", attributes: ["id", "name", "email"] },
      ],
    });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        { model: User, as: "users", attributes: ["id", "name", "email"] },
      ],
    });
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  const { roleName, description, status, permissions } = req.body;

  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    role.roleName = roleName || role.roleName;
    role.description = description || role.description;
    role.status = status || role.status;
    role.permissions = permissions || role.permissions;
    await role.save();

    res.status(200).json({ message: "Role updated successfully", role });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    await role.destroy();
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
