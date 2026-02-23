import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, when: "beforeChildren", duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Animated floating gradients (subtle ambient motion) */}
      <motion.div
        aria-hidden
        className="absolute -left-16 -top-10 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-cyan-300 opacity-30 blur-3xl pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 -bottom-8 w-80 h-80 rounded-full bg-gradient-to-bl from-emerald-400 via-lime-300 to-cyan-400 opacity-25 blur-3xl pointer-events-none"
        animate={{ rotate: -360, scale: [1, 1.03, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ zIndex: 0 }}
      />

      <motion.div
        className="relative z-20 px-6 sm:px-8 lg:px-10 py-14 md:py-20 flex flex-col items-center text-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={itemVariants}
          className="font-semibold leading-tight text-white text-center select-none"
          style={{
            fontSize: "clamp(1.8rem,4.2vw,3.4rem)",
            letterSpacing: "0.02em",
            lineHeight: 1.02,
            textShadow: "0 8px 30px rgba(0,0,0,0.55)",
          }}
        >
          Ankit Rathor
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="h-1 w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"
        />

        <motion.div
          variants={itemVariants}
          className="flex gap-6 text-2xl md:text-3xl items-center"
        >
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              href={href}
              key={label}
              aria-label={label}
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.12,
                y: -4,
                boxShadow: "0 6px 20px rgba(99,102,241,0.14), 0 0 30px rgba(56,189,248,0.06)",
              }}
              whileTap={{ scale: 0.96 }}
              className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center p-2 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 italic max-w-xl px-2"
          style={{ fontSize: "clamp(0.9rem,1.6vw,1rem)" }}
        >
          "Errors teach you a lesson, bugs build your skill."
        </motion.p>

        <motion.p variants={itemVariants} className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Ankit Rathor. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;
