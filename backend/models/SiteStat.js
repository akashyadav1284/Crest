const mongoose = require('mongoose');

const SiteStatSchema = new mongoose.Schema({
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    description: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SiteStat', SiteStatSchema);
