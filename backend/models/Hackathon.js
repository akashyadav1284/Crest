const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
    hackathonName: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    duration: { type: String, required: true },
    venue: { type: String, required: true },
    participants: { type: String, required: true },
    organizer: { type: String, required: true },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
    registrationLink: { type: String },
    bannerImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
