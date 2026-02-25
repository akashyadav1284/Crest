const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { adminId, passKey } = req.body;

    try {
        let adminUser = await Admin.findOne({ adminId });
        if (!adminUser) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(passKey, adminUser.hashedPassKey);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            admin: {
                id: adminUser.id,
                role: adminUser.role,
                accessLevel: adminUser.accessLevel
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'fallback_secret_crest',
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, admin: payload.admin });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/auth/create - just for testing/bootstrap purposes
router.post('/create', async (req, res) => {
    // Ideally this route would be disabled in production or protected by another super-admin key
    const { adminId, passKey } = req.body;
    try {
        let adminUser = await Admin.findOne({ adminId });
        if (adminUser) return res.status(400).json({ msg: 'Admin already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassKey = await bcrypt.hash(passKey, salt);

        adminUser = new Admin({
            adminId,
            hashedPassKey
        });

        await adminUser.save();
        res.json({ msg: 'Admin created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
