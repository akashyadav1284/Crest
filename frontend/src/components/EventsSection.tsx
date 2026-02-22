"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function EventsSection() {
    const [filter, setFilter] = useState("all");

    const categories = ["all", "upcoming", "ongoing", "completed"];

    const events = [
        {
            id: 1,
            title: "Neon Hack 2026",
            date: "Oct 15 - Oct 17",
            status: "upcoming",
            location: "Main Tech Hall",
            desc: "72-hour Web3 & AI hackathon focused on building decentralized intelligence.",
            color: "cyan",
        },
        {
            id: 2,
            title: "RoboDrive Arena",
            date: "Nov 02",
            status: "upcoming",
            location: "Engineering Bay 4",
            desc: "Autonomous drone and rover navigation obstacle course.",
            color: "magenta",
        },
        {
            id: 3,
            title: "Neural Nets 101",
            date: "Sept 10",
            status: "completed",
            location: "Virtual (Discord)",
            desc: "Introductory workshop to building Convolutional Neural Networks.",
            color: "green",
        },
        {
            id: 4,
            title: "Cyber Security CTF",
            date: "Right Now",
            status: "ongoing",
            location: "Lab 0x2A",
            desc: "Capture the flag internal club competition.",
            color: "yellow",
        },
    ];

    const filteredEvents = filter === "all" ? events : events.filter(e => e.status === filter);

    return (
        <section id="events" className="py-32 px-6 bg-transparent relative">
            {/* Decor */}
            <div className="absolute right-0 top-20 w-1/3 h-[500px] bg-cyan-900/20 blur-[150px] pointer-events-none rounded-full" />

            <div className="container mx-auto max-w-5xl relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white mb-2">
                            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Log</span>
                        </h2>
                        <p className="text-white/50 font-inter">Upcoming missions, workshops, and hackathons.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 capitalize font-mono text-sm tracking-widest rounded-lg transition-colors ${filter === cat
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                    : "text-white/50 hover:text-white hover:bg-white/10 border border-transparent"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.map((event, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                key={event.id}
                                className="group w-full glass-card hover:bg-white/10 transition-all duration-300 border-l-4"
                                style={{
                                    borderLeftColor:
                                        event.color === 'cyan' ? '#06b6d4' :
                                            event.color === 'magenta' ? '#d946ef' :
                                                event.color === 'yellow' ? '#facc15' : '#22c55e'
                                }}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                                    {/* Info */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase mb-2">
                                            <span className={`px-2 py-1 rounded border ${event.status === 'upcoming' ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10' :
                                                event.status === 'ongoing' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' :
                                                    'border-white/20 text-white/50 bg-white/5'
                                                }`}>
                                                {event.status}
                                            </span>
                                            <span className="flex items-center gap-1 text-white/50"><Calendar size={14} /> {event.date}</span>
                                            <span className="flex items-center gap-1 text-white/50"><MapPin size={14} /> {event.location}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-cyan-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-white/60 font-inter text-sm max-w-2xl">{event.desc}</p>
                                    </div>

                                    {/* Action */}
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono uppercase text-sm tracking-widest group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300">
                                        {event.status === 'completed' ? 'View Logs' : 'Compile'} <ArrowRight size={16} />
                                    </button>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
