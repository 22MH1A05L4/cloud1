const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Task', taskSchema);
