const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventTitle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    speaker: { type: String },
    mode: { type: String },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
    registrationLink: { type: String },
    imageURL: { type: String },
    color: { type: String, enum: ['cyan', 'magenta', 'yellow', 'green'], default: 'cyan' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
