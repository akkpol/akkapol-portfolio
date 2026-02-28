"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

// ─── Shader: Aura Glow Post-Processing ───────────────────────────
const auraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auraFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 center = vec2(0.5, 0.55);
    float dist = length(vUv - center);

    // Pulsating aura rings
    float pulse1 = sin(uTime * 0.8 + dist * 12.0) * 0.5 + 0.5;
    float pulse2 = sin(uTime * 0.5 + dist * 8.0 + 1.5) * 0.5 + 0.5;
    float pulse3 = sin(uTime * 1.2 + dist * 15.0 + 3.0) * 0.5 + 0.5;

    // Radial gradient falloff
    float glow = smoothstep(0.5, 0.1, dist);
    float outerGlow = smoothstep(0.7, 0.2, dist) * 0.3;

    // Color mixing
    vec3 color = mix(uColor1, uColor2, pulse1 * 0.5 + vUv.x * 0.5);
    color = mix(color, uColor3, pulse2 * 0.3);

    // Noise for organic feel
    float n = noise(vUv * 5.0 + uTime * 0.1) * 0.15;

    float alpha = (glow * 0.25 + outerGlow) * (0.6 + pulse3 * 0.4) + n * glow * 0.1;
    alpha *= smoothstep(0.6, 0.15, dist);

    gl_FragColor = vec4(color, alpha * 0.45);
  }
`;

// ─── Shader: Custom Particle Material ─────────────────────────────
const particleVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Breathing size animation
    float breathe = 1.0 + sin(uTime * 1.5 + position.x * 2.0 + position.y * 3.0) * 0.3;

    gl_PointSize = aSize * uPixelRatio * breathe * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circle with glow
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float softEdge = 1.0 - smoothstep(0.0, 0.5, dist);
    float glow = exp(-dist * 4.0) * 0.5;

    gl_FragColor = vec4(vColor, (softEdge + glow) * vAlpha);
  }
`;

// ─── Shader: Connection Lines ─────────────────────────────────────
const lineVertexShader = `
  attribute vec3 aColor;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(vColor, vAlpha * 0.35);
  }
`;

