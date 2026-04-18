import React, { useEffect, useState, useCallback, useRef } from 'react';

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const directionRef = useRef(direction);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Ensure food doesn't spawn on the snake
      const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
    setGameStarted(true);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' && gameStarted && !gameOver) {
        setIsPaused(p => !p);
        return;
      }

      if (!gameStarted && e.key === 'Enter') {
        resetGame();
        return;
      }

      if (gameOver && e.key === 'Enter') {
        resetGame();
        return;
      }

      if (isPaused || gameOver || !gameStarted) return;

      const { x, y } = directionRef.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, isPaused, resetGame]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!gameStarted || isPaused || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentDir = directionRef.current;
        const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

        // Check walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 120);
    return () => clearInterval(gameInterval);
  }, [gameStarted, isPaused, gameOver, food, generateFood]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full max-w-[400px] mb-2 px-1 border-b-2 border-[#00FFFF]">
        <div className="text-[#FF00FF] font-pixel text-xl tracking-widest bg-black px-2 shadow-[2px_2px_0px_#00FFFF]">
          SCORE_[{score.toString().padStart(4, '0')}]
        </div>
        <div className="text-[#FFFFFF] font-header text-[10px] bg-[#FF00FF] px-2 py-1">
          {isPaused ? 'THREAD_SUSPENDED' : gameOver ? 'SYS_HALT' : gameStarted ? 'OVERRIDE_ACTIVE' : 'AWAIT_INIT'}
        </div>
      </div>

      <div 
        className="w-full max-w-[400px] aspect-square bg-[#050505] brutal-border relative shadow-[0_0_30px_rgba(255,0,255,0.2)] screen-tear"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-[#FF00FF]/15" />
        ))}

        {gameStarted && snake.map((segment, index) => (
          <div
            key={`snake-${index}`}
            className={`${index === 0 ? 'bg-[#00FFFF]' : 'bg-[#00AAAA]'} screen-tear border border-[#FF00FF]`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
              zIndex: 10,
              boxShadow: index === 0 ? '0 0 10px #00FFFF, 2px 2px 0px #FF00FF' : 'none',
              transform: 'scale(0.95)'
            }}
          />
        ))}

        {gameStarted && !gameOver && (
          <div
            className="bg-[#FFFFFF] animate-pulse glitch-text font-pixel flex items-center justify-center text-[#FF00FF] font-bold text-xs"
            style={{
              gridColumnStart: food.x + 1,
              gridRowStart: food.y + 1,
              zIndex: 10,
              boxShadow: '0 0 15px #FF00FF, -2px 0 0 #00FFFF',
              transform: 'scale(0.85)'
            }}
          >X</div>
        )}

        {/* OVERLAYS */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
            <h2 className="text-[#00FFFF] font-header text-xl mb-4 glitch-text" data-text="RUN_OROBOROS.EXE">RUN_OROBOROS.EXE</h2>
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-[#FF00FF] text-[#FFFFFF] shadow-[4px_4px_0px_#00FFFF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#00FFFF] font-header text-sm transition-all"
            >
              [ INJECT_CODE ]
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 text-center space-y-6 px-4">
             <h2 className="text-[#FF00FF] font-header text-xl mb-2 bg-[#FFFFFF] px-2 text-black" data-text="SEG_FAULT_DETECTED">SEG_FAULT_DETECTED</h2>
             <div className="text-[#00FFFF] font-pixel text-lg max-w-[90%] text-left border-l-4 border-[#FF00FF] pl-4">
               &gt; KERNEL PANIC:<br/>
               &gt; MEMORY BOUNDARY BREACHED.<br/>
               &gt; FINAL_ALLOC: <span className="text-[#FF00FF] font-bold">{score}</span> BYTES.
             </div>
             <button 
              onClick={resetGame}
              className="px-4 py-2 bg-[#00FFFF] text-black shadow-[-4px_4px_0px_#FF00FF] hover:-translate-x-[2px] hover:translate-y-[2px] hover:shadow-[-2px_2px_0px_#FF00FF] font-header text-xs transition-all"
            >
              [ RE-ALLOCATE_MEM ]
            </button>
          </div>
        )}

        {isPaused && !gameOver && gameStarted && (
           <div className="absolute inset-0 bg-[#00FFFF]/20 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
             <div className="bg-black border-2 border-[#FF00FF] p-4 shadow-[4px_4px_0px_#00FFFF]">
               <h2 className="text-[#FF00FF] font-pixel text-2xl tracking-widest animate-pulse">&gt; SYS_PAUSED_</h2>
             </div>
           </div>
        )}
      </div>

      <div className="mt-4 text-[#FF00FF] font-pixel text-sm max-w-[400px] text-center uppercase bg-black px-2 py-1 border border-[#00FFFF]/30">
        DIRECTIVES: [W][A][S][D] / [ARROWS] TO NAVIGATE CYBER-SPACE.<br/> [SPACE] TO SUSPEND THREAD.
      </div>
    </div>
  );
}
