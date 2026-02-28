const mongoose = require('mongoose');

const JoinRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String },
    interestDomain: { type: String },
    requestStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    remarks: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JoinRequest', JoinRequestSchema);
