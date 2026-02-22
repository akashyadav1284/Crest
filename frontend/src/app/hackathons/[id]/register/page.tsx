"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";

export default function HackathonRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const requestData = {
            eventId: id,
            name: formData.get("name"),
            regNo: formData.get("regNo"),
            course: formData.get("course"),
            year: formData.get("year"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            teamName: formData.get("teamName"),
            members: formData.get("members"),
        };

        try {
            const response = await fetch("http://localhost:5000/api/hackathons/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Pass the teamId in URL to payment page for later confirmation
                router.push(`/hackathons/${id}/payment?teamId=${data.teamId}`);
            } else {
                alert("Registration Failed: " + (data.message || "Unknown Error"));
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Network Error: Could not connect to the backend server.");
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-[80vh] px-6 py-12 relative flex flex-col items-center justify-center font-inter">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none -z-10" />

            <div className="w-full max-w-2xl mb-8">
                <Link href={`/hackathons/${id}`} className="text-cyan-400 font-mono tracking-widest uppercase text-xs hover:text-white transition-colors">
                    &lt; Back to Event Details
                </Link>
            </div>

            <motion.div
                className="w-full max-w-2xl glass-card rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-magenta-500 left-0" />

                <div className="flex items-center gap-3 text-cyan-400 mb-6">
                    <Terminal size={24} />
                    <span className="font-mono uppercase tracking-widest text-sm">Secure Terminal</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white mb-2">
                    Team <span className="text-magenta-500">Registration</span>
                </h2>
                <p className="text-white/60 mb-10">Enter your squad's credentials to lock in your spot for {id.replace(/-/g, ' ').toUpperCase()}.</p>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                    {/* Grid for splitting inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Full Name (Team Leader)" name="name" placeholder="John Doe" />
                        <InputField label="Registration Number" name="regNo" placeholder="12200000" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Course / Major" name="course" placeholder="B.Tech CSE" />
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Year of Study</label>
                            <select required name="year" defaultValue="" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white/70 appearance-none focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                <option value="" disabled>Select Year...</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Comm Channel (Email)" type="email" name="email" placeholder="leader@university.edu" />
                        <InputField label="Phone Number" type="tel" name="phone" placeholder="+91 99999 99999" />
                    </div>

                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 mt-4">
                        <h4 className="font-outfit text-white mb-4 uppercase tracking-widest text-sm border-b border-white/10 pb-2">Squad Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Team Name" name="teamName" placeholder="e.g. Cyber Punks" />
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Total Members</label>
                                <select required name="members" defaultValue="" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white/70 appearance-none focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                    <option value="" disabled>Select Count...</option>
                                    <option value="2">2 Members</option>
                                    <option value="3">3 Members</option>
                                    <option value="4">4 Members (Max)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 w-full relative group overflow-hidden rounded-lg bg-cyan-500/10 border border-cyan-500 px-6 py-4 text-cyan-400 font-bold tracking-widest uppercase hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? "Encrypting Payload..." : "Save details & Continue"}
                            {!isSubmitting && <ArrowRight size={18} />}
                        </span>
                        <div className="absolute inset-0 h-full w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:w-full z-0" />
                    </button>

                </form>
            </motion.div>
        </section>
    );
}

function InputField({ label, name, type = "text", placeholder }: { label: string, name: string, type?: string, placeholder?: string }) {
    return (
        <div className="space-y-1 w-full">
            <label className="text-xs uppercase tracking-widest text-white/50 font-mono">{label}</label>
            <input
                type={type}
                name={name}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all placeholder:text-white/20"
                placeholder={placeholder}
            />
        </div>
    );
}
