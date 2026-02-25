const express = require('express');
const router = express.Router();
const Homepage = require('../models/Homepage');
const auth = require('../middleware/auth');

// @route   GET /api/homepage
// @desc    Get homepage content
// @access  Public
router.get('/', async (req, res) => {
    try {
        let content = await Homepage.findOne({ identifier: 'main' });
        if (!content) {
            // Create default if not exists
            content = new Homepage({ identifier: 'main' });
            await content.save();
        }
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/homepage
// @desc    Update homepage content
// @access  Private
router.put('/', auth, async (req, res) => {
    const { heading, subheading, showContent } = req.body;

    try {
        let content = await Homepage.findOne({ identifier: 'main' });
        if (!content) {
            content = new Homepage({ identifier: 'main' });
        }

        content.heading = heading || content.heading;
        content.subheading = subheading || content.subheading;
        if (showContent !== undefined) {
            content.showContent = showContent;
        }
        content.updatedAt = Date.now();

        await content.save();
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
