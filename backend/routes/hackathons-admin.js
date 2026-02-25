const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const auth = require('../middleware/auth');

// GET all hackathons
router.get('/', async (req, res) => {
    try {
        const hackathons = await Hackathon.find().sort({ createdAt: -1 });
        res.json(hackathons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single hackathon by id
router.get('/:id', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);
        if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });
        res.json(hackathon);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST Add a new hackathon (Protected)
router.post('/', auth, async (req, res) => {
    const { hackathonName, description, date, duration, venue, participants, organizer, status, registrationLink, bannerImage } = req.body;

    const hackathon = new Hackathon({
        hackathonName,
        description,
        date,
        duration,
        venue,
        participants,
        organizer,
        status,
        registrationLink,
        bannerImage
    });

    try {
        const newHackathon = await hackathon.save();
        res.status(201).json(newHackathon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT Update a hackathon (Protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const updates = { ...req.body, updatedAt: Date.now() };

        const updatedHackathon = await Hackathon.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
        if (!updatedHackathon) return res.status(404).json({ message: 'Hackathon not found' });

        res.json(updatedHackathon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a hackathon (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedHackathon = await Hackathon.findByIdAndDelete(req.params.id);
        if (!deletedHackathon) return res.status(404).json({ message: 'Hackathon not found' });

        res.json({ message: 'Hackathon removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
