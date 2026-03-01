const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const auth = require('../middleware/auth');

// @route   GET /api/announcements
// @desc    Get all active announcements
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Optionally sort by newest first
        const announcements = await Announcement.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/announcements/all
// @desc    Get all announcements (active and inactive) for Admin
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/announcements
// @desc    Add a new announcement
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, message, isActive } = req.body;

    try {
        const newAnnouncement = new Announcement({
            title,
            message,
            isActive: isActive !== undefined ? isActive : true
        });

        const announcement = await newAnnouncement.save();
        res.json(announcement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/announcements/:id
// @desc    Update an announcement
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, message, isActive } = req.body;

    try {
        let announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ msg: 'Announcement not found' });

        announcement.title = title || announcement.title;
        announcement.message = message || announcement.message;
        announcement.isActive = isActive !== undefined ? isActive : announcement.isActive;

        await announcement.save();
        res.json(announcement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/announcements/:id
// @desc    Delete an announcement
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ msg: 'Announcement not found' });

        await announcement.deleteOne();
        res.json({ msg: 'Announcement removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
