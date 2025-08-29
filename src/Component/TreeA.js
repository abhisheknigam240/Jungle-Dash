import React, { forwardRef } from 'react';

const TreeA = forwardRef((props, ref) => (
    <div ref={ref} >
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