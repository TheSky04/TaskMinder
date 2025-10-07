const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const limiter = require("./middleware/rateLimit");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require('./routes/taskRoutes');

require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// app.use(limiter);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);


app.use(express.json());

app.listen(5000, () => console.log("Server running on port 5000"));
