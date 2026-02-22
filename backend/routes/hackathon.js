const express = require('express');
const router = express.Router();
const HackTeam = require('../models/HackTeam');

// Submit a new hackathon team registration
router.post('/register', async (req, res) => {
    try {
        const team = new HackTeam({
            eventId: req.body.eventId,
            teamName: req.body.teamName,
            memberCount: req.body.members,
            leaderName: req.body.name,
            registrationNumber: req.body.regNo,
            course: req.body.course,
            yearOfStudy: req.body.year,
            email: req.body.email,
            phone: req.body.phone
        });

        const savedTeam = await team.save();
        res.status(201).json({ success: true, teamId: savedTeam._id });
    } catch (err) {
        console.error("Hackathon Registration Error:", err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Mock endpoint to finalize payment
router.post('/payment/:teamId', async (req, res) => {
    try {
        const team = await HackTeam.findByIdAndUpdate(
            req.params.teamId,
            { paymentStatus: 'completed' },
            { new: true }
        );

        if (!team) return res.status(404).json({ success: false, message: "Team not found" });

        res.status(200).json({ success: true, message: "Payment confirmed", team });
    } catch (err) {
        console.error("Payment Confirmation Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
