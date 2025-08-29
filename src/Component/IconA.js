import React, { forwardRef } from 'react';

const IconA = forwardRef(({ jump }, ref) => (
  <div ref={ref} className={`dino${jump ? ' jump' : ''}`}>
    <div className="leg leg1"></div>
    <div className="leg leg2"></div>
    <div className="body">
      <div className="eyes pos1"></div>
      <div className="eyes pos2"></div>
      <div className="mouth"></div>
    </div>
  </div>
));

export default IconA;