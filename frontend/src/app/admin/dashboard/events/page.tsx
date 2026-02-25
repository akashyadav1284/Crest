"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EventItem {
    _id: string;
    eventTitle: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    status: string;
    registrationLink?: string;
    imageURL?: string;
    color: string;
}

export default function EventsManagement() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [form, setForm] = useState({
        eventTitle: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        status: "Upcoming",
        registrationLink: "",
        imageURL: "",
        color: "cyan"
    });

    const apiUrl = "http://localhost:5000/api";

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${apiUrl}/events`);
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error("Failed to fetch events");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            const url = editingId ? `${apiUrl}/events/${editingId}` : `${apiUrl}/events`;
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setForm({ eventTitle: "", description: "", date: "", time: "", venue: "", status: "Upcoming", registrationLink: "", imageURL: "", color: "cyan" });
                fetchEvents();
            } else {
                alert("Operation failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await fetch(`${apiUrl}/events/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const openEdit = (event: EventItem) => {
        setEditingId(event._id);
        setForm({
            eventTitle: event.eventTitle,
            description: event.description,
            date: event.date,
            time: event.time,
            venue: event.venue,
            status: event.status,
            registrationLink: event.registrationLink || "",
            imageURL: event.imageURL || "",
            color: event.color
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white flex items-center gap-3">
                        <CalendarIcon className="text-cyan-500" />
                        Events Management
                    </h1>
                    <p className="text-white/50 text-sm mt-2 font-inter">Add, edit, and manage hackathons & events.</p>
                </div>
                <button
                    onClick={() => { setEditingId(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-lg uppercase tracking-wider transition-all"
                >
                    <Plus size={18} /> New Event
                </button>
            </header>

            {loading ? (
                <div className="text-white/50 animate-pulse">Loading events...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white/5 border border-white/10 rounded-xl p-6 relative group overflow-hidden flex flex-col min-h-[250px]">
                            <div className={`absolute top-0 left-0 w-1 h-full bg-${event.color}-500 z-10`} />

                            {event.imageURL && (
                                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none transition-opacity group-hover:opacity-20">
                                    <img src={event.imageURL} alt={event.eventTitle} className="w-full h-full object-cover rounded-r-xl" />
                                </div>
                            )}

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full bg-${event.color}-500/20 text-${event.color}-400 border border-${event.color}-500/50`}>
                                        {event.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(event)} className="text-white/50 hover:text-cyan-400 transition-colors"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(event._id)} className="text-white/50 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{event.eventTitle}</h3>
                                <p className="text-sm text-white/50 line-clamp-2 mb-4">{event.description}</p>
                                <div className="text-xs text-white/60 space-y-1">
                                    <p><strong className="text-white/80">Date:</strong> {event.date} | {event.time}</p>
                                    <p><strong className="text-white/80">Venue:</strong> {event.venue}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <div className="col-span-full text-center py-10 text-white/40 italic">No events found. Create one.</div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-[#0a0a0a] p-6 border-b border-white/10 flex justify-between items-center z-10">
                                <h2 className="text-xl font-bold uppercase text-white flex items-center gap-2">
                                    {editingId ? "Edit Event" : "Create New Event"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Event Title</label>
                                        <input required type="text" name="eventTitle" value={form.eventTitle} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Description</label>
                                        <textarea required name="description" value={form.description} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Date</label>
                                        <input required type="text" placeholder="e.g. Oct 24, 2026" name="date" value={form.date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Time</label>
                                        <input required type="text" placeholder="e.g. 10:00 AM" name="time" value={form.time} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Venue</label>
                                        <input required type="text" name="venue" value={form.venue} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Status</label>
                                        <select name="status" value={form.status} onChange={handleChange} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500">
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Color Theme</label>
                                        <select name="color" value={form.color} onChange={handleChange} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500">
                                            <option value="cyan">Cyan</option>
                                            <option value="magenta">Magenta</option>
                                            <option value="yellow">Yellow</option>
                                            <option value="green">Green</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Registration Link (Optional)</label>
                                        <input type="url" name="registrationLink" value={form.registrationLink} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Banner Image URL (Optional)</label>
                                        <input type="url" name="imageURL" value={form.imageURL} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500" />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-white/50 hover:text-white uppercase text-sm tracking-widest font-bold">Cancel</button>
                                    <button type="submit" className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black uppercase text-sm tracking-widest font-bold">{editingId ? 'Save Changes' : 'Create Event'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

