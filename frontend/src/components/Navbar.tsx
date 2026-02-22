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
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3">
                    <img src="/crest-logo.png" alt="CREST" className="w-12 h-12 object-contain" />
                    <span className="text-xl font-outfit font-bold tracking-widest text-white mt-1">CREST</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-inter text-white/70 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#join"
                        className="px-6 py-2 rounded-full border border-magenta-500 text-magenta-500 hover:bg-magenta-500 hover:text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all uppercase text-sm tracking-widest"
                    >
                        Join
                    </a>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
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
                            href="#join"
                            onClick={() => setMenuOpen(false)}
                            className="px-8 py-3 rounded-full bg-magenta-500 text-white font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]"
                        >
                            Join
                        </a>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
