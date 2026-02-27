// Secure Database Seeding Script designed for MongoDB Atlas Initialization
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
mongoose.set('strictQuery', false);
const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('FATAL: MONGO_URI is completely missing.');
    process.exit(1);
}

// Import all required Models
const Admin = require('./models/Admin');
const Domain = require('./models/Domain');
const Event = require('./models/Event');
const Hackathon = require('./models/Hackathon');
const Announcement = require('./models/Announcement');
const SiteStat = require('./models/SiteStat');
const User = require('./models/User');

const seedDatabase = async () => {
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB Atlas correctly for Seeding.');

        // 1. SAFETY CHECK
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            console.warn('⚠️ WARNING: The database already contains Admin records.');
            console.warn('Aborting seed script to prevent overwriting production data.');
            process.exit(0);
        }

        console.log('🚀 Initiating Database Population Sequence...');

        // 2. SEED ADMIN ACCOUNT
        console.log('-> Creating Secure Super Admin...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassKey = await bcrypt.hash('340515@1284$', salt);
        await Admin.create({
            adminId: 'akash1284',
            hashedPassKey: hashedPassKey,
            role: 'superadmin',
            accessLevel: 5,
            isActive: true
        });

        // 3. SEED 6 CORE DOMAINS
        console.log('-> Populating 6 Core Domains...');
        const domains = [
            {
                title: 'Robotics & AI',
                quote: 'Engineering intelligence into motion — building machines that think, adapt, and evolve.',
                description: 'Robotics & AI focuses on intelligent automation, autonomous systems, humanoid robotics, and real-world AI integration.',
                icon: 'Robot',
                colorTheme: 'cyan',
                order: 1
            },
            {
                title: 'Artificial Intelligence & Machine Learning',
                quote: 'Teaching machines to learn, reason, and redefine the future.',
                description: 'AI & ML domain focuses on deep learning, neural networks, predictive modeling, generative AI, and intelligent systems.',
                icon: 'BrainCircuit',
                colorTheme: 'magenta',
                order: 2
            },
            {
                title: 'Cybersecurity',
                quote: 'Securing the digital frontier — defending systems before threats even emerge.',
                description: 'Cybersecurity domain covers ethical hacking, penetration testing, SOC systems, cryptography, and digital defense strategies.',
                icon: 'ShieldAlert',
                colorTheme: 'yellow',
                order: 3
            },
            {
                title: 'Cloud Computing',
                quote: 'Powering the world from invisible infrastructure.',
                description: 'Cloud computing focuses on scalable systems, DevOps pipelines, distributed computing, and cloud-native architecture.',
                icon: 'Cloud',
                colorTheme: 'cyan',
                order: 4
            },
            {
                title: 'Aerospace Innovation',
                quote: 'Beyond boundaries — innovating for skies and space.',
                description: 'Aerospace domain works on UAVs, drone tech, propulsion systems, and space-grade embedded systems.',
                icon: 'Rocket',
                colorTheme: 'magenta',
                order: 5
            },
            {
                title: 'Electronics & Embedded Systems',
                quote: 'From circuits to intelligence — hardware that drives innovation.',
                description: 'Electronics domain builds IoT devices, PCB systems, microcontroller-based innovations, and smart hardware.',
                icon: 'Cpu',
                colorTheme: 'yellow',
                order: 6
            }
        ];
        await Domain.insertMany(domains);

        // 4. SEED HACKATHONS
        console.log('-> Seeding Hackathons...');
        const hackathons = [
            {
                hackathonName: 'CREST TechStorm 2026',
                theme: 'AI + Cybersecurity',
                mode: 'Hybrid',
                date: 'March 20–22, 2026',
                duration: '48 Hours',
                registrationOpen: true,
                prizePool: '₹50,000',
                description: 'A 48-hour innovation sprint solving real-world AI and security challenges.',
                venue: 'LPU Main Campus & Online',
                participants: 'Open to All',
                participantsLimit: 500,
                organizer: 'CREST Club',
                status: 'Upcoming'
            },
            {
                hackathonName: 'CloudNova BuildFest',
                theme: 'Cloud + DevOps',
                mode: 'Online',
                date: 'April 10–11, 2026',
                duration: '24 Hours',
                registrationOpen: true,
                prizePool: '₹30,000',
                description: 'Build scalable cloud-native apps and compete globally.',
                venue: 'Virtual Build Platform',
                participants: 'Global Students',
                participantsLimit: 1000,
                organizer: 'CREST Cloud Wing',
                status: 'Upcoming'
            }
        ];
        await Hackathon.insertMany(hackathons);

        // 5. SEED EVENTS
        console.log('-> Seeding Events...');
        const events = [
            {
                eventTitle: 'AI Workshop – Neural Networks Deep Dive',
                description: 'Learn how to build CNNs and RNNs from scratch without libraries.',
                date: 'April 5, 2026',
                time: '2:00 PM',
                venue: 'Block 32, Auditorium',
                speaker: 'Dr. John Doe',
                mode: 'Offline',
                status: 'Upcoming',
                color: 'magenta',
                isActive: true
            },
            {
                eventTitle: 'Cybersecurity Bootcamp – Ethical Hacking Basics',
                description: 'Hands-on session on Kali Linux, BurpSuite, and network penetration.',
                date: 'April 15, 2026',
                time: '10:00 AM',
                venue: 'Virtual Discord Stage',
                speaker: 'Alice Security',
                mode: 'Online',
                status: 'Upcoming',
                color: 'yellow',
                isActive: true
            },
            {
                eventTitle: 'Cloud Deployment Session – From Code to Production',
                description: 'Deploying robust scalable architectures using AWS and Docker.',
                date: 'May 1, 2026',
                time: '11:00 AM',
                venue: 'Block 14, Room 201',
                speaker: 'AWS Cloud Expert',
                mode: 'Hybrid',
                status: 'Upcoming',
                color: 'cyan',
                isActive: true
            }
        ];
        await Event.insertMany(events);

        // 6. SEED ANNOUNCEMENTS
        console.log('-> Broadcasting Announcements...');
        const announcements = [
            { title: 'Registrations Open', message: 'Registrations Open for TechStorm 2026!', priority: 'High', isActive: true },
            { title: 'Domain Launch', message: 'New Domain Launch: Aerospace Innovation', priority: 'Medium', isActive: true },
            { title: 'Feature Update', message: 'Google Auth Integration Live on CREST', priority: 'Low', isActive: true }
        ];
        await Announcement.insertMany(announcements);

        // 7. SEED SITE STATS
        console.log('-> Updating Global Site Statistics...');
        const stats = [
            { label: 'activeProjects', value: '50', description: 'Total Live Student Projects' },
            { label: 'members', value: '200', description: 'Active Club Members' },
            { label: 'hackathonsHosted', value: '5', description: 'Major Hackathons Conducted' },
            { label: 'eventsConducted', value: '12', description: 'Technical Events & Seminars' }
        ];
        await SiteStat.insertMany(stats);

        // 8. SEED USERS
        console.log('-> Injecting Initial Dummy Users...');
        await User.insertMany([
            { name: 'John Dev', email: 'john.dev@example.com', role: 'member', isVerified: true },
            { name: 'Alice Hacker', email: 'alice.hx@example.com', role: 'member', isVerified: true }
        ]);

        console.log('🎉 INITIALIZATION COMPLETE. 100% of data successfully populated to MongoDB Atlas.');
        process.exit(0);
    } catch (err) {
        console.error('❌ FATAL SEED ERROR:', err);
        process.exit(1);
    }
};

seedDatabase();
