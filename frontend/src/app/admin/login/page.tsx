"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [adminId, setAdminId] = useState("");
    const [passKey, setPassKey] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Updated route URL: Use NEXT_PUBLIC_API_URL or relative /api as proxied in some setups
            // Let's assume standard NEXT_PUBLIC_API_URL or fallback to backend default port 5000 if running locally
            const apiUrl = "http://localhost:5000/api";

            const res = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId, passKey }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Login failed");
            }

            // Save token to localStorage
            localStorage.setItem("adminToken", data.token);

            // Redirect to dashboard
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-900/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-red-500/30 p-8 rounded-2xl z-10 shadow-[0_0_30px_rgba(248,113,113,0.1)]"
            >
                <div className="flex flex-col items-center mb-8">
                    <img src="/crest-logo.png" alt="CREST" className="w-16 h-16 object-contain mb-4" />
                    <h1 className="text-2xl font-outfit font-bold tracking-widest text-white uppercase">
                        Admin <span className="text-red-500">Portal</span>
                    </h1>
                    <p className="text-white/50 text-sm mt-2 font-inter text-center">
                        Secure access restricted to authorized personnel.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-white/70 text-sm font-inter uppercase tracking-wider mb-2">
                            Admin ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-inter"
                            placeholder="Enter Admin ID"
                        />
                    </div>

                    <div>
                        <label className="block text-white/70 text-sm font-inter uppercase tracking-wider mb-2">
                            Pass Key <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={passKey}
                            onChange={(e) => setPassKey(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-inter"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-lg bg-red-600/20 border border-red-500 text-red-400 font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(248,113,113,0.5)] transition-all disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Access System"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="w-full py-3 rounded-lg bg-transparent text-white/50 font-medium uppercase tracking-widest hover:text-white transition-all text-sm mt-4"
                    >
                        Return to Homepage
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

