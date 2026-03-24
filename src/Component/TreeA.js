import React, { forwardRef } from 'react';

const TreeA = forwardRef(({ style }, ref) => (
    <div ref={ref} style={style}>
        <div className="tree">
            <div className="leaves">
                <div className="leaf1"></div>
                <div className="leaf2"></div>
                <div className="leaf3"></div>
            </div>
            <div className="steam"></div>
        </div>
    </div>
));
 
export default TreeA;