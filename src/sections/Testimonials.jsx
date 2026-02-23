import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    review:
      "Working with Ankit was a great experience. Clean UI, smooth animations, and solid code quality.",
    img: "/images/m1.png",
  },
  {
    name: "Sneha Verma",
    role: "UI/UX Designer",
    review:
      "Very detail-oriented developer. Understands design systems well and delivers pixel-perfect results.",
    img: "/images/w1.png",
  },
  {
    name: "Aman Gupta",
    role: "Startup Founder",
    review:
      "Ankit built our website exactly as we envisioned. Performance and responsiveness were top-notch.",
    img: "/images/m2.png",
  },
  {
    name: "Neha Singh",
    role: "Product Manager",
    review:
      "Professional, reliable, and quick to iterate. Communication and execution were excellent.",
    img: "/images/w2.png",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const containerRef = useRef(null);

  // Manual navigation only — autoplay disabled so users control which card is centered.
  function go(dir) {
    setIndex((idx) => (idx + dir + total) % total);
  }

  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        className="text-4xl font-bold mb-10"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Our Clients Say
      </motion.h2>

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl h-[340px] flex items-center justify-center"
      >
        {/* left arrow */}
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="z-20 w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center mr-6"
        >
          ‹
        </button>

        {/* center viewport where cards are centered between arrows */}
        <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden">
          {testimonials.map((t, i) => {
            // compute relative position to active index with wrap
            let pos = i - index;
            if (pos > total / 2) pos -= total;
            if (pos < -total / 2) pos += total;

            const abs = Math.abs(pos);
            const CARD_WIDTH = 320;
            const GAP = 32;
            const translateX = pos * (CARD_WIDTH + GAP);
            const scale = Math.max(0.78, 1 - abs * 0.08);
            const z = total - abs;
            const opacity = Math.max(0.25, 1 - abs * 0.25);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  zIndex: z,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="absolute w-[320px] h-[220px] rounded-2xl bg-white/6 border border-white/10 backdrop-blur-lg p-5 flex flex-col justify-between"
                style={{
                  transformStyle: "preserve-3d",
                  top: "50%",
                  left: "50%",
                  translate: "-50% -50%",
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-white/30 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">{t.review}</p>
              </motion.div>
            );
          })}
        </div>

        {/* right arrow */}
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="z-20 w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center ml-6"
        >
          ›
        </button>
      </div>

      {/* indicators */}
      <div className="mt-8 flex items-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
