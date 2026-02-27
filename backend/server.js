require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet()); // Secure HTTP headers

// Rate Limiting (100 requests per 15 minutes)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests from this IP, please try again later.' }
});

// Configure CORS
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Apply Rate Limiting globally to all /api/ endpoints
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/join', require('./routes/join'));
app.use('/api/hackathons', require('./routes/hackathon'));
app.use('/api/hackathons/admin', require('./routes/hackathons-admin'));
app.use('/api/team', require('./routes/team'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/homepage', require('./routes/homepage'));
app.use('/api/domains', require('./routes/domains'));
app.use('/api/announcements', require('./routes/announcements'));

// Connect to MongoDB Atlas (Production-Ready)
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('FATAL ERROR: MONGO_URI is missing in .env');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB Atlas connected successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️ Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected! Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected successfully...');
});

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
