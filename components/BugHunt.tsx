"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const DURATION = 20_000; // 20 วิ
const SPAWN_MS = 650;    // ทุก 0.65 วิเกิด "บั๊ก" ใหม่

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function BugHunt({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number }[]>([]);
  const [high, setHigh] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const s = localStorage.getItem("bughunt-high");
    return s ? Number(s) : 0;
  });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const ticker = useRef<number | null>(null);
  const spawner = useRef<number | null>(null);
  const idCounter = useRef(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (ticker.current) cancelAnimationFrame(ticker.current);
      if (spawner.current) clearInterval(spawner.current);
    };
  }, []);

  const start = () => {
    setScore(0);
    setBugs([]);
    setTimeLeft(DURATION);
    setPlaying(true);
    startTime.current = performance.now();

    const loop = () => {
      const elapsed = performance.now() - startTime.current;
      const left = Math.max(0, DURATION - elapsed);
      setTimeLeft(left);
      if (left > 0) {
        ticker.current = requestAnimationFrame(loop);
      } else {
        finish();
      }
    };
    ticker.current = requestAnimationFrame(loop);

    spawner.current = window.setInterval(() => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const size = 28;
      const x = rand(0, Math.max(0, rect.width - size));
      const y = rand(0, Math.max(0, rect.height - size));
      setBugs((prev) => [...prev, { id: idCounter.current++, x, y }].slice(-8));
    }, SPAWN_MS);
  };

  const finish = () => {
    setPlaying(false);
    if (spawner.current) {
      clearInterval(spawner.current);
      spawner.current = null;
    }
    if (ticker.current) {
      cancelAnimationFrame(ticker.current);
      ticker.current = null;
    }
    setBugs([]);
    setHigh((h) => {
      const n = Math.max(h, score);
      localStorage.setItem("bughunt-high", String(n));
      return n;
    });
  };

  const hit = (id: number) => {
    setScore((s) => s + 1);
    setBugs((prev) => prev.filter((b) => b.id !== id));
  };

  const seconds = useMemo(() => (timeLeft / 1000).toFixed(1), [timeLeft]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold gradient-text">Bug Hunt 🐞</h1>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border hover:shadow transition-shadow"
            aria-label="Close"
          >
            ✕ Close
          </button>
        </div>
        
        <p className="opacity-80 mt-1 text-sm">
          ไล่คลิกบั๊กให้ได้มากที่สุดใน <strong>20 วิ</strong> — เก็บคะแนนขึ้น High Score!
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm">
          <div>⏱️ Time: <strong>{seconds}s</strong></div>
          <div>🎯 Score: <strong>{score}</strong></div>
          <div>🏆 High: <strong>{high}</strong></div>
          {!playing ? (
            <button onClick={start} className="ml-auto border px-3 py-1 rounded hover:opacity-80 transition-colors">
              Start
            </button>
          ) : (
            <button onClick={finish} className="ml-auto border px-3 py-1 rounded hover:opacity-80 transition-colors">
              Stop
            </button>
          )}
        </div>

        <div
          ref={stageRef}
          className="relative mt-4 h-[380px] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden select-none bg-gray-50 dark:bg-gray-900"
        >
          {bugs.map((b) => (
            <button
              key={b.id}
              onClick={() => hit(b.id)}
              className="absolute rounded-full border-2 border-red-500 bg-red-500 shadow-lg hover:scale-110 transition-transform"
              style={{ left: b.x, top: b.y, width: 28, height: 28 }}
              aria-label="bug"
              title="squash me!"
            >
              🐞
            </button>
          ))}
          {!playing && (
            <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
              <div>
                <p className="text-5xl">🕹️</p>
                <p className="opacity-70">กด Start เพื่อเริ่มล่าบั๊ก</p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-3 text-xs opacity-70">Tip: เมาส์/ทัชได้หมด</p>
      </div>
    </div>
  );
}

