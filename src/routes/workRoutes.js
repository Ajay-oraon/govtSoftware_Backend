const express = require("express");
const router = express.Router();
const workController = require("../controllers/WorkController");
const { authenticateToken } = require("../middleware/authMiddleware");


router.get("/",authenticateToken, workController.getWorks);
router.post("/",authenticateToken, workController.createWork);

module.exports = router;
