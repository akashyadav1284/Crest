"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface HackathonCardProps {
    id: string;
    name: string;
    date: string;
    duration: string;
    venue: string;
    participants: string;
    description: string;
    organizer: string;
}

export function HackathonCard({
    id,
    name,
    date,
    duration,
    venue,
    participants,
    description,
    organizer
}: HackathonCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative glass-card p-8 rounded-2xl border border-white/10 overflow-hidden"
        >
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 to-magenta-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />

            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
                            Organized by {organizer}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black font-outfit uppercase tracking-tighter text-white">
                            {name}
                        </h3>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white/70">
                        <Calendar size={16} className="text-magenta-400" />
                        <span className="text-sm font-inter">{date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                        <Clock size={16} className="text-magenta-400" />
                        <span className="text-sm font-inter">{duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                        <MapPin size={16} className="text-magenta-400" />
                        <span className="text-sm font-inter">{venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                        <Users size={16} className="text-magenta-400" />
                        <span className="text-sm font-inter">{participants}</span>
                    </div>
                </div>

                <p className="text-white/60 font-inter text-sm mb-8 line-clamp-3">
                    {description}
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-6 border-t border-white/10">
                    {name.toLowerCase().includes("resurgence") ? (
                        <a href="/resurgence-main/">
                            <button className="w-full relative group/btn overflow-hidden rounded-lg bg-cyan-500/10 border border-cyan-500 px-6 py-3 text-cyan-400 font-bold tracking-widest uppercase hover:text-black transition-colors duration-300 flex items-center justify-center gap-2">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    See Details <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 h-full w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover/btn:w-full z-0" />
                            </button>
                        </a>
                    ) : (
                        <Link href={`/hackathons/${id}`}>
                            <button className="w-full relative group/btn overflow-hidden rounded-lg bg-cyan-500/10 border border-cyan-500 px-6 py-3 text-cyan-400 font-bold tracking-widest uppercase hover:text-black transition-colors duration-300 flex items-center justify-center gap-2">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Register Now <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 h-full w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover/btn:w-full z-0" />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
