const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
    location: { type: String, required: true },
    desc: { type: String, required: true },
    color: { type: String, enum: ['cyan', 'magenta', 'yellow', 'green'], default: 'cyan' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
