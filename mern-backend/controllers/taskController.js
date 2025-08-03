const Task = require('../models/task');
const Agent = require('../models/agentModel');
const fs = require('fs');
const csv = require('csv-parser');

// Route 1: Get task distribution
exports.getTaskDistribution = async (req, res) => {
  try {
    const agents = await Task.distinct('assignedTo');
    const response = [];

    for (const agent of agents) {
      if (!agent) continue; // skip unassigned
      const tasks = await Task.find({ assignedTo: agent });
      response.push({ agentName: agent, assignedTasks: tasks });
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Route 2: Distribute tasks equally
exports.distributeTasksEqually = async (req, res) => {
  try {
    const agents = await Agent.find();
    const unassignedTasks = await Task.find({ assignedTo: null });

    if (agents.length === 0 || unassignedTasks.length === 0) {
      return res.status(400).json({ message: 'No agents or unassigned tasks available' });
    }

    const agentCount = agents.length;
    const distributed = [];

    for (let i = 0; i < unassignedTasks.length; i++) {
      const agentIndex = i % agentCount;
      const agent = agents[agentIndex];
      unassignedTasks[i].assignedTo = agent.name;
      await unassignedTasks[i].save();
      distributed.push({ task: unassignedTasks[i]._id, assignedTo: agent.name });
    }

    res.status(200).json({ message: 'Tasks distributed equally', distributed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Task distribution failed' });
  }
};

// Route 3: Upload CSV
exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await Task.insertMany(results);
        res.status(200).json({ message: 'CSV uploaded successfully', inserted: results.length });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};
