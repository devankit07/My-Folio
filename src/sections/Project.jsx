import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const useMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setMobile(e.matches);

    mql.addEventListener("change", handler);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobile(mql.matches);

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

const Project = () => {
  const isMobile = useMobile();
  const sceneRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(
    () => [
      {
        title: "Work-Hire",
        link: "https://work-hire.vercel.app/",
        bgColor: "#0d4d3d",
        image: isMobile ? "/images/photo1.png" : "/images/img1.png",
      },
      {
        title: "Mini Mac-OS",
        link: "https://mac-os-gold.vercel.app/",
        bgColor: "#3884d3",
        image: isMobile ? "/images/photo2.png" : "/images/img2.png",
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? "/images/photo3.png" : "/images/img3.jpg",
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];
  // scroll helper to move to a particular project index
  const scrollToIndex = (index) => {
    if (!sceneRef.current) return;
    const top = sceneRef.current.offsetTop + index * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Keyboard navigation (accessible)
  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        const next = Math.min(projects.length - 1, activeIndex + 1);
        scrollToIndex(next);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        const prev = Math.max(0, activeIndex - 1);
        scrollToIndex(prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, projects.length]);

  // Swipe handling for mobile
  useEffect(() => {
    if (!sceneRef.current) return;
    let startY = 0;
    const onTouchStart = (e) => {
      startY = e.touches ? e.touches[0].clientY : e.clientY;
    };
    const onTouchEnd = (e) => {
      const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      const diff = endY - startY;
      if (Math.abs(diff) < 40) return;
      if (diff < 0) {
        // swipe up
        const next = Math.min(projects.length - 1, activeIndex + 1);
        scrollToIndex(next);
      } else {
        const prev = Math.max(0, activeIndex - 1);
        scrollToIndex(prev);
      }
    };
    const el = sceneRef.current;
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeIndex, projects.length]);

  return (
    <section
      id="project"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work
        </h2>

        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={project.title}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                  isActive ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
                }`}
                style={{ width: "85%", maxWidth: "1200px" }}
              >
                <AnimatePresence mode="wait">
                  {isActive && (
                    <>
                      <motion.h3
                        key={project.title}
                        initial={{ opacity: 0, y: -28, rotate: -1 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`text-white/95 italic font-semibold ${
                          isMobile
                            ? "text-center text-3xl mb-4"
                            : "absolute -top-20 left-[-5%] text-5xl"
                        }`}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.div
                        key={`${project.title}-card`}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`relative w-full overflow-hidden bg-black/20 shadow-2xl ${
                          isMobile ? "mb-6 rounded-lg" : "mb-12 rounded-xl"
                        } h-[62vh] sm:h-[66vh]`}
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          initial={{ scale: 1.02 }}
                          animate={{ scale: [1.02, 1, 1.01] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                          }}
                        />

                        {/* info card bottom-left */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 }}
                          className="absolute left-6 bottom-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md text-sm text-white"
                        >
                          <div className="font-semibold">{project.title}</div>
                          <div className="text-xs text-gray-200/90">{project.link.replace(/^https?:\/\//, "")}</div>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Navigation dots (right side) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                activeIndex === i ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className={`absolute ${isMobile ? "bottom-10" : "bottom-10"}`}>
          <a
            href={activeProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-300 transition-all "
            aria-label={`View ${activeProject.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Project;
