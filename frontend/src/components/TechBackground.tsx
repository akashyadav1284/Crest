"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// Generate Random Particles
function generateParticles(count = 5000) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Wider spread for infinite feel
        positions[i * 3] = (Math.random() - 0.5) * 100; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    return positions;
}

// Generate Data Stream lines
function generateDataStreams(count = 50) {
    const lines = [];
    for (let i = 0; i < count; i++) {
        lines.push({
            position: [
                (Math.random() - 0.5) * 40,
                Math.random() * 20 - 5,
                (Math.random() - 0.5) * 40
            ],
            speed: Math.random() * 0.4 + 0.1,
            length: Math.random() * 4 + 1,
        });
    }
    return lines;
}

function DataStreams({ scrollProgress }: { scrollProgress: import("framer-motion").MotionValue<number> }) {
    const linesRef = useRef<THREE.Group>(null);
    const linesData = useRef(generateDataStreams(100));

    useFrame((_, delta) => {
        const scroll = scrollProgress.get();
        // Phase 4 (0.6-0.8): Data streaks fly across
        const speedMultiplier = 1 + (scroll > 0.6 ? (scroll - 0.6) * 50 : 0);

        if (linesRef.current) {
            linesRef.current.children.forEach((line: any, i) => {
                line.position.y += linesData.current[i].speed * speedMultiplier;
                if (line.position.y > 20) {
                    line.position.y = -10;
                }
            });
        }
    });

    return (
        <group ref={linesRef}>
            {linesData.current.map((line, i) => (
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

function TechEnvironment() {
    const { camera, pointer } = useThree();
    const bgRef = useRef<THREE.Group>(null);
    const gridRef1 = useRef<THREE.GridHelper>(null);
    const gridRef2 = useRef<THREE.GridHelper>(null);
    const particlesRef = useRef<THREE.Points>(null);
    const fogRef = useRef<THREE.Fog>(null);

    // Connect to Framer Motion window scroll
    const { scrollYProgress } = useScroll();

    // Make Grids transparent natively
    import('react').then(({ useEffect }) => {
        useEffect(() => {
            if (gridRef1.current && gridRef2.current) {
                (gridRef1.current.material as THREE.LineBasicMaterial).transparent = true;
                (gridRef1.current.material as THREE.LineBasicMaterial).opacity = 0.15;
                (gridRef2.current.material as THREE.LineBasicMaterial).transparent = true;
                (gridRef2.current.material as THREE.LineBasicMaterial).opacity = 0.15;
            }
        }, []);
    });

    // Generate arrays once
    const sphere = useRef(generateParticles(5000));

    // Complex Animations based on scroll phases 0 -> 1
    useFrame((state, delta) => {
        const scroll = scrollYProgress.get();

        // Base Idle Animations
        if (particlesRef.current) {
            // Speed up particle spin at Phase 1 (0-0.2)
            const speedMultiplier = 1 + (scroll > 0 && scroll < 0.2 ? scroll * 50 : 0);
            particlesRef.current.rotation.x -= (delta / 20) * speedMultiplier;
            particlesRef.current.rotation.y -= (delta / 30) * speedMultiplier;
        }

        // Camera Transitions based on Timeline Phases
        if (bgRef.current) {

            // Phase 1 (0-0.2): Grid Perspective Shifts
            if (gridRef1.current && gridRef2.current) {
                const tilt = THREE.MathUtils.lerp(0, Math.PI / 8, scroll * 5);
                gridRef1.current.rotation.x = tilt;
                gridRef2.current.rotation.x = -tilt;
            }

            // Phase 3 (0.4-0.6): Depth Fog Thickens
            if (fogRef.current) {
                if (scroll > 0.4) {
                    const p3Progress = Math.min((scroll - 0.4) * 5, 1);
                    fogRef.current.far = THREE.MathUtils.lerp(35, 15, p3Progress);
                } else {
                    fogRef.current.far = 35;
                }
            }

            // Phase 4 (0.6-0.8): Camera Y-axis rotation starts happening globally
            const maxCamRotY = Math.PI / 4; // 45 degrees
            let camRotTarget = 0;

            if (scroll > 0.6) {
                const p4Progress = Math.min((scroll - 0.6) * 5, 1);
                camRotTarget = THREE.MathUtils.lerp(0, maxCamRotY, p4Progress);
            }

            // Base parallax from mouse, modified by scroll rotation
            const targetX = (pointer.x * 2) + Math.sin(camRotTarget) * 10;
            const targetY = (pointer.y * 2);

            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;

            // Camera zoom logic (Phase 1)
            const targetZ = scroll < 0.2 ? THREE.MathUtils.lerp(15, 8, scroll * 5) : 8;
            camera.position.z += (targetZ - camera.position.z) * 0.05;

            // Anchor the camera lookAt firmly to 0,0,0
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <group ref={bgRef}>
            {/* Cinematic Depth Fog - obscures horizon grids */}
            <fog ref={fogRef} attach="fog" args={["#050505", 5, 35]} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color={"#0891b2"} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color={"#c026d3"} />

            {/* Particles */}
            <group rotation={[0, 0, Math.PI / 4]}>
                <Points ref={particlesRef} positions={sphere.current} stride={3} frustumCulled={false}>
                    <PointMaterial
                        transparent
                        color="#00f0ff"
                        size={0.05}
                        sizeAttenuation={true}
                        depthWrite={false}
                        opacity={0.6}
                        blending={THREE.AdditiveBlending}
                    />
                </Points>
            </group>

            {/* Phase 4 Data Streams */}
            <DataStreams scrollProgress={useScroll().scrollYProgress} />

            {/* Base Grids - Lower density (30 divs instead of 200) and muted colors */}
            <gridHelper ref={gridRef1} args={[200, 30, "#0891b2", "#0f172a"]} position={[0, -15, 0]} rotation={[0, 0, 0]} />
            <gridHelper ref={gridRef2} args={[200, 30, "#0891b2", "#0f172a"]} position={[0, 15, 0]} rotation={[0, 0, 0]} />
        </group>
    );
}


export function TechBackground() {
    return (
        <div className="fixed inset-0 -z-50 w-full h-full bg-[#050505] pointer-events-none">
            {/* Using framer-motion scroll means we don't need ScrollControls from drei, it tracks window natively */}
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: true, alpha: false }}>
                <TechEnvironment />
            </Canvas>

            {/* HTML Overlay Gradient for blending edge of canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] opacity-50 pointer-events-none" />
        </div>
    );
}
