"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface Announcement {
    _id: string;
    title: string;
    content: string;
}

export function AnnouncementsBanner() {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/announcements`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setAnnouncement(data[0]); // Show the most recent active broadcast
                        setIsVisible(true);
                    }
                }
            } catch (err) {
                console.warn("Failed to fetch announcements", err);
            }
        };

        // Don't fetch until component mounts
        fetchAnnouncements();
    }, []);

    if (!isVisible || !announcement) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
            >
                <div className="bg-yellow-500/10 backdrop-blur-md border border-yellow-500/50 rounded-xl p-4 shadow-[0_0_30px_rgba(234,179,8,0.2)] flex gap-4 items-start relative group">
                    <div className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg">
                        <AlertCircle size={20} />
                    </div>
                    <div className="flex-1 pr-6">
                        <h4 className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-1">
                            {announcement.title}
                        </h4>
                        <p className="text-white/80 text-xs font-inter leading-relaxed">
                            {announcement.content}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-yellow-500/50 hover:text-yellow-400 transition-colors"
                    >
                        <X size={16} />
                    </button>
                    {/* Glowing effect line */}
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
