const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require('mongoose');

const taskRoutes = require("./routes/taskRoutes");
const agentRoutes = require("./routes/agentRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB

const app = express();

// Enable CORS for frontend-backend communication
app.use(cors({ origin: "https://cloud1-gh3ldsqkj-dhanushs-projects-45c3fd6e.vercel.app", credentials: true }));

// Middleware to parse incoming JSON
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agentdb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// API Routes
app.use("/api/agent", agentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/tasks", taskRoutes);



// Serve uploaded files from "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
