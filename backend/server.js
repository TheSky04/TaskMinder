const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const limiter = require("./middleware/rateLimit");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(limiter);

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
