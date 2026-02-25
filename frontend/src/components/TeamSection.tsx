"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    imageURL: string;
    linkedin?: string;
    github?: string;
}

export function TeamSection() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const apiUrl = "http://localhost:5000/api";
                const res = await fetch(`${apiUrl}/team`);
                const data = await res.json();
                setTeam(data);
            } catch (err) {
                console.error("Failed to fetch team");
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    // Helper to get alternating colors
    const getNeonColor = (index: number) => {
        const colors = ['cyan', 'magenta', 'yellow', 'green'];
        return colors[index % colors.length];
    };

    return (
        <section id="team" className="py-32 px-6 bg-transparent relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-magenta-500/50 to-transparent" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter text-white mb-4">
                        Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">Core</span>
                    </h2>
                    <p className="text-white/60 font-inter max-w-2xl mx-auto">
                        The masterminds behind CREST's most ambitious projects.
                    </p>
                </div>

                {loading ? (
                    <div className="text-white/50 text-center animate-pulse py-10">Initializing Core Systems...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, idx) => {
                            const color = getNeonColor(idx);
                            return (
                                <motion.div
                                    key={member._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="group relative"
                                >
                                    <div className="glass-card relative overflow-hidden rounded-2xl flex flex-col items-center p-8 border-t border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500 h-full">

                                        {/* Image Frame with Rotating Border Effect */}
                                        <div className="relative w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-magenta-500 group-hover:animate-spin-slow">
                                            <div className="w-full h-full bg-black rounded-full overflow-hidden absolute inset-[2px] z-10">
                                                <img
                                                    src={member.imageURL}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { e.currentTarget.src = "/crest-logo.png" }}
                                                />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold font-outfit text-white mb-1 text-center">{member.name}</h3>
                                        <p className="text-sm font-mono tracking-widest text-cyan-400 uppercase mb-6 text-center">{member.role}</p>

                                        {/* Social Links */}
                                        <div className="flex gap-4 mt-auto">
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
                                            )}
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                                            )}
                                        </div>

                                        {/* Hover Glow Behind Card */}
                                        <div className="absolute -inset-2 bg-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

