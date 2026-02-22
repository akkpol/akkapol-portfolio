"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function ThreeFaceCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (!canvasRef.current) return;

        const isDark = resolvedTheme === "dark";
        const canvas = canvasRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        // Transparent background so CSS background shows, or explicit color
        scene.background = null;

        const sizes = { width: window.innerWidth, height: window.innerHeight };
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 18;
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Color palettes based on theme
        const palette = isDark
            ? [
                new THREE.Color(0x00F0FF), // Neon Blue
                new THREE.Color(0x7000FF), // Neon Purple
                new THREE.Color(0xFF0099), // Neon Pink
                new THREE.Color(0xFFFFFF), // White
                new THREE.Color(0x38BDF8)  // Light Blue
            ]
            : [
                new THREE.Color(0x4285F4), // Blue
                new THREE.Color(0xEA4335), // Red
                new THREE.Color(0xFBBC05), // Yellow
                new THREE.Color(0x34A853), // Green
                new THREE.Color(0xA142F4)  // Purple
            ];

        // Procedural Face Algorithm
        const positions: number[] = [];
        const colors: number[] = [];
        const scale = 0.08;

        for (let y = -90; y < 90; y += 1.2) {
            for (let x = -70; x < 70; x += 1.2) {
                let rx = 55;
                let ry = 75;

                // Tapering the chin
                if (y > 10) rx -= (y - 10) * 0.35;

                let nx = x / rx;
                let ny = y / ry;
                let d = nx * nx + ny * ny;

                if (d < 1) {
                    let z = Math.sqrt(1 - d) * 45;

                    // Eye sockets
                    let eyeL = Math.sqrt(Math.pow(x + 22, 2) + Math.pow(y + 10, 2));
                    let eyeR = Math.sqrt(Math.pow(x - 22, 2) + Math.pow(y + 10, 2));
                    if (eyeL < 18) z -= (18 - eyeL) * 0.7;
                    if (eyeR < 18) z -= (18 - eyeR) * 0.7;

                    // Nose
                    if (y > -15 && y < 35 && Math.abs(x) < 14) {
                        z += (14 - Math.abs(x)) * 0.8;
                    }
                    let noseTip = Math.sqrt(Math.pow(x, 2) + Math.pow(y - 30, 2));
                    if (noseTip < 15) z += (15 - noseTip) * 1.0;

                    // Cheekbones
                    let cheekL = Math.sqrt(Math.pow(x + 32, 2) + Math.pow(y - 20, 2));
                    let cheekR = Math.sqrt(Math.pow(x - 32, 2) + Math.pow(y - 20, 2));
                    if (cheekL < 25) z += (25 - cheekL) * 0.3;
                    if (cheekR < 25) z += (25 - cheekR) * 0.3;

                    // Mouth
                    let mouth = Math.sqrt(Math.pow(x, 2) + Math.pow(y - 55, 2));
                    if (mouth < 20) {
                        z += (20 - mouth) * 0.3;
                        if (Math.abs(y - 55) < 3) z -= 3;
                    }

                    // Hair volume
                    if (y < -40) {
                        z += (-40 - y) * 0.5;
                        if (x > -30 && x < 40) z += 6;
                    }

                    // Randomize particles for Point Cloud aesthetic
                    if (Math.random() > 0.15) {
                        const noiseX = (Math.random() - 0.5) * 0.5;
                        const noiseY = (Math.random() - 0.5) * 0.5;
                        const noiseZ = (Math.random() - 0.5) * 0.5;

                        positions.push(x * scale + noiseX, -y * scale + noiseY, z * scale + noiseZ);

                        const c = palette[Math.floor(Math.random() * palette.length)];
                        colors.push(c.r, c.g, c.b);
                    }
                }
            }
        }

        const particleCount = positions.length / 3;
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        const basePositions = new Float32Array(positions);
        const velocities = new Float32Array(particleCount * 3).fill(0);

        const material = new THREE.PointsMaterial({
            size: 0.06,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            sizeAttenuation: true,
        });

        const facePointCloud = new THREE.Points(geometry, material);
        facePointCloud.position.y = 1.5;
        scene.add(facePointCloud);

        // Mouse Interaction (Anti-Gravity Swirl)
        const mouse = new THREE.Vector2(-999, -999);
        const targetPoint = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        const updateMouse = (clientX: number, clientY: number) => {
            mouse.x = (clientX / sizes.width) * 2 - 1;
            mouse.y = -(clientY / sizes.height) * 2 + 1;
        };

        const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);

        const onResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        };

        window.addEventListener("resize", onResize);

        // Animation loop
        let animationFrameId: number;

        const tick = () => {
            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(plane, targetPoint);

            const posAttr = geometry.attributes.position;
            const pos = posAttr.array as Float32Array;

            const interactionRadiusSq = 4.0 * 4.0;
            const repulsionStrength = 0.08;
            const swirlStrength = 0.12;
            const returnForce = 0.03;
            const friction = 0.88;

            for (let i = 0; i < particleCount * 3; i += 3) {
                let cx = pos[i], cy = pos[i + 1], cz = pos[i + 2];
                let bx = basePositions[i], by = basePositions[i + 1], bz = basePositions[i + 2];

                let dx = cx - (targetPoint.x - facePointCloud.position.x);
                let dy = cy - (targetPoint.y - facePointCloud.position.y);
                let dz = cz - targetPoint.z;
                let distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < interactionRadiusSq) {
                    let dist = Math.sqrt(distSq);
                    let force = (Math.sqrt(interactionRadiusSq) - dist) / Math.sqrt(interactionRadiusSq);

                    velocities[i] += (dx / dist) * force * repulsionStrength;
                    velocities[i + 1] += (dy / dist) * force * repulsionStrength;
                    velocities[i + 2] += (dz / dist) * force * repulsionStrength;

                    velocities[i] += -(dy / dist) * force * swirlStrength;
                    velocities[i + 1] += (dx / dist) * force * swirlStrength;
                }

                velocities[i] += (bx - cx) * returnForce;
                velocities[i + 1] += (by - cy) * returnForce;
                velocities[i + 2] += (bz - cz) * returnForce;

                velocities[i] *= friction;
                velocities[i + 1] *= friction;
                velocities[i + 2] *= friction;

                pos[i] += velocities[i];
                pos[i + 1] += velocities[i + 1];
                pos[i + 2] += velocities[i + 2];
            }

            posAttr.needsUpdate = true;

            // Parallax rotation
            facePointCloud.rotation.y += (mouse.x * 0.4 - facePointCloud.rotation.y) * 0.05;
            facePointCloud.rotation.x += (-mouse.y * 0.2 - facePointCloud.rotation.x) * 0.05;

            renderer.render(scene, camera);
            animationFrameId = window.requestAnimationFrame(tick);
        };

        tick();

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("resize", onResize);
            window.cancelAnimationFrame(animationFrameId);

            geometry.dispose();
            material.dispose();
            renderer.dispose();

            // Critical for theme switching: remove the canvas children to prevent multiple instances
            if (canvasRef.current) {
                // Not actually removing elements here since we use a single `<canvas>` 
                // but ThreeJS engine cleans up memory above.
            }
        };
    }, [resolvedTheme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 outline-none select-none pointer-events-none transition-opacity duration-1000"
            style={{ opacity: 1 }}
        />
    );
}
