const bcrypt = require("bcryptjs");

class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const newUser = await this.userModel.create(userData);
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser.toJSON();
      res.status(201).json({message:"User Created",userWithoutPassword});
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }

  async getUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userModel.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userModel.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({users:users})
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  }

  // Inside class UserController
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedData = req.body;
      const user = await this.userModel.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.update(updatedData);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
}

module.exports = UserController;
