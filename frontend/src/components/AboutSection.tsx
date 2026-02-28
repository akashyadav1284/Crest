"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Stat {
    _id: string;
    label: string;
    value: string;
}

export function AboutSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const [stats, setStats] = useState<Stat[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const apiUrl = "http://localhost:5000/api";
                const res = await fetch(`${apiUrl}/stats`);
                if (!res.ok) throw new Error("Server Error");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setStats(data);
                } else {
                    setStats([]);
                }
            } catch (err) {
                console.warn("Failed to fetch stats, defaulting to empty", err);
                setStats([]);
            }
        };
        fetchStats();
    }, []);

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id="about" className="relative py-32 px-6 min-h-screen flex items-center bg-transparent overflow-hidden" ref={ref}>
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-magenta-500/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10"
            >
                {/* Left side text */}
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-sm tracking-wider uppercase mb-4">
                        System Protocol // 01
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter">
                        We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">Innovate</span>
                        <br />
                        The Future.
                    </h2>
                    <p className="text-lg text-white/70 font-inter leading-relaxed max-w-xl">
                        CREST is a student-led innovation hub dedicated to empowering the next generation of technologists.
                        We focus on breaking the barriers between theoretical knowledge and real-world application through project-based learning.
                    </p>

                    <div className="flex gap-8 pt-4">
                        {stats.length > 0 ? (
                            stats.map((stat, idx) => (
                                <div key={stat._id} className="flex gap-8">
                                    <div className="space-y-2">
                                        <h4 className="text-3xl font-bold font-outfit text-white">{stat.value}</h4>
                                        <p className={`text-sm font-mono tracking-wider uppercase ${idx % 2 === 0 ? 'text-cyan-500' : 'text-magenta-500'}`}>{stat.label}</p>
                                    </div>
                                    {idx < stats.length - 1 && <div className="w-px h-16 bg-white/10 mx-auto" />}
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <h4 className="text-3xl font-bold font-outfit text-white">50+</h4>
                                    <p className="text-sm text-cyan-500 font-mono tracking-wider uppercase">Active Projects</p>
                                </div>
                                <div className="w-px h-16 bg-white/10" />
                                <div className="space-y-2">
                                    <h4 className="text-3xl font-bold font-outfit text-white">200+</h4>
                                    <p className="text-sm text-magenta-500 font-mono tracking-wider uppercase">Members</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right side glass cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <motion.div
                        whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
                        className="glass-card flex flex-col items-start gap-4 neon-border relative group overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                            <span className="text-cyan-400 font-bold">01</span>
                        </div>
                        <h3 className="text-2xl font-bold font-outfit text-white">Learn</h3>
                        <p className="text-white/60 text-sm font-inter">Master cutting-edge tech through peer-to-peer workshops and expert sessions.</p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        whileHover={{ scale: 1.05, rotateY: -10, rotateX: 10 }}
                        className="glass-card flex flex-col items-start gap-4 sm:translate-y-12 neon-border relative group overflow-hidden border-magenta-500/50 hover:border-magenta-400 shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)]"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-magenta-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-12 h-12 rounded-full bg-magenta-500/20 flex items-center justify-center border border-magenta-500/50">
                            <span className="text-magenta-400 font-bold">02</span>
                        </div>
                        <h3 className="text-2xl font-bold font-outfit text-white">Build</h3>
                        <p className="text-white/60 text-sm font-inter">Architect real-world solutions. From embedded systems to decentralized apps.</p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        whileHover={{ scale: 1.05, rotateY: 10, rotateX: 10 }}
                        className="glass-card flex flex-col items-start gap-4 sm:col-span-2 neon-border relative group overflow-hidden border-white/20 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                        style={{ transformStyle: "preserve-3d", padding: '2rem' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex justify-between w-full items-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                                <span className="text-white font-bold">03</span>
                            </div>
                            <h3 className="text-3xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Compete</h3>
                        </div>
                        <p className="text-white/70 text-sm font-inter mt-2 max-w-md">Dominate hackathons and global competitions. Prove your skills against the best.</p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

