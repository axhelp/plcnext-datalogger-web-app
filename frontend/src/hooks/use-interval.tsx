// By Dan Abramov @ overreacted.io
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import React, {useEffect, useRef} from 'react';


export const useInterval = (callback: any, delay: number) => {
    const savedCallback: any = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
