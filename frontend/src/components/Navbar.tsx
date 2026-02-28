"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "/#about" },
        { name: "Domains", href: "/#domains" },
        { name: "Team", href: "/#team" },
        { name: "Hackathons", href: "/hackathons" },
        { name: "Events", href: "/#events" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}
        >
            {/* Desktop Layout (Evenly Spaced with Depth Effect) */}
            <div className="hidden md:flex container mx-auto px-4 lg:px-6 py-4 items-center justify-between w-full">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3">
                    <img src="/crestlogo.png" alt="CREST" className="w-10 h-10 lg:w-12 lg:h-12 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
                    <span className="text-lg lg:text-xl font-outfit font-bold tracking-widest text-white mt-1 hidden xl:block drop-shadow-[0_2px_5px_rgba(255,255,255,0.3)]">CREST</span>
                </a>

                {/* Nav Links */}
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="px-3 lg:px-5 py-2 rounded-xl bg-white/5 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:border-cyan-500/50 backdrop-blur-md text-[10px] lg:text-xs font-inter text-white/80 hover:text-cyan-400 transition-all uppercase tracking-widest"
                    >
                        {link.name}
                    </a>
                ))}

                <a
                    href="/admin/login"
                    className="px-3 lg:px-5 py-2 rounded-xl bg-red-500/5 border border-red-500/20 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(248,113,113,0.4)] hover:border-red-500/50 backdrop-blur-md text-[10px] lg:text-xs font-inter text-red-400 hover:text-red-300 transition-all uppercase tracking-widest"
                >
                    Admin
                </a>

                {/* Join Box */}
                <a
                    href="#join"
                    className="px-5 lg:px-6 py-2 rounded-xl border border-magenta-500/50 bg-magenta-500/10 text-magenta-400 hover:bg-magenta-500 hover:text-white shadow-[0_4px_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] backdrop-blur-md transition-all uppercase text-[10px] lg:text-xs font-bold tracking-widest"
                >
                    Join
                </a>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden container mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3">
                    <img src="/crest-logo.png" alt="CREST" className="w-10 h-10 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]" />
                    <span className="text-lg font-outfit font-bold tracking-widest text-white mt-1 drop-shadow-[0_2px_5px_rgba(255,255,255,0.3)]">CREST</span>
                </a>

                <button
                    className="text-white bg-white/5 border border-white/10 p-2 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-all"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10"
                >
                    <nav className="flex flex-col items-center py-6 gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-lg font-inter text-white hover:text-cyan-400 transition-all uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="/admin/login"
                            onClick={() => setMenuOpen(false)}
                            className="text-lg font-inter text-red-500 hover:text-red-400 transition-all uppercase tracking-widest"
                        >
                            Admin
                        </a>
                        <a
                            href="#join"
                            onClick={() => setMenuOpen(false)}
                            className="px-8 py-3 rounded-xl bg-magenta-500 text-white font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]"
                        >
                            Join
                        </a>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
