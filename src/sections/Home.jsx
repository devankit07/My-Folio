import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ParticalBackground from "../components/ParticalBackground";


const socials = [
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ankit-rathore-98208436a/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/devankit07",
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 transparent)" },
  hover: {
    scale: 1.15,
    y: -4,
    filter:
      "drop-shadow(0 0 10px rgba(125,211,252,0.9)) drop-shadow(0 0 24px rgba(167,139,250,0.8))",
  },
  tap: { scale: 0.95 },
};

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
    let delay = deleting ? 45 : 65;

    if (!deleting && subindex === current.length) delay = 1200;

    const timeout = setTimeout(() => {
      if (!deleting && subindex < current.length) {
        setSubindex((v) => v + 1);
      } else if (!deleting && subindex === current.length) {
        setDeleting(true);
      } else if (deleting && subindex > 0) {
        setSubindex((v) => v - 1);
      } else {
        setDeleting(false);
        setIndex((v) => (v + 1) % roles.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [subindex, deleting, index, roles]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <ParticalBackground />
      <div className="absolute inset-0 overflow-hidden ">
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-linear-to-r from-[#000428] via-[#004e92] to-[#00c6ff] opacity-30 mix-blend-screen blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-linear-to-r from-[#000428] via-[#004e92] to-[#00c6ff] opacity-40 mix-blend-screen blur-[140px] animate-pulse [animation-delay:500ms]" />
      </div>
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <div className="max-w-48rem">
            <motion.div
              className="mb-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#9efcff] via-[#a78bfa] to-[#22d3ee]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {roles[index].substring(0, subindex)}
              <span className="inline-block w-0.5 h-[1em] ml-1 bg-white animate-pulse" />
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <span className="block text-gray-400">Hello, I’m</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7dd3fc] via-[#a78bfa] to-[#22d3ee]">
                Ankit Rathor
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer specializing in the MERN stack, building
              scalable and user-focused web applications.
            </motion.p>
            <motion.div
              className="mt-10 flex gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="#project"
                className="px-7 py-3 rounded-full text-lg font-medium text-white bg-linear-to-r from-[#7dd3fc] via-[#a78bfa] to-[#22d3ee] hover:scale-105 transition"
              >
                View Work
              </a>
              <a
                href="/dashrath.resume.pdf"
                download
                className="px-7 py-3 rounded-full text-lg font-medium text-white bg-white/10 border border-white/20 hover:scale-105 transition"
              >
                Download Resume
              </a>
            </motion.div>
            <div className="mt-8 flex gap-6 justify-center lg:justify-start text-3xl">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <motion.img
            src="/images/avator.png"
            alt="Ankit Rathor"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none drop-shadow-[0_0_35px_rgba(125,211,252,0.35)]"
            style={{
              right: "15px",
              width: "min(45vw,780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
