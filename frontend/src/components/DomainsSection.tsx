"use client";

import { motion } from "framer-motion";
import { Cpu, Code, BrainCircuit, Blocks, Radio, View } from "lucide-react";

export function DomainsSection() {
    const domains = [
        { name: "Robotics", icon: <Cpu size={32} />, color: "from-blue-500 to-cyan-400", desc: "Automated hardware systems." },
        { name: "Artificial Intelligence", icon: <BrainCircuit size={32} />, color: "from-magenta-500 to-purple-500", desc: "Machine learning & neural networks." },
        { name: "Blockchain", icon: <Blocks size={32} />, color: "from-yellow-400 to-orange-500", desc: "Decentralized Web3 architectures." },
        { name: "AR / VR", icon: <View size={32} />, color: "from-green-400 to-emerald-600", desc: "Immersive spatial computing." },
        { name: "Internet of Things", icon: <Radio size={32} />, color: "from-cyan-400 to-blue-600", desc: "Connected smart devices." },
        { name: "Web Development", icon: <Code size={32} />, color: "from-pink-500 to-rose-500", desc: "High-performance full-stack web apps." },
    ];

    return (
        <section id="domains" className="py-32 px-6 bg-transparent relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter text-white">
                        Core <span className="neon-text">Domains</span>
                    </h2>
                    <p className="text-white/60 font-inter max-w-2xl mx-auto">
                        Specialized research and development clusters. Join a domain to start building real-world projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domains.map((domain, idx) => (
                        <motion.div
                            key={domain.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 overflow-hidden cursor-pointer backdrop-blur-sm transition-colors"
                        >
                            {/* Animated background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${domain.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                {domain.icon}
                            </div>

                            <h3 className="text-2xl font-bold font-outfit text-white mb-3">{domain.name}</h3>
                            <p className="text-white/60 font-inter text-sm group-hover:text-white/80 transition-colors">
                                {domain.desc}
                            </p>

                            {/* Glowing decorative border effect on hover */}
                            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${domain.color} group-hover:w-full transition-all duration-500`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
