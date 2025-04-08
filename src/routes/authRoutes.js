const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

// Register a user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role,department } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
