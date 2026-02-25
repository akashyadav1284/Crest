"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, FileText, LogOut, Type, Globe, Megaphone, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin/login");
        } else {
            setIsAuth(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    if (!isAuth) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

    const navItems = [
        { name: "Overview", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Homepage Content", href: "/admin/dashboard/homepage", icon: <Type size={20} /> },
        { name: "Domains", href: "/admin/dashboard/domains", icon: <Globe size={20} /> },
        { name: "Events", href: "/admin/dashboard/events", icon: <Calendar size={20} /> },
        { name: "Team Panel", href: "/admin/dashboard/team", icon: <Users size={20} /> },
        { name: "Announcements", href: "/admin/dashboard/announcements", icon: <Megaphone size={20} /> },
        { name: "Hackathons", href: "/admin/dashboard/hackathons", icon: <Target size={20} /> },
        { name: "Join Requests", href: "/admin/dashboard/requests", icon: <FileText size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex text-white font-inter">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                className="w-64 bg-black/80 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-8 z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)]"
            >
                <div className="flex flex-col items-center mb-12 gap-3 cursor-pointer" onClick={() => router.push('/')}>
                    <img src="/crest-logo.png" alt="CREST" className="w-12 h-12 object-contain" />
                    <span className="text-xl font-outfit font-bold tracking-widest text-white mt-1 uppercase">Admin</span>
                </div>

                <nav className="flex-1 w-full px-4 space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${pathname === item.href
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {item.icon}
                            <span className="text-sm uppercase tracking-wider">{item.name}</span>
                        </a>
                    ))}
                </nav>

                <div className="w-full px-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-red-500/70 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/30"
                    >
                        <LogOut size={20} />
                        <span className="text-sm uppercase tracking-wider font-bold">Logout</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10 z-10 relative">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
