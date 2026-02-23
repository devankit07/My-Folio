import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Typewriter = ({ text, speed = 35, className = "" }) => {
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (subIndex >= text.length) return;
    const t = setTimeout(() => setSubIndex((s) => s + 1), speed);
    return () => clearTimeout(t);
  }, [subIndex, text, speed]);

  return (
    <p className={`mt-4 text-gray-400 leading-relaxed text-base sm:text-lg md:max-w-3xl ${className}`}>
      {text.substring(0, subIndex)}
      <motion.span
        className="inline-block ml-1 w-0.5 bg-white align-middle"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        style={{ height: "1em" }}
      />
    </p>
  );
};

export default Typewriter;

