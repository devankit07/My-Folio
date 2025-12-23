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

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="pointer-events-none inset-0 absolute bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]"/>
      <div className="pointer-events-none inset-0 absolute bg-[radial-gradient(50%_65%_at_30%_70%,rgba(16,185,129,0.3),transparent_65%)]"/>

      <motion.div
        className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="font-semibold leading-none text-white text-center select-none"
          style={{
            fontSize: "clamp(3rem,5vw,14rem)",
            letterSpacing: "0.02",
            lineHeight: "0 3vw",
            whiteSpace: "nowrap",
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          Ankit Rathor
        </h1>
        <div className="h-[3px] w-25 md-w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400" />
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              href={href}
              key={label}
              aria-label={label}
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <p className="text-gray-300 italic max-w-xl">
          ""Errors teach you a lesson, bugs build your skill." 🛠️"
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Ankit Rathor. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
