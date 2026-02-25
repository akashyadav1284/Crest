"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Code, BrainCircuit, Blocks, Radio, View, Globe, Shield, Cloud } from "lucide-react";

interface DomainItem {
    _id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
    colorTheme: string;
}

// Custom 3D Tilt Wrapper Component
function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full perspective-[1000px]"
        >
            {children}
        </motion.div>
    );
}

export function DomainsSection() {
    const [domains, setDomains] = useState<DomainItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/domains`);
                if (res.ok) {
                    const data = await res.json();
                    // Sort domains by order just in case
                    data.sort((a: DomainItem, b: DomainItem) => a.order - b.order);
                    setDomains(data);
                }
            } catch (err) {
                console.error("Failed to fetch domains");
            } finally {
                setLoading(false);
            }
        };

        fetchDomains();
    }, []);

    // A helper function to map the strings from DB to tailwind colors
    const getColorTheme = (theme: string) => {
        switch (theme) {
            case 'cyan': return 'from-cyan-400 to-blue-600';
            case 'magenta': return 'from-magenta-500 to-purple-500';
            case 'yellow': return 'from-yellow-400 to-orange-500';
            case 'green': return 'from-green-400 to-emerald-600';
            default: return 'from-cyan-400 to-blue-600';
        }
    };

    const getHexColor = (theme: string) => {
        switch (theme) {
            case 'cyan': return '#22d3ee';
            case 'magenta': return '#d946ef';
            case 'yellow': return '#eab308';
            case 'green': return '#22c55e';
            default: return '#22d3ee';
        }
    }

    // Dynamic icon mapper since DB stores icon strings that React can't render directly safely
    const getIconMap = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('ai') && t.includes('robotics')) return <Cpu size={32} />;
        if (t.includes('ai / ml') || t.includes('machine learning')) return <BrainCircuit size={32} />;
        if (t.includes('cyber')) return <Shield size={32} />;
        if (t.includes('cloud')) return <Cloud size={32} />;
        if (t.includes('aerospace')) return <Radio size={32} />;
        if (t.includes('electronics')) return <Blocks size={32} />;
        return <Code size={32} />;
    };

    return (
        <section id="domains" className="py-32 px-6 bg-transparent relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[#060606] -z-20" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none -z-10" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter text-white">
                        Capability <span className="neon-text">Matrix</span>
                    </h2>
                    <p className="text-white/60 font-inter max-w-2xl mx-auto">
                        Explore the primary technical focus areas of the CREST Innovation Lab.
                    </p>
                </div>

                {loading ? (
                    <div className="text-white/50 animate-pulse text-center font-mono">Loading Architecture Array...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {domains.map((domain, idx) => {
                            const hexColor = getHexColor(domain.colorTheme);
                            const indexNumber = String(idx + 1).padStart(2, '0');

                            return (
                                <motion.div
                                    key={domain._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="h-full"
                                >
                                    <TiltCard>
                                        <div
                                            className="group relative h-full flex flex-col p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                                            style={{ transform: "translateZ(30px)" }} // Pop out effect when tilted
                                        >
                                            {/* Neon Glow Hover Effect */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                                                style={{ boxShadow: `0 0 30px 0 ${hexColor}33 inset, 0 0 20px 0 ${hexColor}33` }}
                                            />

                                            {/* Large Background Index Number */}
                                            <div className="absolute top-4 right-6 text-6xl font-black font-outfit text-white/[0.03] group-hover:text-white/[0.08] transition-colors pointer-events-none select-none">
                                                {indexNumber}
                                            </div>

                                            {/* Icon Container */}
                                            <div
                                                className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${getColorTheme(domain.colorTheme)} text-white shadow-lg mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500`}
                                                style={{ boxShadow: `0 10px 20px -10px ${hexColor}` }}
                                            >
                                                {getIconMap(domain.title)}
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10 flex-1 flex flex-col">
                                                <h3 className="text-2xl font-black font-outfit uppercase tracking-wider text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all">
                                                    {domain.title}
                                                </h3>

                                                <div className="flex-1 border-l-2 pl-4 py-1" style={{ borderColor: `${hexColor}40` }}>
                                                    <p className="font-mono text-white/70 text-sm leading-relaxed italic group-hover:text-white/90 transition-colors">
                                                        {domain.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Decorative laser line at bottom */}
                                            <div
                                                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                                                style={{ background: `linear-gradient(90deg, transparent, ${hexColor}, transparent)` }}
                                            />
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            )
                        })}
                        {domains.length === 0 && (
                            <div className="col-span-full text-center py-10 text-white/40 italic">System domains updating...</div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
