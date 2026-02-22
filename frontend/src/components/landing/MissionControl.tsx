"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CrestLogo3D } from "./CrestLogo3D";
import { HudOverlay } from "./HudOverlay";
import { HeroContent } from "./HeroContent";

export function MissionControl({ isBooted }: { isBooted: boolean }) {
    return (
        <section className="relative min-h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center">
            {/* HUD Layer */}
            <HudOverlay isBooted={isBooted} />

            {/* 3D Canvas Logo Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 5, 15], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                    <Suspense fallback={null}>
                        <CrestLogo3D isBooted={isBooted} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Hero 3D Text & CTA Layer */}
            <HeroContent isBooted={isBooted} />
        </section>
    );
}
