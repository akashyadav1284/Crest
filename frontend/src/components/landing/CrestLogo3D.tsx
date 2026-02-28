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

    const { camera, pointer } = useThree();
    const { scrollYProgress } = useScroll();
    const texture = useTexture("/c-logo.png");

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

        // Phase 2 (0.2-0.4): Logo Tilts Back
        let tiltRotX = 0;
        if (scroll > 0.2) {
            const p2Progress = Math.min((scroll - 0.2) * 5, 1);
            tiltRotX = THREE.MathUtils.lerp(0, -Math.PI / 8, p2Progress);
        }

        // Apply mouse Parallax combined with scroll tilt
        const targetRotX = (pointer.y * 0.3) + tiltRotX;
        const targetRotY = (pointer.x * 0.3) + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

        // Enforce Camera Target onto the Core Group specifically
        camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={groupRef} scale={0} position={[0, 6, 0]}>
            <Center>
                {/* The Floating Crest Image */}
                <mesh ref={meshRef} position={[0, 0, 0]}>
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
            </Center>
        </group>
    );
}
