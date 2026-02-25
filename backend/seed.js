// Seed script to migrate hardcoded frontend data to MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crestDB')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    });

// Import Models
const Domain = require('./models/Domain');
const Event = require('./models/Event');
const Hackathon = require('./models/Hackathon'); // We'll create this model next

const seedData = async () => {
    try {
        console.log('Clearing existing seeded collections (optional)...');
        // await Domain.deleteMany(); // Uncomment if you want to flush Domains first

        console.log('Seeding Core Domains...');
        const domains = [
            { title: "Robotics", icon: "<Cpu size={32} />", colorTheme: "cyan", description: "Automated hardware systems.", order: 1 },
            { title: "Artificial Intelligence", icon: "<BrainCircuit size={32} />", colorTheme: "magenta", description: "Machine learning & neural networks.", order: 2 },
            { title: "Blockchain", icon: "<Blocks size={32} />", colorTheme: "yellow", description: "Decentralized Web3 architectures.", order: 3 },
            { title: "AR / VR", icon: "<View size={32} />", colorTheme: "green", description: "Immersive spatial computing.", order: 4 },
            { title: "Internet of Things", icon: "<Radio size={32} />", colorTheme: "cyan", description: "Connected smart devices.", order: 5 },
            { title: "Web Development", icon: "<Code size={32} />", colorTheme: "magenta", description: "High-performance full-stack web apps.", order: 6 },
        ];

        // Only insert if collection is empty to prevent duplicates on rerun
        const existingDomains = await Domain.countDocuments();
        if (existingDomains === 0) {
            await Domain.insertMany(domains);
            console.log('✅ Core Domains Seeded');
        } else {
            console.log(`⚠️ Domains collection already has ${existingDomains} records. Skipping seeding.`);
        }

        console.log('Seeding Dummy Events...');
        const events = [
            {
                eventTitle: "AI Hackathon 2026",
                description: "Build the future of Artificial Intelligence in 48 hours.",
                date: "Oct 24, 2026",
                time: "10:00 AM",
                venue: "LPU Main Campus",
                status: "Upcoming",
                color: "cyan"
            },
            {
                eventTitle: "Web3 Workshop",
                description: "Deep dive into Smart Contracts and DApps.",
                date: "Nov 15, 2026",
                time: "2:00 PM",
                venue: "Virtual Event",
                status: "Upcoming",
                color: "magenta"
            },
            {
                eventTitle: "Robotics Seminar",
                description: "The evolution of automated and autonomous systems.",
                date: "Sep 05, 2026",
                time: "11:00 AM",
                venue: "Auditorium 1",
                status: "Completed",
                color: "green"
            }
        ];

        // Check if events already exist
        const existingEventsCount = await Event.countDocuments({ eventTitle: "AI Hackathon 2026" });
        if (existingEventsCount === 0) {
            await Event.insertMany(events);
            console.log('✅ Events Seeded');
        } else {
            console.log('⚠️ Events already exist. Skipping seeding.');
        }

        console.log('Seeding Hackathons...');
        const hackathons = [
            {
                hackathonName: "Hack and Build 2026",
                description: "Join the most ambitious hackathon of the year. Build the future with AI, Web3, robotics, and immersive tech. We are looking for passionate developers to create groundbreaking solutions.",
                date: "Feb 25-28, 2026",
                duration: "24 Hours Non-Stop",
                venue: "LPU Campus, Punjab",
                participants: "500+ Innovators",
                organizer: "Crest Club",
                status: "Upcoming"
            },
            {
                hackathonName: "Inferno Verse 2025",
                description: "A fully immersive online Web3 and AI hackathon. Dive into the metaverse and build next-generation decentralized applications and AI-driven platforms.",
                date: "October 10-12, 2025",
                duration: "36 Hours Extreme",
                venue: "Virtual Event",
                participants: "1000+ Global Devs",
                organizer: "Crest Club",
                status: "Completed"
            }
        ];

        // Ensure Hackathon model is loaded
        const existingHacksCount = await Hackathon.countDocuments();
        if (existingHacksCount === 0) {
            await Hackathon.insertMany(hackathons);
            console.log('✅ Hackathons Seeded');
        } else {
            console.log(`⚠️ Hackathons collection already has ${existingHacksCount} records. Skipping seeding.`);
        }

        console.log('🎉 Database Seeding Completed!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

// Execute Seeding
seedData();
