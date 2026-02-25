const express = require('express');
const router = express.Router();
const Domain = require('../models/Domain');
const auth = require('../middleware/auth');

// @route   GET /api/domains
// @desc    Get all domains
// @access  Public
router.get('/', async (req, res) => {
    try {
        const domains = await Domain.find().sort({ order: 1, createdAt: 1 });
        res.json(domains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/domains
// @desc    Add a new domain
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description, icon, order, colorTheme } = req.body;

    try {
        const newDomain = new Domain({
            title,
            description,
            icon,
            order,
            colorTheme
        });

        const domain = await newDomain.save();
        res.json(domain);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/domains/:id
// @desc    Update a domain
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, description, icon, order, colorTheme } = req.body;

    try {
        let domain = await Domain.findById(req.params.id);
        if (!domain) return res.status(404).json({ msg: 'Domain not found' });

        domain.title = title || domain.title;
        domain.description = description || domain.description;
        domain.icon = icon || domain.icon;
        domain.order = order !== undefined ? order : domain.order;
        domain.colorTheme = colorTheme || domain.colorTheme;
        domain.updatedAt = Date.now();

        await domain.save();
        res.json(domain);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/domains/:id
// @desc    Delete a domain
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);
        if (!domain) return res.status(404).json({ msg: 'Domain not found' });

        await domain.deleteOne();
        res.json({ msg: 'Domain removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
