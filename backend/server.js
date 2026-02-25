require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/crestDB';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
