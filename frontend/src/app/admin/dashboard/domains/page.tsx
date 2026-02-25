"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Save } from "lucide-react";

interface Domain {
    _id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
    colorTheme: string;
}

export default function DomainsManager() {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDomain, setCurrentDomain] = useState<Partial<Domain>>({});

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_URL}/api/domains`);
            const data = await res.json();
            setDomains(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("adminToken");

        const method = currentDomain._id ? "PUT" : "POST";
        const endpoint = currentDomain._id ? `/api/domains/${currentDomain._id}` : `/api/domains`;

        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(currentDomain)
            });

            if (res.ok) {
                fetchDomains();
                setIsEditing(false);
                setCurrentDomain({});
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this domain?")) return;
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("adminToken");

        try {
            await fetch(`${API_URL}/api/domains/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            fetchDomains();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black font-outfit uppercase tracking-tighter text-white">
                        Domains <span className="text-magenta-500">Editor</span>
                    </h1>
                    <p className="text-white/50 font-inter mt-1">Manage About section domains (Learn, Build, Compete).</p>
                </div>
                <button
                    onClick={() => { setCurrentDomain({ colorTheme: 'cyan', order: 0 }); setIsEditing(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} /> New Domain
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domains.map((domain) => (
                    <motion.div
                        key={domain._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4"
                        style={{ borderTopColor: domain.colorTheme === 'cyan' ? '#06b6d4' : domain.colorTheme === 'magenta' ? '#d946ef' : domain.colorTheme === 'white' ? '#fff' : '#22c55e', borderTopWidth: 4 }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30 text-xs font-bold font-mono">
                                {domain.icon || '00'}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setCurrentDomain(domain); setIsEditing(true); }} className="p-2 text-white/50 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(domain._id)} className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold font-outfit text-white">{domain.title}</h3>
                            <p className="text-white/60 text-sm mt-2">{domain.description}</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between text-xs font-mono text-white/40">
                            <span>Order: {domain.order}</span>
                            <span>Theme: {domain.colorTheme}</span>
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
                                <h2 className="text-xl font-bold text-white font-outfit uppercase">{currentDomain._id ? 'Edit Domain' : 'New Domain'}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs uppercase text-white/50 font-mono mb-1">Title</label>
                                    <input type="text" required value={currentDomain.title || ''} onChange={e => setCurrentDomain({ ...currentDomain, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Build" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-white/50 font-mono mb-1">Description</label>
                                    <textarea required value={currentDomain.description || ''} onChange={e => setCurrentDomain({ ...currentDomain, description: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" rows={3} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-white/50 font-mono mb-1">Icon Text</label>
                                        <input type="text" value={currentDomain.icon || ''} onChange={e => setCurrentDomain({ ...currentDomain, icon: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="e.g. 01" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-white/50 font-mono mb-1">Display Order</label>
                                        <input type="number" required value={currentDomain.order || 0} onChange={e => setCurrentDomain({ ...currentDomain, order: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-white/50 font-mono mb-1">Color Theme</label>
                                    <select value={currentDomain.colorTheme || 'cyan'} onChange={e => setCurrentDomain({ ...currentDomain, colorTheme: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none">
                                        <option value="cyan">Cyan</option>
                                        <option value="magenta">Magenta</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="green">Green</option>
                                        <option value="white">White</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg text-white/70 hover:bg-white/5">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg flex items-center gap-2"><Save size={16} /> Save</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
