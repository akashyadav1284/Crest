const mongoose = require('mongoose');

const JoinRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    email: { type: String, required: true },
    skillset: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JoinRequest', JoinRequestSchema);
