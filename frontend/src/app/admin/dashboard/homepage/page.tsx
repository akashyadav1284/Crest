"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, AlertCircle } from "lucide-react";

export default function HomepageManager() {
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [showContent, setShowContent] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Load current content
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/homepage`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        setHeading(data.heading);
                        setSubheading(data.subheading);
                        setShowContent(data.showContent);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch homepage content", err);
            }
        };

        fetchContent();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("adminToken");

        try {
            const res = await fetch(`${API_URL}/api/homepage`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ heading, subheading, showContent })
            });

            if (res.ok) {
                setMessage("Content updated successfully!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Failed to update content.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black font-outfit uppercase tracking-tighter text-white">
                        Homepage <span className="text-cyan-400">Content</span>
                    </h1>
                    <p className="text-white/50 font-inter mt-1">Manage the hero section headings and visibility.</p>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${message.includes('success') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                    <AlertCircle size={20} />
                    {message}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm uppercase tracking-widest text-white/50 font-mono mb-2">Main Heading</label>
                        <input
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                            placeholder="e.g. We Innovate The Future."
                        />
                    </div>

                    <div>
                        <label className="block text-sm uppercase tracking-widest text-white/50 font-mono mb-2">Subheading / Description</label>
                        <textarea
                            value={subheading}
                            onChange={(e) => setSubheading(e.target.value)}
                            required
                            rows={4}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <input
                            type="checkbox"
                            id="showContent"
                            checked={showContent}
                            onChange={(e) => setShowContent(e.target.checked)}
                            className="w-5 h-5 accent-cyan-500 bg-black border-white/20 rounded"
                        />
                        <label htmlFor="showContent" className="text-sm font-inter text-white/80 select-none cursor-pointer">
                            Show text content on the landing page
                        </label>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest rounded-lg transition-all"
                        >
                            <Save size={18} />
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
