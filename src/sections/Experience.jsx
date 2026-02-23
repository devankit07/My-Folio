import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = 
  [
  {
    role: "Networking & Internet Student",
    company: "Earth Institute",
    duration: "Nov 2023 - Jan 2024",
    description:
      "Completed a 3-month basic course on Networking and Internet fundamentals.",
  },
  {
    role: "Full Stack Development Student",
    company: "GeeksforGeeks (GFG)",
    duration: "Dec 2024 - Mar 2025",
    description:
      "Completed a 3-4 month Full Stack Development course covering frontend and backend technologies.",
  },
  {
    role: "Advanced Full Stack Development Student",
    company: "Sheriyans Coding School",
    duration: "Nov 2025 - Present",
    description:
      "Currently learning advanced full stack concepts including DevOps, CI/CD pipelines, Three.js, DSA In JS, and modern development practices.",
  },
];


function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = progress;
  const y = useTransform(progress, [0, 1], [20, 0]);

  if (layout === "mobile") {
    return (
      <div  className="relative flex items-start">
        <motion.div
          className="absolute left-0 w-6 h-6 rounded-full bg-white z-20"
          style={{ scale: progress, opacity }}
        />

        <motion.div
          className="absolute left-2 top-3 w-6 h-[2px] bg-white/40"
          style={{ opacity }}
        />

        <motion.article
          className="ml-10 bg-gray-900/90 border border-gray-700 rounded-xl p-6 w-full"
          style={{ opacity, y }}
        >
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <p className="text-sm text-gray-400">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  const isTop = idx % 2 === 0;

  return (
    <section className="relative flex-1 flex justify-center">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white z-20"
        style={{ scale: progress, opacity }}
      />

      <motion.div
        className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-white/40 ${
          isTop ? "top-[50%] h-16" : "bottom-[50%] h-16"
        }`}
        style={{ opacity }}
      />

      {/* 3D tilt + hover reveal (centered within column) */}
      <motion.article
        className={`absolute left-1/2 -translate-x-1/2 ${isTop ? "top-[calc(50%+4rem)]" : "bottom-[calc(50%+4rem)]"} bg-gray-900/90 border border-gray-700 rounded-xl p-6 w-[320px] will-change-transform`}
        style={{ opacity, y }}
      >
        <div className="perspective-1000">
          <InnerTiltCard exp={exp} />
        </div>
      </motion.article>
    </section>
  );
}

function InnerTiltCard({ exp }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1; // -1 .. 1
    const ny = (y / rect.height) * 2 - 1;
    rotateY.set(-nx * 10); // tilt left/right
    rotateX.set(ny * 8); // tilt up/down
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  function handleEnter() {
    scale.set(1.03);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        boxShadow: "0 6px 20px rgba(2,6,23,0.6)",
      }}
      className="relative bg-transparent rounded-xl"
    >
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(120deg, rgba(125,211,252,0.06), rgba(167,139,250,0.06) 40%, rgba(34,211,238,0.04))",
          filter: "blur(12px)",
        }}
      />

      <div className="relative z-10">
        <h3 className="text-lg font-semibold">{exp.role}</h3>
        <p className="text-sm text-gray-400">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
      </div>
    </motion.div>
  );
}

const Experience = () => {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sceneHeightVh = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${sceneHeightVh}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-6 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-6xl mx-auto">
                <div className="h-[4px] bg-white/20 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-[4px] bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between mt-10">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {isMobile && (
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-white/15 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-white origin-top rounded"
                  style={{ height: lineSize }}
                />
              </div>

              <div className="relative flex flex-col gap-12 mt-6 pb-28">
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={idx}
                    exp={exp}
                    idx={idx}
                    start={idx === 0 ? 0 : thresholds[idx - 1]}
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="mobile"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
