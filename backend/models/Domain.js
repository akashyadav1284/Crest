const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    quote: { type: String },
    icon: { type: String, default: '01' },
    order: { type: Number, default: 0 },
    colorTheme: { type: String, enum: ['cyan', 'magenta', 'yellow', 'green', 'white'], default: 'cyan' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Domain', DomainSchema);
