const express = require('express');
const router = express.Router();
const JoinRequest = require('../models/JoinRequest');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// GET all join requests (Protected)
router.get('/', auth, async (req, res) => {
    try {
        const requests = await JoinRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST Submit a join request (Public)
router.post('/', async (req, res) => {
    const { name, email, department, interestDomain } = req.body;

    const request = new JoinRequest({
        name,
        email,
        department,
        interestDomain
    });

    try {
        const newReq = await request.save();
        res.status(201).json(newReq);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT Update request status (Protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const { requestStatus, remarks, addToTeam } = req.body;
        const reqId = req.params.id;

        const updatedReq = await JoinRequest.findByIdAndUpdate(reqId, { $set: { requestStatus, remarks } }, { new: true });
        if (!updatedReq) return res.status(404).json({ message: 'Request not found' });

        if (requestStatus === 'approved' && addToTeam) {
            const newTeamMember = new Team({
                name: updatedReq.name,
                role: 'Member',
                imageURL: 'https://via.placeholder.com/150', // placeholder image
            });
            await newTeamMember.save();
        }

        res.json(updatedReq);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a join request (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const reqId = req.params.id;
        const deletedReq = await JoinRequest.findByIdAndDelete(reqId);
        if (!deletedReq) return res.status(404).json({ message: 'Request not found' });

        res.json({ message: 'Request removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
