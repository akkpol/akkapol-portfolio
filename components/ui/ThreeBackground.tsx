"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * ThreeBackground: Subtle floating particles background (global)
 * Used in layout.tsx via SiteBackground.tsx
 * Lighter version - just ambient particles without neural network connections
 */
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Subtle ambient particles
    const PARTICLE_COUNT = 60;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);

    const palette = [
      new THREE.Color(0x4285f4),
      new THREE.Color(0xa142f4),
      new THREE.Color(0xea4335),
      new THREE.Color(0x34a853),
      new THREE.Color(0xfbbc05),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const pos = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] = basePositions[i * 3] + Math.sin(elapsed * 0.2 + i * 0.5) * 0.3;
        pos[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(elapsed * 0.15 + i * 0.7) * 0.2;
      }
      posAttr.needsUpdate = true;

      // Very slow rotation
      points.rotation.y += 0.0002;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
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
