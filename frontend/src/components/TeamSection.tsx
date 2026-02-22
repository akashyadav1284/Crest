"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export function TeamSection() {
    const team = [
        {
            name: "Priyansh Kumar Patel",
            role: "CEO (Crest)",
            image: "/priyansh.jpg",
            color: "cyan",
            linkedin: "https://www.linkedin.com/in/priyanshkumarpatel/"
        },
        {
            name: "Saksham Sharma",
            role: "COO (Crest)",
            image: "/saksham.jpg",
            color: "magenta",
            linkedin: "https://www.linkedin.com/in/saksham-sharma-379907321/"
        },
        {
            name: "Akash Yadav",
            role: "Developer",
            image: "/akash.jpg",
            color: "yellow",
            linkedin: "https://www.linkedin.com/in/akash-yadav-403676379/"
        },
        {
            name: "Sagar Sukhadev Kachere",
            role: "Developer",
            image: "/sagar.jpg",
            color: "green",
            linkedin: "https://www.linkedin.com/in/sagar-sukhadev-kachere-5508b92a4/"
        }
    ];

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className="glass-card relative overflow-hidden rounded-2xl flex flex-col items-center p-8 border-t border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500">

                                {/* Image Frame with Rotating Border Effect */}
                                <div className="relative w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-magenta-500 group-hover:animate-spin-slow">
                                    <div className="w-full h-full bg-black rounded-full overflow-hidden absolute inset-[2px] z-10">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold font-outfit text-white mb-1 whitespace-nowrap text-center">{member.name}</h3>
                                <p className={`text-sm font-mono tracking-widest text-cyan-400 uppercase mb-6 text-center`}>{member.role}</p>

                                {/* Social Links */}
                                <div className="flex gap-4">
                                    <a href="#" className="text-white/40 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                                    <a href="#" className="text-white/40 hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
                                </div>

                                {/* Hover Glow Behind Card */}
                                <div className="absolute -inset-2 bg-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
