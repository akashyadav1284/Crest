"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HackathonCard } from "@/components/hackathon/HackathonCard";

export default function HackathonsListingPage() {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${apiUrl}/api/hackathons/admin`);
                if (res.ok) {
                    const data = await res.json();
                    setHackathons(data);
                }
            } catch (err) {
                console.error("Failed to load hackathons");
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, []);
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
            {loading ? (
                <div className="text-white/50 text-center animate-pulse py-10">Initializing Hackathon Matrix...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {hackathons.map((hackathon: any) => (
                        <HackathonCard
                            key={hackathon._id}
                            id={hackathon._id}
                            name={hackathon.hackathonName}
                            date={hackathon.date}
                            duration={hackathon.duration}
                            venue={hackathon.venue}
                            participants={hackathon.participants}
                            description={hackathon.description}
                            organizer={hackathon.organizer}
                        />
                    ))}
                    {hackathons.length === 0 && (
                        <div className="col-span-full text-center py-10 text-white/40 italic">No Active Hackathons Found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
