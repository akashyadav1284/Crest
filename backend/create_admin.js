require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/crestDB';

async function createAdmin() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');

        const adminId = 'admin';
        const passKey = 'admin123';

        let adminUser = await Admin.findOne({ adminId });
        if (adminUser) {
            console.log('Admin already exists! You can login with adminId: "admin".');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassKey = await bcrypt.hash(passKey, salt);

        adminUser = new Admin({
            adminId,
            hashedPassKey,
            role: 'superadmin',
            accessLevel: 5
        });

        await adminUser.save();
        console.log(`========================================`);
        console.log(`Admin created successfully!`);
        console.log(`Admin ID: ${adminId}`);
        console.log(`Pass Key: ${passKey}`);
        console.log(`========================================`);
        console.log(`Now you can login at /admin/login`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

createAdmin();
