const { Role } = require("../models");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error fetching roles" });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { roleName, description, permissions, status } = req.body;
    const role = await Role.create({
      roleName,
      description,
      permissions,
      status,
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: "Error creating role" });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, description, permissions, status } = req.body;
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ error: "Role not found" });

    await role.update({ roleName, description, permissions, status });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Error updating role" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ error: "Role not found" });

    await role.destroy();
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting role" });
  }
};
