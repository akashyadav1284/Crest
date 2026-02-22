"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { CreditCard, QrCode, Lock, ShieldCheck, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

function PaymentContent({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamId = searchParams.get("teamId");

    const [isProcessing, setIsProcessing] = useState(false);
    const [method, setMethod] = useState<"card" | "upi">("upi");

    const hackathonName = id === "hack-and-build-2026" ? "Hack and Build 2026" : "Inferno Verse 2025";
    const fee = id === "hack-and-build-2026" ? "₹500.00" : "₹0.00 (Free)";

    const handlePaymentSubmit = async () => {
        setIsProcessing(true);

        try {
            if (teamId) {
                // Ping backend to confirm payment
                await fetch(`http://localhost:5000/api/hackathons/payment/${teamId}`, {
                    method: 'POST'
                });
            }

            // Simulating a mock payment gateway processing time
            setTimeout(() => {
                router.push(`/hackathons/${id}/success`);
            }, 2000);
        } catch (error) {
            console.error("Payment Confirmation Error:", error);
            alert("Error confirming payment, please contact support.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Order Summary Column */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl border border-white/10"
            >
                <div className="flex items-center gap-3 text-cyan-400 mb-6">
                    <Lock size={20} />
                    <span className="font-mono uppercase tracking-widest text-sm">Secure Checkout</span>
                </div>

                <h2 className="text-3xl font-black font-outfit uppercase text-white mb-8 border-b border-white/10 pb-4">
                    Order Summary
                </h2>

                <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-white mb-1">Registration Ticket</h4>
                            <p className="text-white/50 text-sm">{hackathonName}</p>
                        </div>
                        <span className="font-mono text-white">{fee}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-white mb-1">Platform Fee</h4>
                            <p className="text-white/50 text-sm">Processing charges</p>
                        </div>
                        <span className="font-mono text-white">₹0.00</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between items-center bg-white/5 -mx-8 -mb-8 p-8 rounded-b-3xl">
                    <span className="text-white/70 font-mono tracking-widest uppercase">Total Paid</span>
                    <span className="text-4xl font-black font-outfit text-cyan-400">{fee}</span>
                </div>
            </motion.div>

            {/* Payment Gateway Column */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-3xl border border-white/10"
            >
                <h3 className="text-xl font-bold font-outfit uppercase text-white mb-6">
                    Select Payment Protocol
                </h3>

                {/* Method Selector */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => setMethod("upi")}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors ${method === "upi" ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                            }`}
                    >
                        <QrCode size={24} />
                        <span className="font-mono uppercase tracking-widest text-xs">UPI / QR</span>
                    </button>
                    <button
                        onClick={() => setMethod("card")}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors ${method === "card" ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                            }`}
                    >
                        <CreditCard size={24} />
                        <span className="font-mono uppercase tracking-widest text-xs">Card</span>
                    </button>
                </div>

                {/* Dynamic Gateway View */}
                <div className="p-6 rounded-xl bg-black/50 border border-white/5 mb-8 min-h-[200px] flex items-center justify-center text-center">
                    {method === "upi" ? (
                        <div className="space-y-4">
                            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl">
                                <div className="w-full h-full border-4 border-dashed border-black/20 flex flex-col items-center justify-center text-black/40">
                                    <QrCode size={40} />
                                </div>
                            </div>
                            <p className="text-white/50 font-mono text-xs uppercase tracking-widest">Scan using any UPI app</p>
                        </div>
                    ) : (
                        <div className="w-full space-y-4 text-left">
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-widest text-white/50 font-mono">CVV</label>
                                    <input type="password" placeholder="•••" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="w-full relative group overflow-hidden rounded-lg bg-cyan-500/10 border border-cyan-500 px-6 py-4 text-cyan-400 font-bold tracking-widest uppercase hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isProcessing ? "Processing Block..." : "Proceed to Transfer"}
                        {isProcessing ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><CheckCircle size={18} /></motion.div> : <ShieldCheck size={18} />}
                    </span>
                    <div className="absolute inset-0 h-full w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:w-full z-0" />
                </button>

                <p className="text-center text-white/40 mt-6 text-xs font-inter flex items-center justify-center gap-2">
                    <Lock size={12} /> Encrypted via AES-256
                </p>
            </motion.div>

        </div>
    );
}

export default function HackathonPaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <section className="min-h-[80vh] px-6 py-12 relative flex justify-center font-inter">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <Suspense fallback={<div className="text-cyan-400 font-mono animate-pulse">Initializing Secure Tunnel...</div>}>
                <PaymentContent id={id} />
            </Suspense>
        </section>
    );
}
