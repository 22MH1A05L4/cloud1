const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task'); // adjust path based on your structure
const Agent = require('../models/agentModel');


const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  const agent = await Agent.findOne({ email });

  if (agent && (await bcrypt.compare(password, agent.password))) {
    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      token: generateToken(agent._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
// Register a new agent
const registerAgent = async (req, res) => {
  try {
    console.log('Received body:', req.body);

    const { name, email, mobile, password } = req.body;

if (!name || !email || !mobile || !password) {
  return res.status(400).json({ 
    message: 'All fields are required',
    received: { name, email, mobile}
  });
}


    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
    return res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      isAdmin: agent.isAdmin,
      token: generateToken(agent._id),
    });
  } catch (error) {
    
    console.error('Error in registerAgent:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Get agent profile
const getAgentProfile = async (req, res) => {
  try {
    const agent = await Agent.findById(req.user.id).select('-password');
    if (!agent) {
      return res.status(404).json({ msg: 'Agent not found' });
    }

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Get all agents (admin only)
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({}).select('-password');
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching agents" });
  }
};

// Update an agent
const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ msg: 'Agent not found' });
    }

    // Optional: allow only admin or same agent to update
    if (req.user.id !== req.params.id && !agent.isAdmin) {
      return res.status(403).json({ msg: 'Unauthorized to update this agent' });
    }

    agent.name = req.body.name || agent.name;
    agent.email = req.body.email || agent.email;
    agent.mobile = req.body.mobile || agent.mobile;

    if (req.body.password) {
      agent.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedAgent = await agent.save();
    res.json({
      _id: updatedAgent._id,
      name: updatedAgent.name,
      email: updatedAgent.email,
      mobile: updatedAgent.mobile,
      isAdmin: updatedAgent.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Delete an agent (admin only)
const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ msg: 'Agent not found' });
    }

    await agent.remove();
    res.json({ msg: 'Agent removed' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

const getTaskDistribution = async (req, res) => {
  try {
    const agents = await Agent.find();

    const distribution = await Promise.all(
      agents.map(async (agent) => {
        const count = await Task.countDocuments({ assignedTo: agent._id });
        return {
          agent: agent.name,
          agentId: agent._id,
          taskCount: count
        };
      })
    );

    res.status(200).json(distribution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching task distribution' });
  }
};

module.exports = {
  registerAgent,
  loginAgent,
  getAgentProfile,
  getAgents,
  updateAgent,
  deleteAgent,
  getTaskDistribution,
};
