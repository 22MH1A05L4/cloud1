const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, default: '' },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Task', taskSchema);
