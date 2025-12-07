import { useEffect, useState } from "react";

const CustomCurso = () => {
  const [position, setposition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const movehandler = (e) => {
      setposition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", movehandler);
    return () => window.removeEventListener("mousemove", movehandler);
  });

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 "
      style={{
        transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
      }}
    >
      <div className="w-20 h-20 rounded-full bg-white blur-2xl opacity-80" />
    </div>
  );
};
 
export default CustomCurso
