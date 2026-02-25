"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Users as UsersIcon, X, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    imageURL: string;
    linkedin?: string;
    github?: string;
}

export default function TeamManagement() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        role: "",
        imageURL: "",
        linkedin: "",
        github: ""
    });

    const apiUrl = "http://localhost:5000/api";

    const fetchTeam = async () => {
        try {
            const res = await fetch(`${apiUrl}/team`);
            const data = await res.json();
            setTeam(data);
        } catch (err) {
            console.error("Failed to fetch team");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`${apiUrl}/team`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setIsModalOpen(false);
                setForm({ name: "", role: "", imageURL: "", linkedin: "", github: "" });
                fetchTeam();
            } else {
                alert("Operation failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remove this team member?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${apiUrl}/team/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchTeam();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white flex items-center gap-3">
                        <UsersIcon className="text-cyan-500" />
                        Team Management
                    </h1>
                    <p className="text-white/50 text-sm mt-2 font-inter">Add or remove core team members dynamically.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-magenta-600 hover:bg-magenta-500 text-white font-bold py-2 px-4 rounded-lg uppercase tracking-wider transition-all"
                >
                    <Plus size={18} /> Add Member
                </button>
            </header>

            {loading ? (
                <div className="text-white/50 animate-pulse">Loading team...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {team.map((member) => (
                        <div key={member._id} className="bg-white/5 border border-white/10 rounded-xl p-4 relative group flex flex-col items-center text-center">
                            <button
                                onClick={() => handleDelete(member._id)}
                                className="absolute top-3 right-3 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-400 bg-red-500/10 p-2 rounded-full transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                            <img src={member.imageURL} alt={member.name} className="w-24 h-24 rounded-full object-cover border-2 border-magenta-500/50 mb-4" />
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider">{member.name}</h3>
                            <p className="text-sm text-cyan-400 mb-4 uppercase tracking-widest text-[10px]">{member.role}</p>
                            <div className="flex gap-3 text-white/50">
                                {member.github && <a href={member.github} target="_blank" className="hover:text-white"><Github size={18} /></a>}
                                {member.linkedin && <a href={member.linkedin} target="_blank" className="hover:text-white"><Linkedin size={18} /></a>}
                            </div>
                        </div>
                    ))}
                    {team.length === 0 && (
                        <div className="col-span-full text-center py-10 text-white/40 italic">No team members found.</div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#0a0a0a] border border-magenta-500/30 rounded-2xl w-full max-w-md"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-xl font-bold uppercase text-white">Add Team Member</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Name</label>
                                    <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-magenta-500" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Role</label>
                                    <input required type="text" name="role" value={form.role} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-magenta-500" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Image URL</label>
                                    <input required type="text" name="imageURL" value={form.imageURL} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-magenta-500" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">LinkedIn URL (Optional)</label>
                                    <input type="text" name="linkedin" value={form.linkedin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-magenta-500" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Github URL (Optional)</label>
                                    <input type="text" name="github" value={form.github} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-magenta-500" />
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
                                    <button type="submit" className="w-full py-3 rounded-lg bg-magenta-600 hover:bg-magenta-500 text-white uppercase text-sm tracking-widest font-bold transition-colors">Add Member</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

