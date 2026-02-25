const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Domain = require('./models/Domain');

dotenv.config();
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crestDB')
    .then(async () => {
        const domains = await Domain.find();
        console.log("DOMAINS IN DB:", domains);
        process.exit(0);
    });
