const mongoose = require('mongoose');

const HackTeamSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    teamName: { type: String, required: true },
    memberCount: { type: Number, required: true },
    leaderName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    course: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HackTeam', HackTeamSchema);
