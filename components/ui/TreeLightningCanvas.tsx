"use client";

import { useEffect, useRef } from "react";

type Branch = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  depth: number;
  offset: number;
  speed: number;
  pulse: number;
};

const MAX_DEPTH = 8;

function createTree(
  originX: number,
  originY: number,
  length: number,
  angle: number,
  depth: number,
  branches: Branch[]
) {
  if (depth > MAX_DEPTH || length < 8) return;

  const endX = originX + Math.cos(angle) * length;
  const endY = originY + Math.sin(angle) * length;

  branches.push({
    startX: originX,
    startY: originY,
    endX,
    endY,
    width: Math.max(0.8, 4.5 - depth * 0.45),
    depth,
    offset: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.7,
    pulse: Math.random(),
  });

  const nextLength = length * (0.7 + Math.random() * 0.08);
  const spread = 0.2 + Math.random() * 0.25;

  createTree(endX, endY, nextLength, angle - spread, depth + 1, branches);
  createTree(endX, endY, nextLength, angle + spread, depth + 1, branches);

  if (Math.random() > 0.72) {
    createTree(endX, endY, nextLength * 0.7, angle + (Math.random() - 0.5) * 1.1, depth + 1, branches);
  }
}

export default function TreeLightningCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let branches: Branch[] = [];

    const build = () => {
      branches = [];
      const trunkLength = Math.min(width, height) * 0.24;
      const rootX = width / 2;
      const rootY = height * 1.02;
      createTree(rootX, rootY, trunkLength, -Math.PI / 2, 0, branches);
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = (time: number) => {
      const t = time * 0.001;

      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(width / 2, height * 0.9, 20, width / 2, height * 0.75, width * 0.75);
      bg.addColorStop(0, "rgba(67, 56, 202, 0.22)");
      bg.addColorStop(0.45, "rgba(14, 116, 144, 0.12)");
      bg.addColorStop(1, "rgba(4, 7, 16, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (const branch of branches) {
        const sway = Math.sin(t * branch.speed + branch.offset + branch.depth * 0.2) * (1.8 + branch.depth * 0.15);
        const x2 = branch.endX + sway;
        const y2 = branch.endY;

        ctx.lineCap = "round";
        ctx.lineWidth = branch.width;
        ctx.strokeStyle = `rgba(49, 46, 129, ${0.26 + (MAX_DEPTH - branch.depth) * 0.025})`;
        ctx.beginPath();
        ctx.moveTo(branch.startX, branch.startY);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        const pulse = (Math.sin(t * 2.5 + branch.pulse * Math.PI * 2) + 1) / 2;
        const glowAlpha = 0.32 + pulse * 0.58;

        ctx.shadowBlur = 16 + pulse * 14;
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.strokeStyle = `rgba(56, 189, 248, ${glowAlpha})`;
        ctx.lineWidth = Math.max(0.8, branch.width * 0.45);
        ctx.beginPath();
        ctx.moveTo(branch.startX, branch.startY);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-100"
      aria-hidden="true"
    />
  );
}
