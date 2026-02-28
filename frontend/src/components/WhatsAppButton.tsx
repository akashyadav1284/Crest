"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false);

    // Replace this with your actual WhatsApp group invite link
    const whatsappLink = "https://chat.whatsapp.com/FSLOBaX5GYrG4KyDfN4dYh?mode=gi_t";

    return (
        <div
            className="fixed z-[9999]"
            style={{ bottom: '25px', left: '25px' }}
        >
            <div className="relative flex items-center">
                {/* Main WhatsApp Button */}
                <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative flex items-center justify-center w-[55px] h-[55px] md:w-[65px] md:h-[65px] bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30 text-white hover:bg-[#20bd5a] transition-colors focus:outline-none z-20"

                    // Entrance Animation
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 1, // Appear after 1 second delay
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}

                    // Hover Effects
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 0px 20px 5px rgba(37, 211, 102, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* CSS Pulse Animation (Idle breath) */}
                    <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" style={{ animationDuration: '3s' }} />

                    {/* WhatsApp Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="relative z-10 w-8 h-8 md:w-9 md:h-9"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                </motion.a>

                {/* Glassmorphism Tooltip - Fades in on hover (Absolute relative to button) */}
                <motion.div
                    initial={{ opacity: 0, x: -10, pointerEvents: "none" }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 15 : -10,
                        pointerEvents: isHovered ? "auto" : "none"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute left-full bg-black/50 backdrop-blur-xl border border-white/10 text-white text-sm px-5 py-3 rounded-2xl shadow-xl shadow-black/50 hidden md:block w-max z-10 whitespace-nowrap"
                >
                    <p className="font-inter tracking-wide m-0">
                        Need Help? <span className="text-[#25D366] font-semibold">ask your query</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
