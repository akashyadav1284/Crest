"use client";

import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowLeft, Ticket } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function HackathonSuccessPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const hackathonName = id === "hack-and-build-2026" ? "Hack and Build 2026" : "Inferno Verse 2025";

    // Generate a random mock ticket ID
    const ticketId = Math.random().toString(36).substring(2, 10).toUpperCase();

    return (
        <section className="min-h-[80vh] px-6 py-12 relative flex flex-col items-center justify-center font-inter text-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                className="mb-8 relative"
            >
                <div className="w-32 h-32 rounded-full border border-green-500/30 flex items-center justify-center bg-green-500/10 text-green-400 mx-auto">
                    <CheckCircle size={64} strokeWidth={1.5} />
                </div>
                {/* Ping animation behind checkmark */}
                <div className="absolute inset-0 rounded-full border-2 border-green-500/50 animate-ping opacity-20" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl px-4"
            >
                <h1 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white mb-6">
                    Registration <span className="text-green-400">Confirmed</span>
                </h1>

                <p className="text-white/60 font-inter text-lg md:text-xl mb-12">
                    You have successfully registered for <strong className="text-white">{hackathonName}</strong>! Your squad's credentials have been locked into the mainframe.
                </p>

                {/* Digital Ticket Card */}
                <div className="glass-card p-1 rounded-3xl border border-white/10 max-w-md mx-auto mb-10 text-left relative overflow-hidden group">
                    {/* animated shine */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />

                    <div className="bg-black/80 rounded-[22px] p-6 relative z-0">
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10 border-dashed">
                            <div>
                                <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-1">Pass ID</span>
                                <span className="text-white font-mono text-xl">{ticketId}</span>
                            </div>
                            <Ticket className="text-white/20" size={32} />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <span className="text-white/40 font-mono text-xs uppercase tracking-widest block">Event</span>
                                <span className="text-white font-bold">{hackathonName}</span>
                            </div>
                            <div>
                                <span className="text-white/40 font-mono text-xs uppercase tracking-widest block">Status</span>
                                <span className="text-green-400 font-bold uppercase tracking-widest text-sm text-shadow-green">Verified Participant</span>
                            </div>
                        </div>

                        {/* Barcode Mock */}
                        <div className="mt-8 pt-4 border-t border-white/5 flex gap-1 justify-between opacity-50">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className={`h-8 ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-2' : 'w-0.5'} bg-white`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-bold tracking-widest uppercase hover:text-black hover:bg-cyan-500 transition-colors duration-300 flex items-center justify-center gap-2">
                        <Download size={18} /> Download Ticket
                    </button>
                    <Link href="/">
                        <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white/70 font-bold tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2">
                            <ArrowLeft size={18} /> Back to Hub
                        </button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
