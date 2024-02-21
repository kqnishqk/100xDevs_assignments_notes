import React, { useState, useCallback, useRef, useEffect } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.


export function Assignment2() {
    const [state, setState] = useState(0);

    let pRef = useRef(0)
    
    useEffect(() => {
        pRef.current += 1;
    },[state]);

    const handleReRender = () => {
        // Update state to force re-render
        setState(state + 1 );
    };

    return (
        <div>
            <p>This component has rendered {pRef.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};