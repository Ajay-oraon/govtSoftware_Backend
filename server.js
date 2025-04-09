const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const workRoutes = require("./src/routes/workRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const userRoutes = require("./src/routes/userRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// For production (more secure)
app.use(
  cors({
    origin: ["http://localhost:53914", "https://your-flutter-web-domain.com"], // replace with actual Flutter web domain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/work", workRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api", userRoutes);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error syncing database:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