export default function ThreeFaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animationRef = useRef<number>(0);

  const initScene = useCallback(() => {
    if (!canvasRef.current) return;

    const isDark = resolvedTheme === "dark";
    const canvas = canvasRef.current;

    // ─── Scene Setup ────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = null;

    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 14;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ─── Color Palette ──────────────────────────────────────────
    const colors = isDark
      ? {
          primary: new THREE.Color(0x00f0ff),    // Neon Cyan
          secondary: new THREE.Color(0x7000ff),  // Neon Purple
          tertiary: new THREE.Color(0xff0099),   // Neon Pink
          accent: new THREE.Color(0x38bdf8),     // Light Blue
          node: new THREE.Color(0xffffff),       // White nodes
        }
      : {
          primary: new THREE.Color(0x4285f4),    // Google Blue
          secondary: new THREE.Color(0xa142f4),  // Purple
          tertiary: new THREE.Color(0xea4335),   // Red
          accent: new THREE.Color(0x34a853),     // Green
          node: new THREE.Color(0x333333),       // Dark nodes
        };

    // ─── Neural Network Node Generation ─────────────────────────
    const NODE_COUNT = 120;
    const CONNECTION_DISTANCE = 3.5;
    const SPREAD_X = 8;
    const SPREAD_Y = 6;
    const SPREAD_Z = 4;

    // Create nodes in a brain-like ellipsoid shape
    const nodePositions: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];
    const nodeBasePositions: THREE.Vector3[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      // Use gaussian-like distribution for brain shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.4); // Concentrate more points toward center

      const x = r * Math.sin(phi) * Math.cos(theta) * SPREAD_X;
      const y = r * Math.sin(phi) * Math.sin(theta) * SPREAD_Y + 0.5; // Slight upward offset
      const z = r * Math.cos(phi) * SPREAD_Z;

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos.clone());
      nodeBasePositions.push(pos.clone());
      nodeVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001
      ));
    }

    // ─── Particle System (Nodes) ────────────────────────────────
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(NODE_COUNT * 3);
    const particleColors = new Float32Array(NODE_COUNT * 3);
    const particleSizes = new Float32Array(NODE_COUNT);
    const particleAlphas = new Float32Array(NODE_COUNT);

    const colorPalette = [colors.primary, colors.secondary, colors.tertiary, colors.accent];

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = nodePositions[i].x;
      positions[i * 3 + 1] = nodePositions[i].y;
      positions[i * 3 + 2] = nodePositions[i].z;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;

      particleSizes[i] = 0.08 + Math.random() * 0.15;
      particleAlphas[i] = 0.5 + Math.random() * 0.5;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("aColor", new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute("aSize", new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(particleAlphas, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ─── Connection Lines ───────────────────────────────────────
    const MAX_CONNECTIONS = NODE_COUNT * 6;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    const lineAlphas = new Float32Array(MAX_CONNECTIONS * 2);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("aColor", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(lineAlphas, 1));

    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ─── Aura Glow Background Plane ─────────────────────────────
    const auraGeometry = new THREE.PlaneGeometry(20, 20);
    const auraMaterial = new THREE.ShaderMaterial({
      vertexShader: auraVertexShader,
      fragmentShader: auraFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
        uColor1: { value: colors.primary },
        uColor2: { value: colors.secondary },
        uColor3: { value: colors.tertiary },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const auraMesh = new THREE.Mesh(auraGeometry, auraMaterial);
    auraMesh.position.z = -3;
    auraMesh.position.y = 0.5;
    scene.add(auraMesh);

    // ─── Mouse Interaction ──────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / sizes.width) * 2 - 1;
      mouse.y = -(e.clientY / sizes.height) * 2 + 1;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / sizes.width) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / sizes.height) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      auraMaterial.uniforms.uResolution.value.set(sizes.width, sizes.height);
      particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener("resize", onResize);

    // ─── Animation Loop ─────────────────────────────────────────
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsed = clock.getElapsedTime();

      // Update uniforms
      particleMaterial.uniforms.uTime.value = elapsed;
      auraMaterial.uniforms.uTime.value = elapsed;

      // ── Smooth rotation following mouse (subtle, no spinning) ──
      targetRotation.x = mouse.y * 0.15;
      targetRotation.y = mouse.x * 0.2;

      particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.02;
      particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.02;
      lines.rotation.x = particles.rotation.x;
      lines.rotation.y = particles.rotation.y;

      // Gentle autonomous rotation
      particles.rotation.y += 0.0008;
      lines.rotation.y += 0.0008;

      // ── Update node positions (floating animation) ──
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const pos = posAttr.array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const base = nodeBasePositions[i];
        const vel = nodeVelocities[i];

        // Floating motion
        const floatX = Math.sin(elapsed * 0.3 + i * 0.5) * 0.15;
        const floatY = Math.cos(elapsed * 0.4 + i * 0.7) * 0.1;
        const floatZ = Math.sin(elapsed * 0.2 + i * 0.3) * 0.08;

        nodePositions[i].x = base.x + floatX + vel.x * elapsed * 10;
        nodePositions[i].y = base.y + floatY + vel.y * elapsed * 10;
        nodePositions[i].z = base.z + floatZ + vel.z * elapsed * 10;

        // Soft boundary (keep within ellipsoid)
        const dist = nodePositions[i].length();
        if (dist > 8) {
          nodePositions[i].multiplyScalar(8 / dist);
        }

        pos[i * 3] = nodePositions[i].x;
        pos[i * 3 + 1] = nodePositions[i].y;
        pos[i * 3 + 2] = nodePositions[i].z;
      }
      posAttr.needsUpdate = true;

      // ── Update connections ──
      const lPos = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lCol = lineGeometry.attributes.aColor as THREE.BufferAttribute;
      const lAlp = lineGeometry.attributes.aAlpha as THREE.BufferAttribute;
      const lPosArr = lPos.array as Float32Array;
      const lColArr = lCol.array as Float32Array;
      const lAlpArr = lAlp.array as Float32Array;

      let connectionIndex = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (connectionIndex >= MAX_CONNECTIONS) break;

          const dx = nodePositions[i].x - nodePositions[j].x;
          const dy = nodePositions[i].y - nodePositions[j].y;
          const dz = nodePositions[i].z - nodePositions[j].z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / CONNECTION_DISTANCE;

            // Pulsating connection
            const pulse = Math.sin(elapsed * 2.0 + i * 0.1 + j * 0.05) * 0.3 + 0.7;

            const idx = connectionIndex * 6;
            lPosArr[idx] = nodePositions[i].x;
            lPosArr[idx + 1] = nodePositions[i].y;
            lPosArr[idx + 2] = nodePositions[i].z;
            lPosArr[idx + 3] = nodePositions[j].x;
            lPosArr[idx + 4] = nodePositions[j].y;
            lPosArr[idx + 5] = nodePositions[j].z;

            // Gradient color along connection
            const mixColor = colors.primary.clone().lerp(colors.secondary, alpha);
            lColArr[idx] = mixColor.r;
            lColArr[idx + 1] = mixColor.g;
            lColArr[idx + 2] = mixColor.b;
            lColArr[idx + 3] = mixColor.r;
            lColArr[idx + 4] = mixColor.g;
            lColArr[idx + 5] = mixColor.b;

            const alphaIdx = connectionIndex * 2;
            lAlpArr[alphaIdx] = alpha * pulse;
            lAlpArr[alphaIdx + 1] = alpha * pulse * 0.5;

            connectionIndex++;
          }
        }
        if (connectionIndex >= MAX_CONNECTIONS) break;
      }

      // Clear remaining connections
      for (let i = connectionIndex * 6; i < MAX_CONNECTIONS * 6; i++) {
        lPosArr[i] = 0;
      }
      for (let i = connectionIndex * 2; i < MAX_CONNECTIONS * 2; i++) {
        lAlpArr[i] = 0;
      }

      lPos.needsUpdate = true;
      lCol.needsUpdate = true;
      lAlp.needsUpdate = true;
      lineGeometry.setDrawRange(0, connectionIndex * 2);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    // ─── Cleanup ────────────────────────────────────────────────
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationRef.current);

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      auraGeometry.dispose();
      auraMaterial.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme]);

  useEffect(() => {
    const cleanup = initScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initScene]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 outline-none select-none pointer-events-none transition-opacity duration-1000"
      style={{ opacity: 1 }}
    />
  );
}
