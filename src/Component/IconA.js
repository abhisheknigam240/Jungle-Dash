import React, { forwardRef } from 'react';

const IconA = forwardRef(({ isJumping, style }, ref) => {
  const legStyle = isJumping ? { animation: 'none' } : {};
  return (
    <div ref={ref} className="dino" style={style}>
      <div className="leg leg1" style={legStyle}></div>
      <div className="leg leg2" style={legStyle}></div>
      <div className="body">
        <div className="eyes pos1"></div>
        <div className="eyes pos2"></div>
        <div className="mouth"></div>
      </div>
    </div>
  );
});

export default IconA;