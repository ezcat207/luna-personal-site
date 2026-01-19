import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], .sticker')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center p-1"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
                rotate: isHovering ? 15 : 0
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
        >
            <div className={`w-full h-full rounded-sm shadow-sm transition-colors duration-200 flex items-center justify-center ${isHovering ? 'bg-pink-400/80 -rotate-12' : 'bg-pencil/20 rotate-12'}`}>
                {isHovering ? '🐰' : '✏️'}
            </div>
            {/* Trail */}
            <motion.div
                className="absolute inset-0 border border-pencil/10 rounded-full"
                animate={{ scale: isHovering ? 2 : 1, opacity: isHovering ? 0 : 0.2 }}
            />
        </motion.div>
    );
};

export default CustomCursor;
