"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export function HeroContent({ isBooted }: { isBooted: boolean }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-500, 500], [10, -10]);
    const rotateY = useTransform(x, [-500, 500], [-10, 10]);

    useEffect(() => {
        if (!isBooted) return;
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX - window.innerWidth / 2);
            y.set(e.clientY - window.innerHeight / 2);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isBooted, x, y]);

    if (!isBooted) return null;

    return (
        <div className="absolute inset-0 z-30 pointer-events-none perspective-[2000px] overflow-hidden">
            {/* Content Focus Overlay - Dark vignette to push background back */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none -z-10" />

            {/* UPPER TEXT (Above Circle) */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                className="absolute top-[15vh] w-full flex justify-center"
            >
                <div className="text-center" style={{ transform: "translateZ(50px)" }}>
                    <motion.h2
                        className="text-sm md:text-xl font-mono tracking-[0.5em] text-cyan-400 font-light mix-blend-screen drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
                        animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
                        transition={{ duration: 1.5, delay: 3, ease: "easeOut" }}
                    >
                        INNOVATION STUDIO PRESENTS
                    </motion.h2>
                </div>
            </motion.div>

            {/* LOWER TEXT (Below Circle) */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                className="absolute bottom-[2vh] w-full flex flex-col items-center"
            >
                <div className="text-center" style={{ transform: "translateZ(50px)" }}>
                    <motion.h1
                        className="text-6xl md:text-9xl font-black font-outfit uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_10px_35px_rgba(0,0,0,1)] relative group"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Glitch sub-layer */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-[glitch_0.3s_infinite] text-cyan-500 drop-shadow-[0_0_20px_var(--tw-shadow-color)] z-[-1] pointer-events-none -ml-1">CREST</div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-[glitch_0.2s_infinite_reverse] text-magenta-500 drop-shadow-[0_0_20px_var(--tw-shadow-color)] z-[-2] pointer-events-none ml-1">CREST</div>
                        CREST
                    </motion.h1>
                </div>
            </motion.div>
        </div>
    );
}
