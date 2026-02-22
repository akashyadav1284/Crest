"use client";

import { motion } from "framer-motion";
import { HackathonCard } from "@/components/hackathon/HackathonCard";

// Mock data based on the user request
const hackathons = [
    {
        id: "hack-and-build-2026",
        name: "Hack and Build 2026",
        date: "Feb 25-28, 2026",
        duration: "24 Hours Non-Stop",
        venue: "LPU Campus, Punjab",
        participants: "500+ Innovators",
        description: "Join the most ambitious hackathon of the year. Build the future with AI, Web3, robotics, and immersive tech. We are looking for passionate developers to create groundbreaking solutions.",
        organizer: "Crest Club"
    },
    {
        id: "inferno-verse-2025",
        name: "Inferno Verse 2025",
        date: "October 10-12, 2025",
        duration: "36 Hours Extreme",
        venue: "Virtual Event",
        participants: "1000+ Global Devs",
        description: "A fully immersive online Web3 and AI hackathon. Dive into the metaverse and build next-generation decentralized applications and AI-driven platforms.",
        organizer: "Crest Club"
    }
];

export default function HackathonsListingPage() {
    return (
        <div className="container mx-auto px-6 py-12 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-sm tracking-widest uppercase mb-6"
                >
                    Live Events
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter text-white mb-6"
                >
                    Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">Hackathons</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 font-inter max-w-2xl mx-auto text-lg"
                >
                    Challenge yourself, build the future, and compete with the brightest minds in robotics and artificial intelligence.
                </motion.p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {hackathons.map((hackathon, idx) => (
                    <HackathonCard key={hackathon.id} {...hackathon} />
                ))}
            </div>
        </div>
    );
}
