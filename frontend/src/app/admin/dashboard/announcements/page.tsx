"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Save, Megaphone } from "lucide-react";

interface Announcement {
    _id: string;
    title: string;
    content: string;
    isActive: boolean;
    createdAt: string;
}

export default function AnnouncementsManager() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAnnounce, setCurrentAnnounce] = useState<Partial<Announcement>>({});

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const token = localStorage.getItem("adminToken");
            // Admin gets all announcements
            const res = await fetch(`${API_URL}/api/announcements/all`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setAnnouncements(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("adminToken");

        const method = currentAnnounce._id ? "PUT" : "POST";
        const endpoint = currentAnnounce._id ? `/api/announcements/${currentAnnounce._id}` : `/api/announcements`;

        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(currentAnnounce)
            });

            if (res.ok) {
                fetchAnnouncements();
                setIsEditing(false);
                setCurrentAnnounce({});
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this announcement?")) return;
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("adminToken");

        try {
            await fetch(`${API_URL}/api/announcements/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            fetchAnnouncements();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black font-outfit uppercase tracking-tighter text-white">
                        System <span className="text-yellow-500">Announcements</span>
                    </h1>
                    <p className="text-white/50 font-inter mt-1">Broadcast messages to the landing page.</p>
                </div>
                <button
                    onClick={() => { setCurrentAnnounce({ isActive: true }); setIsEditing(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                    <Megaphone size={18} /> Broadcast
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {announcements.map((ann) => (
                    <motion.div
                        key={ann._id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`bg-white/5 border p-6 rounded-xl flex flex-col gap-4 ${ann.isActive ? 'border-yellow-500/50' : 'border-white/10 opacity-60'}`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold font-outfit text-white">{ann.title}</h3>
                                <p className="text-xs font-mono text-white/40 mt-1 uppercase tracking-widest">{new Date(ann.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setCurrentAnnounce(ann); setIsEditing(true); }} className="p-2 text-white/50 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(ann._id)} className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        <p className="text-white/70 text-sm font-inter whitespace-pre-wrap">{ann.content}</p>

                        <div className="mt-2 text-xs font-mono uppercase tracking-widest">
                            <span className={`px-2 py-1 rounded border ${ann.isActive ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>
                                {ann.isActive ? "Active Broadcast" : "Terminated"}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="text-xl font-bold text-white font-outfit uppercase">{currentAnnounce._id ? 'Edit Broadcast' : 'New Broadcast'}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs uppercase text-white/50 font-mono mb-1">Title</label>
                                    <input type="text" required value={currentAnnounce.title || ''} onChange={e => setCurrentAnnounce({ ...currentAnnounce, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none" placeholder="e.g. Server Maintenance" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-white/50 font-mono mb-1">Message Content</label>
                                    <textarea required value={currentAnnounce.content || ''} onChange={e => setCurrentAnnounce({ ...currentAnnounce, content: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none" rows={4} placeholder="Warning: Subsystems will be down..." />
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={currentAnnounce.isActive}
                                        onChange={(e) => setCurrentAnnounce({ ...currentAnnounce, isActive: e.target.checked })}
                                        className="w-5 h-5 accent-yellow-500 bg-black border-white/20 rounded"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-inter text-white/80 select-none cursor-pointer">
                                        Active Broadcast (Show on Website)
                                    </label>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg text-white/70 hover:bg-white/5">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg flex items-center gap-2"><Save size={16} /> Save</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
