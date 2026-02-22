"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PHASES = [
    { id: 1, label: "INIT" },
    { id: 2, label: "SYNC" },
    { id: 3, label: "LOAD" },
    { id: 4, label: "EXEC" },
    { id: 5, label: "CORE" },
];

export function HudOverlay({ isBooted }: { isBooted: boolean }) {
    const [uptime, setUptime] = useState(99.6);
    const [activePhase, setActivePhase] = useState(1);

    // Simulate uptime fluctuation
    useEffect(() => {
        if (!isBooted) return;
        const interval = setInterval(() => {
            setUptime(prev => {
                const fluctuate = (Math.random() - 0.5) * 0.2;
                return Math.min(100, Math.max(99.0, prev + fluctuate));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [isBooted]);

    // Handle scroll to light up phases
    useEffect(() => {
        if (!isBooted) return;
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) return;

            const scrollPercent = scrollY / maxScroll;
            const phaseIndex = Math.min(
                PHASES.length - 1,
                Math.floor(scrollPercent * PHASES.length)
            );
            setActivePhase(PHASES[phaseIndex].id);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isBooted]);

    if (!isBooted) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-between p-6 md:p-10 text-cyan-500 font-mono text-xs md:text-sm uppercase tracking-widest"
        >
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 font-bold">CLEARANCE: OMEGA</span>
                    </div>
                    <div className="text-cyan-600/80">CREST_NET v2.0</div>
                </div>

                <div className="flex flex-col items-end gap-2 text-right">
                    <div className="text-cyan-300">UPTIME: {uptime.toFixed(2)}%</div>
                    <div className="flex items-center gap-2 text-green-400">
                        <span>ENCRYPTION: ACTIVE</span>
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Frame Decorators */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-500/30 opacity-50 m-6" />
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/30 opacity-50 m-6" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/30 opacity-50 m-6" />

            {/* Right Side Vertical Scroll Indicator */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-end">
                {PHASES.map((phase) => (
                    <div key={phase.id} className="flex items-center gap-4">
                        <motion.span
                            animate={{
                                opacity: activePhase === phase.id ? 1 : 0.3,
                                textShadow: activePhase === phase.id ? "0 0 10px #22d3ee" : "none"
                            }}
                            className="text-cyan-400 font-bold hidden md:block"
                        >
                            PHASE {phase.id}
                        </motion.span>
                        <div className="relative flex items-center justify-center">
                            <motion.div
                                className={`w-1 h-8 bg-cyan-900 border border-cyan-800 ${activePhase === phase.id ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' : ''}`}
                                animate={{
                                    height: activePhase === phase.id ? 40 : 32,
                                    backgroundColor: activePhase === phase.id ? "#22d3ee" : "#164e63"
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
