import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2022",
    description:
      "Built high-performance apps, integrated AI features, improved engagement by 10%.",
  },
  {
    role: "Web Developer Intern",
    company: "Mobisoft Technologies",
    duration: "2022 - 2023",
    description: "Gained hands-on web development experience.",
  },
  {
    role: "Graduate Engineer",
    company: "HCL Technologies",
    duration: "2024 - 2025",
    description:
      "Built frontend of GenAI-powered PV Intake App with Next.js & TS for US client.",
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
    <section  className="relative flex-1 flex justify-center">
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white z-20"
        style={{ scale: progress, opacity }}
      />

      <motion.div
        className={`absolute w-[2px] bg-white/40 ${
          isTop ? "top-[50%] h-16" : "bottom-[50%] h-16"
        }`}
        style={{ opacity }}
      />

      <motion.article
        className={`absolute ${
          isTop ? "top-[calc(50%+4rem)]" : "bottom-[calc(50%+4rem)]"
        } bg-gray-900/90 border border-gray-700 rounded-xl p-6 w-[320px]`}
        style={{ opacity, y }}
      >
        <h3 className="text-lg font-semibold">{exp.role}</h3>
        <p className="text-sm text-gray-400">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
      </motion.article>
    </section>
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
