"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // ==========================================================
        // MATHEMATICAL POINT CLOUD FACE & ANTI-GRAVITY
        // ==========================================================
        const w = window.innerWidth;
        const h = window.innerHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // พื้นหลังขาวล้วน

        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.z = 18;
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Google Palette Colors สำหรับเม็ดอนุภาค
        const palette = [
            new THREE.Color(0x4285f4), // Blue
            new THREE.Color(0xea4335), // Red
            new THREE.Color(0xfbbc05), // Yellow
            new THREE.Color(0x34a853), // Green
            new THREE.Color(0xa142f4), // Purple
        ];

        // --- อัลกอริทึมสร้างใบหน้า 3 มิติจากสมการคณิตศาสตร์ (Procedural Face) ---
        const positions: number[] = [];
        const colors: number[] = [];
        const scale = 0.08;

        // วนลูปสแกนแกน x, y เพื่อสร้างความนูน (Depth) ตามโครงหน้ามนุษย์
        for (let y = -90; y < 90; y += 1.2) {
            for (let x = -70; x < 70; x += 1.2) {
                let rx = 55; // รัศมีศีรษะแกน X
                let ry = 75; // รัศมีศีรษะแกน Y

                // ทำคางให้เรียวลง
                if (y > 10) rx -= (y - 10) * 0.35;

                let nx = x / rx;
                let ny = y / ry;
                let d = nx * nx + ny * ny;

                if (d < 1) {
                    // ถ้าอยู่ในวงรีศีรษะ
                    let z = Math.sqrt(1 - d) * 45; // ความนูนพื้นฐาน

                    // เบ้าตา (บุ๋มลง)
                    let eyeL = Math.sqrt(Math.pow(x + 22, 2) + Math.pow(y + 10, 2));
                    let eyeR = Math.sqrt(Math.pow(x - 22, 2) + Math.pow(y + 10, 2));
                    if (eyeL < 18) z -= (18 - eyeL) * 0.7;
                    if (eyeR < 18) z -= (18 - eyeR) * 0.7;

                    // สันจมูกและปลายจมูก (นูนขึ้น)
                    if (y > -15 && y < 35 && Math.abs(x) < 14) {
                        z += (14 - Math.abs(x)) * 0.8;
                    }
                    let noseTip = Math.sqrt(Math.pow(x, 2) + Math.pow(y - 30, 2));
                    if (noseTip < 15) z += (15 - noseTip) * 1.0;

                    // โหนกแก้ม
                    let cheekL = Math.sqrt(Math.pow(x + 32, 2) + Math.pow(y - 20, 2));
                    let cheekR = Math.sqrt(Math.pow(x - 32, 2) + Math.pow(y - 20, 2));
                    if (cheekL < 25) z += (25 - cheekL) * 0.3;
                    if (cheekR < 25) z += (25 - cheekR) * 0.3;

                    // ปาก
                    let mouth = Math.sqrt(Math.pow(x, 2) + Math.pow(y - 55, 2));
                    if (mouth < 20) {
                        z += (20 - mouth) * 0.3;
                        if (Math.abs(y - 55) < 3) z -= 3; // ร่องปาก
                    }

                    // ทรงผมด้านบน (เพิ่มความหนาให้ดูเท่)
                    if (y < -40) {
                        z += (-40 - y) * 0.5;
                        if (x > -30 && x < 40) z += 6;
                    }

                    // สุ่มลบอนุภาคบางส่วนทิ้งเพื่อให้ดูเป็น Point Cloud สวยๆ
                    if (Math.random() > 0.15) {
                        // เพิ่ม Noise เล็กน้อยให้ดูเป็นธรรมชาติ
                        const noiseX = (Math.random() - 0.5) * 0.5;
                        const noiseY = (Math.random() - 0.5) * 0.5;
                        const noiseZ = (Math.random() - 0.5) * 0.5;

                        positions.push(
                            x * scale + noiseX,
                            -y * scale + noiseY,
                            z * scale + noiseZ
                        );

                        // สุ่มสี Google
                        const c = palette[Math.floor(Math.random() * palette.length)];
                        colors.push(c.r, c.g, c.b);
                    }
                }
            }
        }

        const particleCount = positions.length / 3;
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3)
        );
        geometry.setAttribute(
            "color",
            new THREE.Float32BufferAttribute(colors, 3)
        );

        // อาร์เรย์สำหรับคำนวณฟิสิกส์
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
        // ขยับใบหน้าขึ้นมาตรงกลางนิดนึง
        facePointCloud.position.y = 1.5;
        scene.add(facePointCloud);

        // --- ระบบเมาส์โต้ตอบ (Anti-Gravity Swirl) ---
        const mouse = new THREE.Vector2(-999, -999);
        const targetPoint = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();
        // สร้างระนาบจำลองตรงตำแหน่งของใบหน้าเพื่อหาจุดตัดของเมาส์
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        const updateMouse = (clientX: number, clientY: number) => {
            mouse.x = (clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(clientY / window.innerHeight) * 2 + 1;
        };

        const handleMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) =>
            updateMouse(e.touches[0].clientX, e.touches[0].clientY);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        let animationFrameId: number;

        // Animation Loop
        const tick = () => {
            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(plane, targetPoint);

            const posAttr = geometry.attributes.position as THREE.BufferAttribute;
            const pos = posAttr.array as Float32Array;

            // ค่าคงที่สำหรับฟิสิกส์
            const interactionRadiusSq = 4.0 * 4.0;
            const repulsionStrength = 0.08;
            const swirlStrength = 0.12;
            const returnForce = 0.03;
            const friction = 0.88; // แรงหนืด ทำให้สมูท

            for (let i = 0; i < particleCount * 3; i += 3) {
                let cx = pos[i],
                    cy = pos[i + 1],
                    cz = pos[i + 2];
                let bx = basePositions[i],
                    by = basePositions[i + 1],
                    bz = basePositions[i + 2];

                // คำนวณระยะห่างจากเมาส์
                let dx = cx - (targetPoint.x - facePointCloud.position.x);
                let dy = cy - (targetPoint.y - facePointCloud.position.y);
                let dz = cz - targetPoint.z;
                let distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < interactionRadiusSq) {
                    let dist = Math.sqrt(distSq);
                    let force =
                        (Math.sqrt(interactionRadiusSq) - dist) /
                        Math.sqrt(interactionRadiusSq);

                    // 1. แรงผลักออก (Repulsion)
                    velocities[i] += (dx / dist) * force * repulsionStrength;
                    velocities[i + 1] += (dy / dist) * force * repulsionStrength;
                    velocities[i + 2] += (dz / dist) * force * repulsionStrength;

                    // 2. แรงหมุนคว้าง (Swirl) - Cross Product
                    velocities[i] += -(dy / dist) * force * swirlStrength;
                    velocities[i + 1] += (dx / dist) * force * swirlStrength;
                }

                // ดึงกลับตำแหน่งเดิม
                velocities[i] += (bx - cx) * returnForce;
                velocities[i + 1] += (by - cy) * returnForce;
                velocities[i + 2] += (bz - cz) * returnForce;

                // ใส่แรงหนืด
                velocities[i] *= friction;
                velocities[i + 1] *= friction;
                velocities[i + 2] *= friction;

                // อัปเดตตำแหน่ง
                pos[i] += velocities[i];
                pos[i + 1] += velocities[i + 1];
                pos[i + 2] += velocities[i + 2];
            }

            posAttr.needsUpdate = true;

            // หมุนใบหน้าตามเมาส์เล็กน้อยแบบ Parallax
            facePointCloud.rotation.y +=
                (mouse.x * 0.4 - facePointCloud.rotation.y) * 0.05;
            facePointCloud.rotation.x +=
                (-mouse.y * 0.2 - facePointCloud.rotation.x) * 0.05;

            renderer.render(scene, camera);
            animationFrameId = window.requestAnimationFrame(tick);
        };
        tick();

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", handleResize);
            window.cancelAnimationFrame(animationFrameId);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 -z-10 bg-white" />;
}
