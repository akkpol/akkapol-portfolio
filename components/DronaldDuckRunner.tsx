'use client';
import { useEffect, useRef, useState } from 'react';

interface Obstacle {
  id: number;
  x: number;
}

export default function DronaldDuckRunner() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const obstacleIdRef = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!playing || gameOver) return;

    const gameLoop = () => {
      // Move obstacles
      setObstacles(prev => 
        prev.map(ob => ({ ...ob, x: ob.x - 8 }))
            .filter(ob => ob.x > -50)
      );

      // Spawn new obstacles
      if (Math.random() < 0.02 && obstacles.length < 3) {
        setObstacles(prev => [...prev, { 
          id: obstacleIdRef.current++, 
          x: 1000 
        }]);
      }

      // Check collision
      const duckX = 80;
      const duckY = isJumping ? 100 : 380;
      const duckWidth = 60;
      const duckHeight = 60;

      obstacles.forEach(ob => {
        const obX = ob.x;
        const obY = 380;
        const obWidth = 40;
        const obHeight = 60;

        if (
          duckX < obX + obWidth &&
          duckX + duckWidth > obX &&
          duckY < obY + obHeight &&
          duckY + duckHeight > obY
        ) {
          setGameOver(true);
          setPlaying(false);
        }
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [playing, gameOver, isJumping, obstacles]);

  useEffect(() => {
    if (playing && !gameOver) {
      const interval = setInterval(() => {
        setScore(prev => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [playing, gameOver]);

  const jump = () => {
    if (!isJumping && playing) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  const start = () => {
    setPlaying(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setIsJumping(false);
    obstacleIdRef.current = 0;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      if (!playing) start();
      else jump();
    }
  };

  return (
    <div 
      ref={gameRef}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onClick={!playing ? start : jump}
      className="relative w-full h-[450px] bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden rounded-2xl border-2 border-gray-300 dark:border-gray-700 cursor-pointer"
      style={{ touchAction: 'none' }}
    >
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-[70px] bg-green-600 dark:bg-green-800">
        <div className="absolute bottom-[70px] w-full h-4 bg-green-500 dark:bg-green-700"></div>
      </div>

      {/* Instructions */}
      {!playing && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
          <div className="text-center p-6 bg-white/90 dark:bg-gray-900/90 rounded-2xl max-w-md">
            <div className="text-6xl mb-4">🧡</div>
            <h3 className="text-2xl font-bold mb-2 gradient-text-blue">President Trump Runner</h3>
            <p className="text-sm mb-4">กด SPACE หรือคลิกเพื่อกระโดด</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                start();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              เริ่มเกม
            </button>
          </div>
        </div>
      )}

      {/* Score */}
      <div className="absolute top-4 left-4 text-white drop-shadow-lg">
        <div className="text-xl font-bold">Score: {score}</div>
        {gameOver && (
          <div className="text-sm mt-1">Game Over! กดเพื่อเล่นใหม่</div>
        )}
      </div>

      {/* President Trump */}
      <div
        className="absolute text-6xl transition-all duration-600"
        style={{
          left: '80px',
          bottom: isJumping ? '200px' : '120px',
        }}
      >
        🧡
      </div>

      {/* Obstacles */}
      {obstacles.map(ob => (
        <div
          key={ob.id}
          className="absolute text-5xl"
          style={{
            right: `${1000 - ob.x}px`,
            bottom: '120px',
          }}
        >
          🌵
        </div>
      ))}

      {/* Clouds */}
      <div className="absolute top-20 left-10 text-4xl opacity-40">☁️</div>
      <div className="absolute top-10 left-40 text-3xl opacity-30">☁️</div>
      <div className="absolute top-32 right-20 text-3xl opacity-35">☁️</div>
    </div>
  );
}

