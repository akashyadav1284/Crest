"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Edit3, Save, X } from "lucide-react";

interface Stat {
    _id: string;
    label: string;
    value: string;
    description: string;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [editStat, setEditStat] = useState<Stat | null>(null);
    const [editValue, setEditValue] = useState("");
    const [editDesc, setEditDesc] = useState("");

    const fetchStats = async () => {
        try {
            const apiUrl = "http://localhost:5000/api";
            const res = await fetch(`${apiUrl}/stats`);
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error("Failed to fetch stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSaveStat = async () => {
        if (!editStat) return;
        try {
            const apiUrl = "http://localhost:5000/api";
            const res = await fetch(`${apiUrl}/stats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({ label: editStat.label, value: editValue, description: editDesc })
            });
            if (res.ok) {
                setEditStat(null);
                fetchStats();
            } else {
                alert("Failed to update stat");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white flex items-center gap-3">
                    <Activity className="text-cyan-500" />
                    Dashboard Overview
                </h1>
                <p className="text-white/50 text-sm mt-2 font-inter">Manage homepage statistics and overall system snapshot.</p>
            </header>

            <section className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Homepage Statistics</h2>

                {loading ? (
                    <div className="text-white/50 animate-pulse">Loading stats...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat._id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 border border-white/10 rounded-xl p-6 relative group overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">{stat.label}</h3>
                                    <button
                                        onClick={() => { setEditStat(stat); setEditValue(stat.value); setEditDesc(stat.description || ""); }}
                                        className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                </div>
                                <div className="text-3xl font-bold font-outfit text-white mb-1 shadow-cyan-500/50 drop-shadow-md">{stat.value}</div>
                                <div className="text-xs text-white/40">{stat.description || "No description"}</div>
                            </motion.div>
                        ))}
                        {stats.length === 0 && (
                            <div className="col-span-3 text-center py-10 text-white/40 italic">No statistics found.</div>
                        )}
                    </div>
                )}
            </section>

            {/* Stat Edit Modal */}
            {editStat && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-black border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold uppercase text-white">Edit Stat: {editStat.label}</h2>
                            <button onClick={() => setEditStat(null)} className="text-white/50 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Value</label>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500"
                                />
                            </div>
                            <button
                                onClick={handleSaveStat}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold border border-cyan-500 hover:bg-cyan-500 hover:text-white transition-all uppercase tracking-widest mt-4"
                            >
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

