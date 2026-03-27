"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

// ─── Vertex Shader: Antigravity Particles ─────────────────────────
const particleVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDist;
  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDist = -mvPosition.z;

    // Breathing + bobbing size
    float breathe = 1.0 + sin(uTime * 0.8 + aPhase * 6.28) * 0.2;

    gl_PointSize = aSize * uPixelRatio * breathe * (250.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// ─── Fragment Shader: Soft Glow Particles ─────────────────────────
const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDist;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Multi-layer glow: core + inner glow + outer glow
    float core = smoothstep(0.15, 0.0, dist);
    float innerGlow = smoothstep(0.4, 0.05, dist) * 0.6;
    float outerGlow = exp(-dist * 6.0) * 0.3;

    float alpha = (core + innerGlow + outerGlow) * vAlpha;

    // Slight color shift toward white at core
    vec3 color = mix(vColor, vec3(1.0), core * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Line Shaders ─────────────────────────────────────────────────
const lineVertexShader = `
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

// ─── Aura Background Shader ──────────────────────────────────────
const auraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auraFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simplex-like noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 center = vec2(0.5 + uMouse.x * 0.05, 0.5 + uMouse.y * 0.05);
    float dist = length(vUv - center);

    // Flowing organic aura
    float flow1 = fbm(vUv * 3.0 + uTime * 0.08);
    float flow2 = fbm(vUv * 2.0 - uTime * 0.06 + 10.0);

    // Pulsating radial glow
    float pulse = sin(uTime * 0.5) * 0.1 + 0.9;
    float glow = smoothstep(0.6, 0.0, dist) * pulse;

    // Color blending with organic flow
    vec3 color = mix(uColor1, uColor2, flow1);
    color = mix(color, uColor3, flow2 * 0.4);

    // Outer ring shimmer
    float ring = smoothstep(0.35, 0.25, dist) * smoothstep(0.15, 0.25, dist);
    float shimmer = sin(uTime * 2.0 + dist * 20.0) * 0.5 + 0.5;
    color += vec3(0.1) * ring * shimmer;

    float alpha = glow * 0.35 + ring * shimmer * 0.05;
    alpha *= smoothstep(0.65, 0.1, dist);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Particle Data Interface ─────────────────────────────────────
interface Particle {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;       // unique phase offset for animation
  floatSpeed: number;  // individual float speed
  floatAmplitude: number;
  rotateRadius: number;
  rotateSpeed: number;
  mass: number;        // for mouse repulsion physics
}

export default function ThreeFaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animationRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initScene = useCallback(() => {
    if (!canvasRef.current) return;

    // Cleanup previous scene
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const isDark = resolvedTheme === "dark";
    const canvas = canvasRef.current;

    // ─── Scene Setup ────────────────────────────────────────────
    const scene = new THREE.Scene();
    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 18;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ─── Color Palette ──────────────────────────────────────────
    const colors = isDark
      ? {
          primary: new THREE.Color(0x00f0ff),
          secondary: new THREE.Color(0x7c3aed),
          tertiary: new THREE.Color(0xff0099),
          accent: new THREE.Color(0x38bdf8),
          dim: new THREE.Color(0x334155),
        }
      : {
          primary: new THREE.Color(0x3b82f6),
          secondary: new THREE.Color(0x8b5cf6),
          tertiary: new THREE.Color(0xec4899),
          accent: new THREE.Color(0x06b6d4),
          dim: new THREE.Color(0x94a3b8),
        };

    // ─── Generate Particles (Antigravity Style) ─────────────────
    const NODE_COUNT = 150;
    const CONNECTION_DISTANCE = 3.2;

    const particles: Particle[] = [];
    const colorPalette = [colors.primary, colors.secondary, colors.tertiary, colors.accent, colors.dim];

    for (let i = 0; i < NODE_COUNT; i++) {
      // Spread particles across the viewport area
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 8 - 2;

      const pos = new THREE.Vector3(x, y, z);

      particles.push({
        position: pos.clone(),
        basePosition: pos.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        phase: Math.random(),
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmplitude: 0.3 + Math.random() * 0.8,
        rotateRadius: 0.2 + Math.random() * 0.5,
        rotateSpeed: 0.2 + Math.random() * 0.4,
        mass: 0.5 + Math.random() * 1.5,
      });
    }

    // ─── Particle Geometry ──────────────────────────────────────
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(NODE_COUNT * 3);
    const particleColors = new Float32Array(NODE_COUNT * 3);
    const particleSizes = new Float32Array(NODE_COUNT);
    const particleAlphas = new Float32Array(NODE_COUNT);
    const particlePhases = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = particles[i].position.x;
      positions[i * 3 + 1] = particles[i].position.y;
      positions[i * 3 + 2] = particles[i].position.z;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;

      // Varied sizes: some large "hub" nodes, mostly small
      const isHub = Math.random() < 0.15;
      particleSizes[i] = isHub ? 0.2 + Math.random() * 0.15 : 0.06 + Math.random() * 0.1;
      particleAlphas[i] = isDark ? (isHub ? 0.9 : 0.4 + Math.random() * 0.4) : (isHub ? 0.7 : 0.3 + Math.random() * 0.3);
      particlePhases[i] = particles[i].phase;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("aColor", new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute("aSize", new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(particleAlphas, 1));
    particleGeometry.setAttribute("aPhase", new THREE.BufferAttribute(particlePhases, 1));

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

    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);

    // ─── Connection Lines ───────────────────────────────────────
    const MAX_CONNECTIONS = 600;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineAlphas = new Float32Array(MAX_CONNECTIONS * 2);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(lineAlphas, 1));
    lineGeometry.setAttribute("aColor", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ─── Aura Glow Plane ────────────────────────────────────────
    const auraGeometry = new THREE.PlaneGeometry(28, 22);
    const auraMaterial = new THREE.ShaderMaterial({
      vertexShader: auraVertexShader,
      fragmentShader: auraFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: colors.primary },
        uColor2: { value: colors.secondary },
        uColor3: { value: colors.tertiary },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const auraMesh = new THREE.Mesh(auraGeometry, auraMaterial);
    auraMesh.position.z = -6;
    scene.add(auraMesh);

    // ─── Mouse State ────────────────────────────────────────────
    const mouse = { x: 0, y: 0, worldX: 0, worldY: 0 };
    const mouseSmooth = { x: 0, y: 0 };

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / sizes.width) * 2 - 1;
      mouse.y = -(e.clientY / sizes.height) * 2 + 1;

      // Project mouse to world coordinates on z=0 plane
      mouseNDC.set(mouse.x, mouse.y);
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(mousePlane, mouseWorld);
      mouse.worldX = mouseWorld.x;
      mouse.worldY = mouseWorld.y;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / sizes.width) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / sizes.height) * 2 + 1;
        mouseNDC.set(mouse.x, mouse.y);
        raycaster.setFromCamera(mouseNDC, camera);
        raycaster.ray.intersectPlane(mousePlane, mouseWorld);
        mouse.worldX = mouseWorld.x;
        mouse.worldY = mouseWorld.y;
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
      particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener("resize", onResize);

    // ─── Animation Loop ─────────────────────────────────────────
    const clock = new THREE.Clock();
    const MOUSE_REPEL_RADIUS = 4.0;
    const MOUSE_REPEL_FORCE = 2.5;
    const DAMPING = 0.92;
    const SPRING_BACK = 0.008;

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);

      // Smooth mouse
      mouseSmooth.x += (mouse.x - mouseSmooth.x) * 0.05;
      mouseSmooth.y += (mouse.y - mouseSmooth.y) * 0.05;

      // Update uniforms
      particleMaterial.uniforms.uTime.value = elapsed;
      auraMaterial.uniforms.uTime.value = elapsed;
      auraMaterial.uniforms.uMouse.value.set(mouseSmooth.x, mouseSmooth.y);

      // ── Update particles with antigravity physics ──
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const pos = posAttr.array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const p = particles[i];

        // 1. Antigravity floating (gentle upward drift + sinusoidal bobbing)
        const floatY = Math.sin(elapsed * p.floatSpeed + p.phase * Math.PI * 2) * p.floatAmplitude;
        const floatX = Math.cos(elapsed * p.floatSpeed * 0.7 + p.phase * Math.PI * 2) * p.floatAmplitude * 0.5;
        const floatZ = Math.sin(elapsed * p.floatSpeed * 0.3 + p.phase * Math.PI * 4) * 0.3;

        // 2. Gentle orbital motion (each particle orbits its base position)
        const orbitX = Math.cos(elapsed * p.rotateSpeed + p.phase * Math.PI * 2) * p.rotateRadius;
        const orbitY = Math.sin(elapsed * p.rotateSpeed * 1.3 + p.phase * Math.PI * 2) * p.rotateRadius;

        // Target position = base + float + orbit
        const targetX = p.basePosition.x + floatX + orbitX;
        const targetY = p.basePosition.y + floatY + orbitY;
        const targetZ = p.basePosition.z + floatZ;

        // 3. Mouse repulsion (physics-based)
        const dx = p.position.x - mouse.worldX;
        const dy = p.position.y - mouse.worldY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < MOUSE_REPEL_RADIUS && distToMouse > 0.01) {
          const force = (1.0 - distToMouse / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_FORCE / p.mass;
          const nx = dx / distToMouse;
          const ny = dy / distToMouse;
          p.velocity.x += nx * force * 0.016;
          p.velocity.y += ny * force * 0.016;
        }

        // 4. Spring back to target position
        p.velocity.x += (targetX - p.position.x) * SPRING_BACK;
        p.velocity.y += (targetY - p.position.y) * SPRING_BACK;
        p.velocity.z += (targetZ - p.position.z) * SPRING_BACK;

        // 5. Damping
        p.velocity.x *= DAMPING;
        p.velocity.y *= DAMPING;
        p.velocity.z *= DAMPING;

        // 6. Update position
        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;
        p.position.z += p.velocity.z;

        pos[i * 3] = p.position.x;
        pos[i * 3 + 1] = p.position.y;
        pos[i * 3 + 2] = p.position.z;
      }
      posAttr.needsUpdate = true;

      // ── Update connection lines ──
      const lPos = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lAlp = lineGeometry.attributes.aAlpha as THREE.BufferAttribute;
      const lCol = lineGeometry.attributes.aColor as THREE.BufferAttribute;
      const lPosArr = lPos.array as Float32Array;
      const lAlpArr = lAlp.array as Float32Array;
      const lColArr = lCol.array as Float32Array;

      let connectionIndex = 0;
      const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

      for (let i = 0; i < NODE_COUNT && connectionIndex < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < NODE_COUNT && connectionIndex < MAX_CONNECTIONS; j++) {
          const dx = particles[i].position.x - particles[j].position.x;
          const dy = particles[i].position.y - particles[j].position.y;
          const dz = particles[i].position.z - particles[j].position.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1.0 - dist / CONNECTION_DISTANCE);

            // Flowing pulse along the line
            const pulse = Math.sin(elapsed * 1.5 + (i + j) * 0.05) * 0.3 + 0.7;
            const finalAlpha = alpha * pulse * (isDark ? 0.2 : 0.12);

            const idx6 = connectionIndex * 6;
            const idx2 = connectionIndex * 2;

            lPosArr[idx6] = particles[i].position.x;
            lPosArr[idx6 + 1] = particles[i].position.y;
            lPosArr[idx6 + 2] = particles[i].position.z;
            lPosArr[idx6 + 3] = particles[j].position.x;
            lPosArr[idx6 + 4] = particles[j].position.y;
            lPosArr[idx6 + 5] = particles[j].position.z;

            // Gradient color
            const mixT = alpha;
            const c = colors.primary.clone().lerp(colors.secondary, mixT);
            lColArr[idx6] = c.r;
            lColArr[idx6 + 1] = c.g;
            lColArr[idx6 + 2] = c.b;
            lColArr[idx6 + 3] = c.r;
            lColArr[idx6 + 4] = c.g;
            lColArr[idx6 + 5] = c.b;

            lAlpArr[idx2] = finalAlpha;
            lAlpArr[idx2 + 1] = finalAlpha * 0.5;

            connectionIndex++;
          }
        }
      }

      // Clear unused
      lPosArr.fill(0, connectionIndex * 6, MAX_CONNECTIONS * 6);
      lAlpArr.fill(0, connectionIndex * 2, MAX_CONNECTIONS * 2);

      lPos.needsUpdate = true;
      lAlp.needsUpdate = true;
      lCol.needsUpdate = true;
      lineGeometry.setDrawRange(0, connectionIndex * 2);

      // ── Render ──
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    // ─── Cleanup ────────────────────────────────────────────────
    const cleanup = () => {
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

    cleanupRef.current = cleanup;
    return cleanup;
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
      className="fixed inset-0 w-full h-full -z-10 outline-none select-none"
      style={{ opacity: 1, pointerEvents: "auto" }}
    />
  );
}
