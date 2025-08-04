const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const agentRoutes = require("./routes/agentRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Set default JWT_SECRET if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your-secret-key-change-in-production';
}

// Connect to MongoDB
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:9190",
  "http://localhost:3000",
  "https://goodproject-git-main-dhanushs-projects-45c3fd6e.vercel.app"
];
// Enable CORS for frontend-backend communication
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware to parse incoming JSON
app.use(express.json());

// API Routes
app.use("/api/agents", agentRoutes);
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
const PORT = process.env.PORT || 8998;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
