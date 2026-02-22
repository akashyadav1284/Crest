const express = require('express');
const router = express.Router();
const JoinRequest = require('../models/JoinRequest');

// Get all join requests
router.get('/', async (req, res) => {
    try {
        const requests = await JoinRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Submit a join request
router.post('/', async (req, res) => {
    const request = new JoinRequest({
        name: req.body.name,
        registrationNumber: req.body.regNo,
        email: req.body.email,
        skillset: req.body.skillset
    });

    try {
        const newReq = await request.save();
        res.status(201).json(newReq);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
