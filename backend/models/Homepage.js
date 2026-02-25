const mongoose = require('mongoose');

const HomepageSchema = new mongoose.Schema({
    identifier: { type: String, required: true, unique: true, default: 'main' },
    heading: { type: String, required: true, default: 'We Innovate The Future.' },
    subheading: { type: String, required: true, default: 'CREST is a student-led innovation hub dedicated to empowering the next generation of technologists. We focus on breaking the barriers between theoretical knowledge and real-world application through project-based learning.' },
    showContent: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Homepage', HomepageSchema);
