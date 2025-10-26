"use client";
import { useEffect, useRef, useState } from "react";

type RGBA = [number, number, number, number]; // r,g,b,a

// พาเล็ต
const C = {
  bg:    [0, 0, 0, 0] as RGBA,
  hair:  [240, 200, 60, 255] as RGBA,   // ทอง
  skin:  [255, 221, 190, 255] as RGBA,  // ผิว
  suit:  [20, 34, 64, 255] as RGBA,     // สูทน้ำเงินเข้ม
  shirt: [245, 245, 245, 255] as RGBA,  // เสื้อขาว
  tie:   [210, 30, 40, 255] as RGBA,    // ไทแดง
  shoe:  [10, 10, 10, 255] as RGBA,     // รองเท้า
  outline:[0, 0, 0, 255] as RGBA
};

// 16x16: ใช้เลขแทนสีเพื่ออ่านง่าย
// 0=bg , 1=hair , 2=skin , 3=suit , 4=shirt , 5=tie , 6=shoe , 7=outline
// เฟรม A (ยืน/วิ่งเฟรม1)
const A: number[] = [
  // 16 แถว × 16 คอลัมน์ (รวมเป็น 256 ตัว)
  0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
  0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
  0,0,0,0,7,7,1,1,1,1,7,7,0,0,0,0,
  0,0,0,7,1,1,2,2,2,2,1,1,7,0,0,0,
  0,0,7,1,2,2,2,2,2,2,2,2,1,7,0,0,
  0,0,7,1,2,2,2,2,2,2,2,2,1,7,0,0,
  0,0,7,1,2,2,2,2,2,2,2,2,1,7,0,0,
  0,0,0,7,1,1,2,2,2,2,1,1,7,0,0,0,
  0,0,0,0,7,7,4,4,4,4,7,7,0,0,0,0,
  0,0,0,0,3,3,3,5,5,3,3,3,0,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,0,6,6,0,0,0,0,6,6,0,0,0,0,
  0,0,0,0,6,6,0,0,0,0,0,6,0,0,0,0,
  0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,
];

// เฟรม B (อีกท่า ขาสลับ)
const B: number[] = [
  0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
  0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
  0,0,0,0,7,7,1,1,1,1,7,7,0,0,0,0,
  0,0,0,7,1,1,2,2,2,2,1,1,7,0,0,0,
  0,0,7,1,2,2,2,2,2,2,2,2,1,7,0,0,
  0,0,7,1,2,2,2,2,2,2,2,2,1,7,0,0,
  0,0,7,1,2,2,2,2,2,2,2,2,1,7,0,0,
  0,0,0,7,1,1,2,2,2,2,1,1,7,0,0,0,
  0,0,0,0,7,7,4,4,4,4,7,7,0,0,0,0,
  0,0,0,0,3,3,3,5,5,3,3,3,0,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,0,0,6,0,0,0,0,6,6,0,0,0,0,
  0,0,0,0,0,6,0,0,0,0,6,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

const palette: Record<number, RGBA> = {
  0: C.bg, 1: C.hair, 2: C.skin, 3: C.suit, 4: C.shirt, 5: C.tie, 6: C.shoe, 7: C.outline
};

export default function PixelTrump({
  scale = 4,
  fps = 6,
  className,
}: { scale?: number; fps?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState<0 | 1>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 16; c.height = 16;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const data = frame === 0 ? A : B;
    const img = ctx.createImageData(16, 16);
    for (let i = 0; i < data.length; i++) {
      const color = palette[data[i]];
      img.data[i * 4 + 0] = color[0];
      img.data[i * 4 + 1] = color[1];
      img.data[i * 4 + 2] = color[2];
      img.data[i * 4 + 3] = color[3];
    }
    ctx.putImageData(img, 0, 0);
  }, [frame]);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [fps]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: 16 * scale, height: 16 * scale, imageRendering: "pixelated" }}
      aria-label="Pixel Trump"
    />
  );
}

