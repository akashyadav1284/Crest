const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST Add an event (Protected)
router.post('/', auth, async (req, res) => {
    const { eventTitle, description, date, time, venue, status, registrationLink, color } = req.body;

    const event = new Event({
        eventTitle,
        description,
        date,
        time,
        venue,
        status,
        registrationLink,
        color
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT Update an event (Protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const eventId = req.params.id;
        const updates = { ...req.body, updatedAt: Date.now() };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, { $set: updates }, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an event (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

        res.json({ message: 'Event removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
