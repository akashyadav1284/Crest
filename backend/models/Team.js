const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    imageURL: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);
