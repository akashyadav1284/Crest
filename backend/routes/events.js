const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add an event
router.post('/', async (req, res) => {
    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        status: req.body.status,
        location: req.body.location,
        desc: req.body.desc,
        color: req.body.color
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
