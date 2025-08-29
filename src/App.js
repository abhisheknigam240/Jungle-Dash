import { useState, useEffect, useRef } from 'react';
import './App.css';
import IconA from './Component/IconA';
import TreeA from './Component/TreeA';
import HomeP from './Component/HomeP';
import Over from './Component/Over';

function App() {
  const [jump, setjump] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [treeLeft, setTreeLeft] = useState(1500); // Start off-screen right
  const [showOver, setShowOver] = useState(false); // Over component initially false
  const treeInterval = useRef(null);
  const [score, setScore] = useState(0);

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

  // Collision detection between IconA and TreeA
  useEffect(() => {
    if (!showGame) return;
    const checkCollision = () => {
      if (dinoRef.current && treeRef.current) {
        const dinoRect = dinoRef.current.getBoundingClientRect();
        const treeRect = treeRef.current.getBoundingClientRect();
        if (
          dinoRect.right > treeRect.left &&
          dinoRect.left < treeRect.right &&
          dinoRect.bottom > treeRect.top &&
          dinoRect.top < treeRect.bottom
        ) {
          setShowOver(true);
          setShowGame(false);
        }
      }
    };
    const interval = setInterval(checkCollision, 16);
    return () => clearInterval(interval);
  }, [showGame, treeLeft, jump]);

  const handleClick = () => {
    setjump(true);
    setTimeout(() => setjump(false), 1500);
  };

  const handlePlay = () => {
    setShowGame(true);
    setShowOver(false); // Hide Over component when game starts
    setTreeLeft(1700); // Reset tree position
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
          <div style={{ width: '100vw', height: '100vh', position: 'relative' }} onClick={handleClick}>
            <div className='sun'></div>
            <div className='score'>Score {score}</div>
            <IconA ref={dinoRef} jump={jump} />
            <div style={{ position: 'absolute', left: treeLeft, bottom: 100 }}>
              <TreeA ref={treeRef} />
            </div>
            <div className='road'></div>
          </div>
        )}
        {showOver && (
          <div>
            <Over />
            <div className='yscore'>your score is {score} </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;