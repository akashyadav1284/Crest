const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// GET /api/team
router.get('/', async (req, res) => {
    try {
        const teamMembers = await Team.find().sort({ createdAt: -1 });
        res.json(teamMembers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/team
router.post('/', auth, async (req, res) => {
    const { name, role, imageURL, linkedin, github } = req.body;
    try {
        const newMember = new Team({ name, role, imageURL, linkedin, github });
        const member = await newMember.save();
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT /api/team/:id
router.put('/:id', auth, async (req, res) => {
    try {
        let member = await Team.findById(req.params.id);
        if (!member) return res.status(404).json({ msg: 'Member not found' });

        member = await Team.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/team/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Member removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
