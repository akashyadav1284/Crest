const mongoose = require('mongoose');

const SystemLogSchema = new mongoose.Schema({
    action: { type: String, required: true }, // e.g., 'CREATE_DOMAIN', 'DELETE_EVENT'
    adminId: { type: String, required: true }, // ID of the admin who performed the action
    details: { type: String }, // JSON stringified details of the change
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SystemLog', SystemLogSchema);
