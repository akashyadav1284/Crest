const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true },
    hashedPassKey: { type: String, required: true },
    role: { type: String, default: 'admin' },
    accessLevel: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', AdminSchema);
