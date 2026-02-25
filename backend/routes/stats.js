const express = require('express');
const router = express.Router();
const SiteStat = require('../models/SiteStat');
const auth = require('../middleware/auth');

// GET /api/stats
// Public route to get all stats
router.get('/', async (req, res) => {
    try {
        const stats = await SiteStat.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/stats
// Protected route to create or update a stat
router.post('/', auth, async (req, res) => {
    const { label, value, description } = req.body;
    try {
        let stat = await SiteStat.findOne({ label });
        if (stat) {
            stat.value = value;
            stat.description = description;
            stat.updatedAt = Date.now();
            await stat.save();
            return res.json(stat);
        }

        stat = new SiteStat({ label, value, description });
        await stat.save();
        res.json(stat);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/stats/:id
// Protected route to delete a stat
router.delete('/:id', auth, async (req, res) => {
    try {
        await SiteStat.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Stat removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
