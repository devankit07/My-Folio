import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", moveHandler);

    const animate = () => {
      circle.current.x += (mouse.current.x - circle.current.x) * 0.12;
      circle.current.y += (mouse.current.y - circle.current.y) * 0.12;

      setCirclePos({ x: circle.current.x, y: circle.current.y });
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate3d(${circlePos.x}px, ${circlePos.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div className="w-6 h-6 rounded-full border border-green-500 opacity-80" />
    </div>
  );
};

export default CustomCursor;
