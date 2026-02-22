"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";

export function JoinForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Extract form data
        const formData = new FormData(e.currentTarget);
        const requestData = {
            name: formData.get("name"),
            regNo: formData.get("regNo"),
            email: formData.get("email"),
            skillset: formData.get("skillset"),
        };

        try {
            // Send to Express Backend
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const response = await fetch(`${API_URL}/api/join`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setSubmitted(true);
                (e.target as HTMLFormElement).reset(); // Clear the form
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                const errData = await response.json();
                console.error("Failed to submit request to server: ", errData.message || "Unknown Error");
                alert("Failed to Submit: " + (errData.message || "Please check if your backend server is running correctly."));
            }
        } catch (error) {
            console.error("Backend offline or error occurred:", error);
            alert("Network Error: Could not connect to the backend server at localhost:5000.");
        }
    };

    return (
        <section id="join" className="py-32 px-6 bg-transparent relative flex justify-center items-center font-inter">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10 flex flex-col md:flex-row gap-16 items-center">

                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 text-cyan-400 mb-4">
                        <Terminal size={24} />
                        <span className="font-mono uppercase tracking-widest text-sm">System Ready</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white">
                        Access <span className="text-magenta-500">Granted.</span>
                    </h2>
                    <p className="text-white/60">
                        Submit your credentials to join CREST. We are looking for passionate developers, hardware hackers, and innovators.
                    </p>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 font-mono text-sm text-white/50 space-y-2 mt-8">
                        <p><span className="text-cyan-400">$</span> ping crest.server.io</p>
                        <p>Reaching out to mainframe...</p>
                        <p className="text-green-400">Connection established.</p>
                    </div>
                </div>

                <motion.div
                    className="flex-1 w-full max-w-md"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <form className="glass-card flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">User Identifier</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Registration Number</label>
                            <input
                                type="text"
                                name="regNo"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                                placeholder="e.g. 12200000"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Comms Channel</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-magenta-500 focus:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all"
                                placeholder="student@university.edu"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Primary Skillset</label>
                            <select name="skillset" required defaultValue="" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white/70 appearance-none focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                <option value="" disabled>Select Domain...</option>
                                <option value="robotics">Robotics & Hardware</option>
                                <option value="ai">Artificial Intelligence</option>
                                <option value="web">Full-Stack Development</option>
                                <option value="web3">Web3 & Blockchain</option>
                                <option value="design">UI/UX & 3D Design</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full relative group overflow-hidden rounded-lg bg-cyan-500/10 border border-cyan-500 px-6 py-4 text-cyan-400 font-bold tracking-widest uppercase hover:text-black transition-colors duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {submitted ? "Data Transmitted" : "Send Request"} {submitted ? null : <Send size={18} />}
                            </span>
                            <div className="absolute inset-0 h-full w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:w-full z-0" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
