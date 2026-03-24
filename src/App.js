import { useState, useEffect, useRef } from 'react';
import './App.css';
import IconA from './Component/IconA';
import TreeA from './Component/TreeA';
import HomeP from './Component/HomeP';
import Over from './Component/Over';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [treeLeft, setTreeLeft] = useState(1500); // Start off-screen right
  const [showOver, setShowOver] = useState(false); // Over component initially false
  const treeInterval = useRef(null);
  const [score, setScore] = useState(0);
  const [isJumpingState, setIsJumpingState] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('jungleDashHighScore')) || 0;
  });

  const playerState = useRef({
    y: 0,
    velocity_y: 0,
    gravity: 0.8,
    jump_power: -19,
    ground_y: 0,
    isJumping: false
  });
  const dinoRef = useRef(null);
  const treeRef = useRef(null);

  // Function to move TreeA from right to left continuously
  useEffect(() => {
    if (!showGame) return;
    setTreeLeft(1700); // Reset position when game starts

    treeInterval.current = setInterval(() => {
      setTreeLeft(prev => (prev < -100 ? 1500 : prev - 7)); // Reset to right when off-screen
    }, 16);



    return () => clearInterval(treeInterval.current);
  }, [showGame]);

  useEffect(() => {
    if (!showGame) return;
    setScore(0); // Reset score when game starts

    const scoreInterval = setInterval(() => {
      setScore(prev => prev + 1);
    }, 100); // Increase score every 100ms

    return () => clearInterval(scoreInterval);
  }, [showGame]);

  // Physics engine and collision detection
  useEffect(() => {
    if (!showGame) return;
    const gameLoop = () => {
      // 1. Physics update
      const p = playerState.current;
      p.velocity_y += p.gravity;
      p.y += p.velocity_y;
      if (p.y >= p.ground_y) {
        p.y = p.ground_y;
        p.velocity_y = 0;
        if (p.isJumping) {
          p.isJumping = false;
          setIsJumpingState(false);
        }
      }

      if (dinoRef.current) {
        dinoRef.current.style.transform = `translateY(${p.y}px)`;
      }

      // 2. Collision detection
      if (dinoRef.current && treeRef.current) {
        const dinoRect = dinoRef.current.getBoundingClientRect();
        const treeRect = treeRef.current.getBoundingClientRect();
        if (
          dinoRect.right > treeRect.left + 20 &&
          dinoRect.left < treeRect.right - 20 &&
          dinoRect.bottom > treeRect.top + 20 &&
          dinoRect.top < treeRect.bottom - 20
        ) {
          setShowOver(true);
          setShowGame(false);
          setScore(prev => {
            setHighScore(currentHigh => {
              if (prev > currentHigh) {
                localStorage.setItem('jungleDashHighScore', prev);
                return prev;
              }
              return currentHigh;
            });
            return prev;
          });
        }
      }
    };
    const interval = setInterval(gameLoop, 16);
    return () => clearInterval(interval);
  }, [showGame]);

  const handleJump = () => {
    const p = playerState.current;
    if (!p.isJumping) {
      p.velocity_y = p.jump_power;
      p.isJumping = true;
      setIsJumpingState(true);
    }
  };

  useEffect(() => {
    if (!showGame) return;

    const onKeyDown = (event) => {
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showGame]);

  const handlePlay = () => {
    // Reset player physics
    const p = playerState.current;
    p.y = p.ground_y;
    p.velocity_y = 0;
    p.isJumping = false;

    // Reset game state
    setScore(0);
    setIsJumpingState(false); // Reset leg animation
    setShowGame(true);
    setShowOver(false);
    setTreeLeft(1700);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!showGame && !showOver && (
          <>
            <div>
              <HomeP />
            </div>
            <div>
              <button className='playb' onClick={handlePlay}>Play</button>
            </div>
            <div className='created'>
              <h3>Created by- Abhishek Nigam</h3>
            </div>
          </>
        )}
        {showGame && (
          <div style={{ width: '100vw', height: '100vh', position: 'relative', overflowX: 'hidden' }} onClick={handleJump}>
            <div className='sun'></div>
            <div className='score'>Score {score}</div>
            <IconA ref={dinoRef} isJumping={isJumpingState} />
            <div style={{ position: 'absolute', left: treeLeft, bottom: 100 }}>
              <TreeA ref={treeRef} />
            </div>
            <div className='road'></div>
          </div>
        )}
        {showOver && (
          <div>
            <Over handlePlay={handlePlay} />
            <div className='yscore'>your score is {score}</div>
            <div className='yscore' style={{ top: '510px' }}>high score: {highScore}</div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;