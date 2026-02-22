"use client";

import { useScroll } from "framer-motion";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, Center, Trail, Sphere } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export function CrestLogo3D({ isBooted }: { isBooted: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    // Phase References
    const hudLinesRef = useRef<THREE.Group>(null);
    const floatPanelsRef = useRef<THREE.Group>(null);
    const splitRing1Ref = useRef<THREE.Mesh>(null);
    const splitRing2Ref = useRef<THREE.Mesh>(null);
    const shockwaveRef = useRef<THREE.Mesh>(null);

    const { camera, pointer } = useThree();
    const { scrollYProgress } = useScroll();

    // Store initial camera position to animate smoothly
    const initialCamPos = useRef(new THREE.Vector3(0, 5, 15));

    const texture = useTexture("/crestlogo.png");

    useEffect(() => {
        if (isBooted && groupRef.current) {
            // Initial boot sequence positioning
            gsap.fromTo(camera.position,
                { z: 15, y: 2 },
                { z: 8, y: 0, duration: 4, ease: "power3.out" }
            );

            // Animate group dropping from above viewport
            groupRef.current.position.y = 5;
            gsap.to(groupRef.current.position, {
                y: 0,
                duration: 2,
                ease: "expo.out",
                delay: 0.2
            });

            gsap.fromTo(groupRef.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 2.5, ease: "elastic.out(1, 0.5)", delay: 0.5 }
            );
            gsap.fromTo(groupRef.current.rotation,
                { y: -Math.PI * 2, x: Math.PI / 4 },
                { y: 0, x: 0, duration: 3, ease: "power3.out", delay: 0.2 }
            );
        }
    }, [isBooted, camera]);

    useFrame((state, delta) => {
        if (!groupRef.current || !isBooted) return;

        const scroll = scrollYProgress.get();

        // Phase 1 (0-0.2): Ring Spin Accelerates
        let ringSpeed = 1.5;
        if (scroll > 0 && scroll < 0.2) {
            ringSpeed += scroll * 20;
        }

        // Phase 2 (0.2-0.4): Logo Tilts Back & HUD Lines Appear
        let tiltRotX = 0;
        if (scroll > 0.2) {
            const p2Progress = Math.min((scroll - 0.2) * 5, 1);
            tiltRotX = THREE.MathUtils.lerp(0, -Math.PI / 8, p2Progress);

            if (hudLinesRef.current) {
                hudLinesRef.current.rotation.z += delta * 0.5;
                hudLinesRef.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 1.2, p2Progress));
                ((hudLinesRef.current.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = p2Progress * 0.5;
            }
        } else if (hudLinesRef.current) {
            ((hudLinesRef.current.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0;
        }

        // Apply mouse Parallax combined with scroll tilt
        const targetRotX = (pointer.y * 0.3) + tiltRotX;
        const targetRotY = (pointer.x * 0.3) + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

        // Render Ring animations
        if (ringRef.current) {
            ringRef.current.rotation.z -= delta * ringSpeed;
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;

            // Phase 5 (0.8-1.0): Intense Glow
            if (scroll > 0.8) {
                const p5Progress = Math.min((scroll - 0.8) * 5, 1);
                (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 + (p5Progress * 0.2);
            }
        }

        // Phase 3 (0.4-0.6): Floating UI Panels & Energy Pulse
        if (floatPanelsRef.current) {
            if (scroll > 0.4) {
                const p3Progress = Math.min((scroll - 0.4) * 5, 1);
                floatPanelsRef.current.scale.setScalar(THREE.MathUtils.lerp(0, 1, p3Progress));
                floatPanelsRef.current.rotation.y += delta * 0.2;
                floatPanelsRef.current.children.forEach((panel: any, i) => {
                    (panel.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0, 0.4, p3Progress) * (Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 0.5);
                });
            } else {
                floatPanelsRef.current.scale.setScalar(0);
            }
        }

        // Phase 5 (0.8-1.0): Splitting rings & shockwave ripple
        if (splitRing1Ref.current && splitRing2Ref.current && shockwaveRef.current) {
            if (scroll > 0.8) {
                const p5Progress = Math.min((scroll - 0.8) * 5, 1);

                splitRing1Ref.current.position.z = THREE.MathUtils.lerp(0, 0.5, p5Progress);
                splitRing2Ref.current.position.z = THREE.MathUtils.lerp(0, -0.5, p5Progress);

                (splitRing1Ref.current.material as THREE.MeshBasicMaterial).opacity = p5Progress * 0.5;
                (splitRing2Ref.current.material as THREE.MeshBasicMaterial).opacity = p5Progress * 0.5;

                // Shockwave expands continuously at the bottom of the page
                shockwaveRef.current.scale.setScalar(2 + (state.clock.elapsedTime % 2) * 2);
                (shockwaveRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - (state.clock.elapsedTime % 2) / 2) * p5Progress * 0.5;
            } else {
                (splitRing1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
                (splitRing2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
                (shockwaveRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
            }
        }

        // Enforce Camera Target onto the Core Group specifically
        camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={groupRef} scale={0} position={[0, 6, 0]}>
            <Center>

                {/* Phase 5: Shockwave Ripple Behind Everything */}
                <mesh ref={shockwaveRef} position={[0, 0, -0.5]}>
                    <ringGeometry args={[3.2, 3.4, 64]} />
                    <meshBasicMaterial color="#d946ef" transparent opacity={0} blending={THREE.AdditiveBlending} />
                </mesh>

                {/* Glassmorphic Shield Backdrop / Aura */}
                <mesh position={[0, 0, -0.2]}>
                    <circleGeometry args={[2.8, 64]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        roughness={0.1}
                        transmission={0.9}
                        thickness={1.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>

                {/* Gradient Tech Ring */}
                <mesh ref={ringRef} position={[0, 0, -0.1]}>
                    <torusGeometry args={[3, 0.08, 16, 100]} />
                    <meshBasicMaterial
                        transparent
                        opacity={0.8}
                    >
                        <canvasTexture attach="map" image={createGradientCanvas()} />
                    </meshBasicMaterial>
                </mesh>

                {/* Phase 5: Splitting Rings */}
                <mesh ref={splitRing1Ref} position={[0, 0, 0]}>
                    <torusGeometry args={[3.1, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#00f0ff" transparent opacity={0} blending={THREE.AdditiveBlending} />
                </mesh>
                <mesh ref={splitRing2Ref} position={[0, 0, 0]}>
                    <torusGeometry args={[2.9, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#d946ef" transparent opacity={0} blending={THREE.AdditiveBlending} />
                </mesh>

                {/* Phase 2: Outer HUD Rings / Lines */}
                <group ref={hudLinesRef}>
                    <mesh position={[0, 0, 0]}>
                        <ringGeometry args={[3.3, 3.32, 64, 1, 0, Math.PI * 1.8]} />
                        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0} />
                    </mesh>
                </group>

                {/* Phase 3: Floating UI Panels */}
                <group ref={floatPanelsRef} scale={0}>
                    <mesh position={[-4, 2, 0.5]} rotation={[0, Math.PI / 6, 0]}>
                        <planeGeometry args={[1.5, 1]} />
                        <meshBasicMaterial color="#00f0ff" transparent opacity={0} wireframe />
                    </mesh>
                    <mesh position={[4, -1.5, 0.5]} rotation={[0, -Math.PI / 6, 0]}>
                        <planeGeometry args={[2, 0.8]} />
                        <meshBasicMaterial color="#d946ef" transparent opacity={0} wireframe />
                    </mesh>
                </group>

                {/* The Floating Crest Image exactly at [0, 0, 0.5] */}
                <mesh ref={meshRef} position={[0, 0, 0.5]}>
                    <planeGeometry args={[3.8, 3.8]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent={true}
                        alphaTest={0.01}
                        depthWrite={false}
                        toneMapped={false}
                        side={THREE.DoubleSide}
                        color="#ffffff"
                    />
                </mesh>

                {/* Inner Shield Glow */}
                <Sphere args={[2, 32, 32]} position={[0, 0, -0.4]}>
                    <meshBasicMaterial
                        color="#00f0ff"
                        transparent
                        opacity={0.1}
                        blending={THREE.AdditiveBlending}
                    />
                </Sphere>

            </Center>
        </group>
    );
}

// Helper to generate the Cyan -> Magenta -> Blue sweeping texture for the Torus
function createGradientCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (context) {
        const gradient = context.createLinearGradient(0, 0, 256, 0);
        gradient.addColorStop(0, "#00f0ff"); // Cyan
        gradient.addColorStop(0.5, "#d946ef"); // Magenta
        gradient.addColorStop(1, "#2563eb"); // Blue
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);
    }
    return canvas;
}
