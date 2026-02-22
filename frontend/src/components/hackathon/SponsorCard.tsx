"use client";

import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";

interface Sponsor {
    name: string;
    description: string;
    logoUrl?: string;
    website: string;
    tier: "Premium" | "In-Kind";
}

export function SponsorCard({ name, description, website, tier }: Sponsor) {
    const isPremium = tier === "Premium";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`group relative glass-card p-6 rounded-2xl border ${isPremium ? "border-magenta-500/30" : "border-white/10"
                } overflow-hidden`}
        >
            {/* Background Glow */}
            {isPremium && (
                <div className="absolute inset-0 bg-gradient-to-br from-magenta-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}

            <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                        {/* Placeholder for actual logo image */}
                        <span className="font-outfit font-bold text-xl text-white/50">{name.charAt(0)}</span>
                    </div>
                    <span className={`text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${isPremium ? "border-magenta-500/50 text-magenta-400 bg-magenta-500/10" : "border-cyan-500/50 text-cyan-400 bg-cyan-500/10"
                        }`}>
                        {tier}
                    </span>
                </div>

                <h4 className="text-xl font-bold font-outfit text-white mb-2">{name}</h4>
                <p className="text-white/60 text-sm font-inter mb-6 line-clamp-2">{description}</p>

                <div className="mt-auto pt-4 border-t border-white/10">
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-white/50 hover:text-cyan-400 transition-colors"
                    >
                        Visit Website <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
