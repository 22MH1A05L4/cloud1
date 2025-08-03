const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String
});

module.exports = mongoose.model('Agent', agentSchema);
