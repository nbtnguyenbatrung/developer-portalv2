import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
    target: number
    suffix: string
    duration: number
}
export const AnimatedCounter = ({ target, suffix = '+', duration = 2000 } : AnimatedCounterProps) => {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const startTime = Date.now();
        const endTime = startTime + duration;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const currentCount = Math.floor(easeOutQuart * target);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
                setIsAnimating(false);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration]);

    return (
        <span className={`transition-all ${isAnimating ? 'blur-[0.5px]' : ''}`}>
      {count}{suffix}
    </span>
    );
};
