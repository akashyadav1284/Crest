const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '01' },
    order: { type: Number, default: 0 },
    colorTheme: { type: String, enum: ['cyan', 'magenta', 'yellow', 'green', 'white'], default: 'cyan' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Domain', DomainSchema);
