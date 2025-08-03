const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Task = require("../models/task");
const Agent = require("../models/agentModel");

const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = path.join(__dirname, "..", req.file.path);
    const results = [];

    // Read and parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        // Get all available agents
        const agents = await Agent.find();
        if (agents.length === 0) {
          return res.status(400).json({ message: "No agents found to assign tasks." });
        }

        // Distribute tasks equally
        const taskDocs = [];
        for (let i = 0; i < results.length; i++) {
          const taskData = results[i];
          const assignedAgent = agents[i % agents.length]; // Round-robin distribution

          const newTask = new Task({
            taskName: taskData.taskName || taskData.name || "Unnamed Task",
            description: taskData.description || "",
            assignedTo: assignedAgent._id,
          });

          taskDocs.push(newTask);
        }

        await Task.insertMany(taskDocs);
        return res.status(200).json({ message: "Tasks uploaded and distributed successfully." });
      });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ message: "Server error uploading CSV." });
  }
};

module.exports = { uploadCSV };
