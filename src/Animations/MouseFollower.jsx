import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const MouseFollower = () => {
  const [dots, setDots] = useState([]);
  const dotSize = 6;
  const dotCount = 8;
  const dotColor = "rgba(59, 130, 246, 0.8)"; // Blue-500 with 80% opacity

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 20, stiffness: 500 });
  const cursorYSpring = useSpring(cursorY, { damping: 20, stiffness: 500 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      setDots(prev => {
        const newDots = [{ x: e.clientX, y: e.clientY }, ...prev];
        return newDots.slice(0, dotCount);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main blue dot */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
        className="fixed rounded-full pointer-events-none z-[9999]"
      />

      {/* Blue dot trail */}
      {dots.map((dot, index) => {
        const opacity = 0.8 - (index / dotCount * 0.7);
        const size = dotSize * (0.9 - (index * 0.05));

        return (
          <motion.div
            key={`dot-${index}`}
            style={{
              left: dot.x,
              top: dot.y,
              width: size,
              height: size,
              opacity: opacity,
              backgroundColor: dotColor,
            }}
            className="fixed rounded-full pointer-events-none z-[9998]"
            transition={{ type: "spring", damping: 20 }}
          />
        );
      })}
    </>
  );
};

export default MouseFollower;