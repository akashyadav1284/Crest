"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Preload, Stars, Grid } from "@react-three/drei";
import * as THREE from "three";

function DataStreams({ count = 50 }) {
    const linesRef = useRef<THREE.Group>(null);

    const lines = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 40,
                Math.random() * 20 - 5,
                (Math.random() - 0.5) * 40
            ],
            speed: Math.random() * 0.2 + 0.05,
            length: Math.random() * 2 + 1,
        }));
    }, [count]);

    useFrame((_, delta) => {
        if (linesRef.current) {
            linesRef.current.children.forEach((line: any, i) => {
                line.position.y += lines[i].speed;
                if (line.position.y > 15) {
                    line.position.y = -5;
                }
            });
        }
    });

    return (
        <group ref={linesRef}>
            {lines.map((line, i) => (
                <mesh key={i} position={line.position as [number, number, number]}>
                    <cylinderGeometry args={[0.02, 0.02, line.length, 4]} />
                    <meshBasicMaterial
                        color="#06b6d4"
                        transparent
                        opacity={0.3}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    );
}

export function SceneBackground({ isBooted }: { isBooted: boolean }) {
    const bgRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!isBooted) return;

        // Slight parallax effect based on mouse pointer
        const targetX = (state.pointer.x * 2);
        const targetY = (state.pointer.y * 2) + 2; // Offset for base camera height

        state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
        state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={bgRef} visible={isBooted}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 10, 5]} intensity={1.5} color="#06b6d4" />
            <spotLight
                position={[0, 5, 0]}
                intensity={2}
                color="#d946ef"
                distance={20}
                angle={Math.PI / 4}
                penumbra={1}
            />

            <fog attach="fog" args={["#000000", 10, 40]} />

            <Grid
                position={[0, -4, 0]}
                args={[100, 100]}
                cellSize={1}
                cellThickness={1}
                cellColor="#06b6d4"
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#d946ef"
                fadeDistance={40}
                fadeStrength={2}
            />

            {/* Floating Particles */}
            <Stars
                radius={20}
                depth={50}
                count={2000}
                factor={3}
                saturation={1}
                fade
                speed={1}
            />

            <DataStreams count={80} />
            <Preload all />
        </group>
    );
}
