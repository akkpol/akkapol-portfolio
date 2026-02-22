"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface LiquidImageProps {
    imageSrc: string;
    alt?: string;
    strength?: number;
    speed?: number;
    className?: string;
}

export default function LiquidImage({
    imageSrc,
    alt = "Liquid Image",
    strength = 0.15,
    speed = 0.18,
    className = "",
}: LiquidImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({ width: 400, height: 300 });
    const dprRef = useRef(1);
    const mouseRef = useRef({ x: -10, y: -10, active: false });
    const maskRadiusRef = useRef(0);
    const wakeRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
    const hoveredRef = useRef(false);

    // Resize observer
    useEffect(() => {
        if (!canvasRef.current) return;
        const resize = () => {
            let dpr = 1;
            if (typeof window !== "undefined") {
                dpr = window.devicePixelRatio || 1;
            }
            dprRef.current = dpr;
            const rect = canvasRef.current!.getBoundingClientRect();
            const w = Math.round(rect.width * dpr);
            const h = Math.round(rect.height * dpr);
            setSize({ width: w, height: h });
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // Mouse events
    const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        let x, y;

        // Check if it's a touch event
        if ('touches' in e && e.touches.length > 0) {
            x = (e.touches[0].clientX - rect.left) / rect.width;
            y = (e.touches[0].clientY - rect.top) / rect.height;
        } else if ('clientX' in e) {
            x = ((e as React.MouseEvent).clientX - rect.left) / rect.width;
            y = ((e as React.MouseEvent).clientY - rect.top) / rect.height;
        } else {
            return;
        }

        x = Math.max(0, Math.min(1, x));
        y = Math.max(0, Math.min(1, y));

        // Invert Y for logic if needed, but shaders usually take 0,0 as bottom-left or top-left depending on setup.
        // The original code passed y directly to mouseRef, but inverted it for WebGL uniform.

        mouseRef.current = { x, y, active: true };
        hoveredRef.current = true;

        // Add a wake point
        const now = Date.now();
        wakeRef.current = [
            ...wakeRef.current.filter((w) => now - w.t < 1200),
            { x, y, t: now },
        ].slice(-8);
    }, []);

    const handleLeave = useCallback(() => {
        mouseRef.current = { ...mouseRef.current, active: false };
        hoveredRef.current = false;
    }, []);

    // Animate mask radius
    useEffect(() => {
        let animId: number;
        let lastHovered = false;
        let start: number | null = null;
        let from = 0;
        let to = 0;
        const duration = 650;

        function easeInOutCubic(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animate(ts: number) {
            const hovered = hoveredRef.current;
            if (hovered !== lastHovered) {
                lastHovered = hovered;
                start = ts;
                from = maskRadiusRef.current;
                to = hovered ? 1.5 : 0;
            }
            if (start === null) start = ts;
            const elapsed = Math.min((ts - start) / duration, 1);
            const eased = easeInOutCubic(elapsed);
            maskRadiusRef.current = from + (to - from) * eased;

            if (elapsed < 1 || hovered !== lastHovered) { // Continue if animating or state changed
                animId = requestAnimationFrame(animate);
            } else {
                maskRadiusRef.current = to;
                animId = requestAnimationFrame(animate); // Keep loop alive for continuous updates if needed
            }
        }
        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, []);

    // WebGL Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        // Set canvas dimensions
        const dpr = dprRef.current || 1;
        // We rely on CSS for display size, but set internal resolution here.
        // However, the size state is updated by the resize observer which triggers this effect.
        // Better to handle resize in the render loop or separate effect to avoid re-init context.
        // But for simplicity, we follow the original structure where resize updates state -> re-run effect?
        // Actually, looking at original code: useEffect dependency is [image.src, size.width...]
        // Re-creating GL context on resize is expensive. Ideally we just resize the canvas buffer.

        canvas.width = size.width;
        canvas.height = size.height;

        let animationId: number;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageSrc;

        // Shaders
        const vs = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0, 1);
      }
    `;

        const fs = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_image;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_strength;
      uniform float u_speed;
      uniform vec2 u_resolution;
      
      #define MAX_WAKE 16
      uniform int u_wakeCount;
      uniform vec3 u_wake[MAX_WAKE]; // x, y, t
      uniform float u_maskRadius;

      void main() {
        vec2 uv = v_uv;
        // Correct UV for Aspect Ratio (Cover) handled in vertex or via texture coordinates?
        // The original code draws the image to an offscreen canvas with 'cover' logic,
        // then uploads that canvas as texture. This simplifies the shader.
        // We will replicate that offscreen canvas logic.

        // ... but here we assume uv 0..1 maps to the texture 0..1
        
        // Wake Ripples
        for (int i = 0; i < MAX_WAKE; ++i) {
          if (i >= u_wakeCount) break;
          vec2 w = u_wake[i].xy;
          float t = u_time - u_wake[i].z;
          float dist = distance(uv, w);
          float amp = exp(-dist * 16.0) * exp(-t * 1.2);
          float ripple = sin(32.0 * dist - t * 8.0 * u_speed) * 0.04;
          uv += normalize(uv - w) * ripple * u_strength * amp * 2.0;
        }

        // Live Mouse Ripple
        if (u_mouse.x >= 0.0) {
           float dist = distance(uv, u_mouse);
           float ripple = sin(32.0 * dist - u_time * 8.0 * u_speed) * 0.04;
           float effect = exp(-dist * 12.0);
           uv += normalize(uv - u_mouse) * ripple * u_strength * effect * 2.0;
        }

        uv = clamp(uv, 0.0, 1.0);
        vec4 color = texture2D(u_image, uv);

        // Grayscale
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 grayColor = vec3(gray);

        // Color Reveal Mask
        float mask = 0.0;
        
        // Mouse Mask
        if (u_mouse.x >= 0.0 && u_maskRadius > 0.0) {
            float d = distance(uv, u_mouse);
            mask = max(mask, smoothstep(u_maskRadius, u_maskRadius * 0.8, d));
        }
        
        // Hotspot/Wake Masks
        for (int i = 0; i < MAX_WAKE; ++i) {
           if (i >= u_wakeCount) break;
           vec2 w = u_wake[i].xy;
           float d = distance(uv, w);
           mask = max(mask, smoothstep(u_maskRadius, u_maskRadius * 0.8, d));
        }

        vec3 finalColor = mix(grayColor, color.rgb, mask);
        gl_FragColor = vec4(finalColor, color.a);
      }
    `;

        function createShader(type: number, src: string) {
            const s = gl!.createShader(type);
            if (!s) return null;
            gl!.shaderSource(s, src);
            gl!.compileShader(s);
            if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
                console.error(gl!.getShaderInfoLog(s));
                return null;
            }
            return s;
        }

        function createProgram(v: WebGLShader, f: WebGLShader) {
            const p = gl!.createProgram();
            if (!p) return null;
            gl!.attachShader(p, v);
            gl!.attachShader(p, f);
            gl!.linkProgram(p);
            if (!gl!.getProgramParameter(p, gl!.LINK_STATUS)) {
                console.error(gl!.getProgramInfoLog(p));
                return null;
            }
            return p;
        }

        let program: WebGLProgram | null = null;
        let tex: WebGLTexture | null = null;
        let loaded = false;

        // Locations
        let uTime: WebGLUniformLocation | null;
        let uMouse: WebGLUniformLocation | null;
        let uStrength: WebGLUniformLocation | null;
        let uSpeed: WebGLUniformLocation | null;
        let uResolution: WebGLUniformLocation | null;
        let uWake: WebGLUniformLocation | null;
        let uWakeCount: WebGLUniformLocation | null;
        let uMaskRadius: WebGLUniformLocation | null;

        // Offscreen for object-fit: cover
        let offCanvas: HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D | null;

        function setup() {
            if (!gl) return;
            const vshader = createShader(gl.VERTEX_SHADER, vs);
            const fshader = createShader(gl.FRAGMENT_SHADER, fs);
            if (!vshader || !fshader) return;

            program = createProgram(vshader, fshader);
            if (!program) return;

            gl.useProgram(program);

            // Buffer
            const pos = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, pos);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
            const loc = gl.getAttribLocation(program, "a_position");
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

            // Uniforms
            uTime = gl.getUniformLocation(program, "u_time");
            uMouse = gl.getUniformLocation(program, "u_mouse");
            uStrength = gl.getUniformLocation(program, "u_strength");
            uSpeed = gl.getUniformLocation(program, "u_speed");
            uResolution = gl.getUniformLocation(program, "u_resolution");
            uWake = gl.getUniformLocation(program, "u_wake");
            uWakeCount = gl.getUniformLocation(program, "u_wakeCount");
            uMaskRadius = gl.getUniformLocation(program, "u_maskRadius");

            // Texture
            tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            // Flip Y for WebGL
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

            // Offscreen Init
            offCanvas = document.createElement("canvas");
            // Initial sizing handled in updateTexture

            loaded = true;
            requestAnimationFrame(render);
        }

        function updateTexture() {
            if (!tex || !gl || !loaded) return;

            // Re-size offscreen if needed
            if (offCanvas.width !== size.width || offCanvas.height !== size.height) {
                offCanvas.width = size.width;
                offCanvas.height = size.height;
            }

            ctx = offCanvas.getContext("2d");
            if (!ctx) return;

            // Calculate object-fit: cover
            const iw = img.width;
            const ih = img.height;
            const scale = Math.max(size.width / iw, size.height / ih);
            const sw = iw * scale;
            const sh = ih * scale;
            const sx = (size.width - sw) / 2;
            const sy = (size.height - sh) / 2;

            ctx.clearRect(0, 0, size.width, size.height);
            ctx.drawImage(img, sx, sy, sw, sh);

            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);
        }

        const startTime = Date.now();

        function render() {
            if (!loaded || !gl || !program) return;

            // In a real optimized scenario, we only update texture on resize or image load.
            // But simple 'cover' logic needs current size. 
            // Efficiency trick: only update texture if size changed? 
            // For now, doing it inside render is safest but heavy. 
            // Let's rely on the size dependency of the useEffect to handle resize-based updates?
            // Actually, updateTexture uses the offscreen canvas to draw image to gl texture.
            // We should do this only when necessary.
            // BUT for 'cover' to work during resize, we need it. 
            // Since this useEffect re-runs on 'size' change, 'setup' runs again.
            // setup calls render.
            // SO we can call updateTexture ONCE inside setup (after image load).
            // However, if size changes, this effect re-runs.

            // wait, we need to call updateTexture every frame? No. only when content changes.
            // Content is static image + 'cover' resize.
            // Resize triggers full re-init here. So calling it once is fine.

            // Update: The original code called updateTexture inside setup.
            // But also note that if we scroll or resize, size changes for 'cover'.
            // We will call it once per frame? No that's bad.
            // We'll call it at beginning of render loop if it's the first frame (handled by setup calling render?)
            // Actually, let's just call it once in setup. 
            // Since the whole effect re-runs on `size` change, `imageSrc` change.
            updateTexture();

            gl.viewport(0, 0, size.width, size.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);

            const now = (Date.now() - startTime) / 1000;

            gl.uniform1f(uTime, now);

            // Mouse Normalization
            const mx = mouseRef.current.active ? mouseRef.current.x : -10;
            const my = mouseRef.current.active ? 1 - mouseRef.current.y : -10; // Invert Y

            gl.uniform2f(uMouse, mx, my);
            gl.uniform1f(uStrength, strength);
            gl.uniform1f(uSpeed, speed);
            gl.uniform2f(uResolution, size.width, size.height);

            // Wake Data
            const wakeArr = wakeRef.current;
            const wakeData = new Float32Array(16 * 3); // Max 16
            let count = 0;
            for (let i = 0; i < wakeArr.length && i < 16; i++) {
                wakeData[i * 3 + 0] = wakeArr[i].x;
                wakeData[i * 3 + 1] = 1 - wakeArr[i].y; // Invert Y
                wakeData[i * 3 + 2] = (wakeArr[i].t - startTime) / 1000;
                count++;
            }

            gl.uniform1i(uWakeCount, count);
            gl.uniform3fv(uWake, wakeData);

            gl.uniform1f(uMaskRadius, maskRadiusRef.current);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationId = requestAnimationFrame(render);
        }

        img.onload = () => {
            setup();
        };

        // If image cached
        if (img.complete) {
            setup();
        }

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            // Cleanup GL resources if needed
        };
    }, [imageSrc, size, strength, speed]); // Re-run if these change

    return (
        <div
            className={`relative overflow-hidden w-full h-full ${className}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onTouchMove={handleMove}
            onTouchEnd={handleLeave}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
                aria-label={alt}
            />
        </div>
    );
}
