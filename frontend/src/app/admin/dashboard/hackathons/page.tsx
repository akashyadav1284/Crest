"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Calendar, Target, MapPin, X, Users, Image as ImageIcon } from "lucide-react";

interface Hackathon {
    _id: string;
    hackathonName: string;
    description: string;
    date: string;
    duration: string;
    venue: string;
    participants: string;
    organizer: string;
    status: string;
    registrationLink?: string;
    bannerImage?: string;
}

export default function HackathonsAdminPanel() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const [form, setForm] = useState({
        hackathonName: "",
        description: "",
        date: "",
        duration: "",
        venue: "",
        participants: "",
        organizer: "Crest Club",
        status: "Upcoming",
        registrationLink: "",
        bannerImage: ""
    });

    const fetchHackathons = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/hackathons/admin`);
            if (res.ok) {
                const data = await res.json();
                setHackathons(data);
            }
        } catch (err) {
            console.error("Failed to fetch hackathons");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHackathons();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            const url = editingHackathon
                ? `${apiUrl}/api/hackathons/admin/${editingHackathon._id}`
                : `${apiUrl}/api/hackathons/admin`;

            const method = editingHackathon ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                fetchHackathons();
                closeModal();
            }
        } catch (err) {
            console.error("Failed to save hackathon");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this hackathon?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`${apiUrl}/api/hackathons/admin/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchHackathons();
            }
        } catch (err) {
            console.error("Failed to delete hackathon");
        }
    };

    const openModal = (hackathon?: Hackathon) => {
        if (hackathon) {
            setEditingHackathon(hackathon);
            setForm({
                hackathonName: hackathon.hackathonName,
                description: hackathon.description,
                date: hackathon.date,
                duration: hackathon.duration,
                venue: hackathon.venue,
                participants: hackathon.participants,
                organizer: hackathon.organizer,
                status: hackathon.status,
                registrationLink: hackathon.registrationLink || "",
                bannerImage: hackathon.bannerImage || ""
            });
        } else {
            setEditingHackathon(null);
            setForm({
                hackathonName: "",
                description: "",
                date: "",
                duration: "",
                venue: "",
                participants: "",
                organizer: "Crest Club",
                status: "Upcoming",
                registrationLink: "",
                bannerImage: ""
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingHackathon(null);
    };

    if (loading) return <div className="text-white">Loading Hackathons Manager...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black font-outfit uppercase tracking-tighter text-white">Hackathons Manager</h1>
                    <p className="text-white/50 text-sm font-inter">Manage major competitive events.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500 hover:text-black transition-colors uppercase font-mono text-sm tracking-wider"
                >
                    <Plus size={16} /> Add Hackathon
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {hackathons.map((hackathon) => (
                    <div key={hackathon._id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`text-xs font-mono tracking-widest uppercase px-2 py-1 rounded border mb-2 inline-block
                                        ${hackathon.status === 'Upcoming' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50' :
                                            hackathon.status === 'Ongoing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50' :
                                                'bg-white/5 text-white/50 border-white/20'}`}
                                    >
                                        {hackathon.status}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">{hackathon.hackathonName}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal(hackathon)} className="p-2 text-white/50 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(hackathon._id)} className="p-2 text-white/50 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-white/60 text-sm mb-4 line-clamp-2">{hackathon.description}</p>

                            <div className="grid grid-cols-2 gap-y-2 text-sm text-white/50 font-inter">
                                <div className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500" /> {hackathon.date}</div>
                                <div className="flex items-center gap-2"><Target size={14} className="text-cyan-500" /> {hackathon.duration}</div>
                                <div className="flex items-center gap-2"><MapPin size={14} className="text-cyan-500" /> {hackathon.venue}</div>
                                <div className="flex items-center gap-2"><Users size={14} className="text-cyan-500" /> {hackathon.participants}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">{editingHackathon ? 'Edit Hackathon' : 'New Hackathon'}</h2>
                            <button onClick={closeModal} className="text-white/50 hover:text-white"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-white/70">Hackathon Name</label>
                                    <input required type="text" value={form.hackathonName} onChange={e => setForm({ ...form, hackathonName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="Hackathon Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/70">Status</label>
                                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500">
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Description</label>
                                <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="Provide event details..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-white/70">Date string</label>
                                    <input required type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Oct 24-26, 2026" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/70">Duration</label>
                                    <input required type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="e.g. 48 Hours" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/70">Venue</label>
                                    <input required type="text" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="e.g. LPU Campus" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/70">Participants (Expected)</label>
                                    <input required type="text" value={form.participants} onChange={e => setForm({ ...form, participants: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="e.g. 500+ Innovators" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Registration Link URL</label>
                                <input type="text" value={form.registrationLink} onChange={e => setForm({ ...form, registrationLink: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="https://..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70 flex gap-2"><ImageIcon size={16} /> Banner Image URL</label>
                                <input type="text" value={form.bannerImage} onChange={e => setForm({ ...form, bannerImage: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="https://..." />
                                {form.bannerImage && (
                                    <div className="mt-2 h-32 rounded-lg bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${form.bannerImage})` }} />
                                )}
                            </div>

                            <div className="pt-4 flex justify-end gap-4">
                                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-lg text-white/70 hover:text-white transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors uppercase tracking-wider text-sm font-mono">Save Hackathon</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
