import { useMemo, useEffect, useState } from "react";
import ParticalBackground from "../components/ParticalBackground";
import { delay, motion } from "framer-motion";

const Home = () => {
  const roles = useMemo(
    () => [
      "Software Developer",
      "MERN Stack Developer",
      "Full Stack Developer",
      "React Developer",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [subindex, setSubindex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(
      () => {
        if (!deleting && subindex < current.length) {
          setSubindex((v) => v + 1);
        } else if (!deleting && subindex === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else if (deleting && subindex > 0) {
          setSubindex((v) => v - 1);
        } else if (deleting && subindex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 45 : 65
    );

    return () => clearTimeout(timeout);
  }, [subindex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticalBackground />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -top-32 -left-32
            w-[70vw] sm:w-[50vw] md:w-[40vw]
            h-[70vw] sm:h-[50vw] md:h-[40vw]
            max-w-[500px] max-h-[500px]
            rounded-full
            bg-linear-to-r from-[#000428] via-[#004e92] to-[#00c6ff]
            opacity-30 mix-blend-screen
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute bottom-0 right-0
            w-[70vw] sm:w-[50vw] md:w-[40vw]
            h-[70vw] sm:h-[50vw] md:h-[40vw]
            max-w-[500px] max-h-[500px]
            rounded-full
            bg-linear-to-r from-[#000428] via-[#004e92] to-[#00c6ff]
            opacity-40 mix-blend-screen
            blur-[140px]
            animate-pulse [animation-delay:500ms]
          "
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            {/* ROLE TYPING */}
            <motion.div
              className="mb-4 text-2xl md:text-3xl lg:text-4xl font-semibold
        text-transparent bg-clip-text
        bg-linear-to-r from-[#9efcff] via-[#a78bfa] to-[#22d3ee]
        min-h-[1.6em]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>{roles[index].substring(0, subindex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* NAME */}
            <motion.h1
              className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="block text-gray-300">Hello, I'm</span>

              <span
                className="
          relative inline-block
          text-transparent bg-clip-text
          bg-linear-to-r from-[#7dd3fc] via-[#a78bfa] to-[#22d3ee]
          drop-shadow-[0_0_25px_rgba(120,200,255,0.35)]
        "
              >
                Ankit Rathor
                <span
                  className="absolute -bottom-2 left-0 w-full h-[3px] 
          bg-linear-to-r from-transparent via-[#7dd3fc] to-transparent
          opacity-70"
                ></span>
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Full Stack Developer specializing in the MERN stack, building
              scalable, high-performance, and user-focused web applications.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <a
                href="#project"
                className="
          px-7 py-3 rounded-full text-lg font-medium text-white
          bg-linear-to-r from-[#7dd3fc] via-[#a78bfa] to-[#22d3ee]
          shadow-[0_0_30px_rgba(120,200,255,0.35)]
          hover:scale-105 hover:shadow-[0_0_45px_rgba(120,200,255,0.6)]
          transition-all
        "
              >
                View Work
              </a>

              <a
                href="/Resume.pdf"
                download
                className="
          px-7 py-3 rounded-full text-lg font-medium
          text-white border border-white/20
          bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:scale-105
          transition-all
        "
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
