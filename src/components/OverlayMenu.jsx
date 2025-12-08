import {motion,AnimatePresence} from "framer-motion";
import { FiX } from "react-icons/fi";

const OverlayMenu = ({ isopen, onclose }) => {
  const ismobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = ismobile ? "95% 8%" : "50% 8%";
  return (
    <AnimatePresence>
      {isopen && (
        <motion.div  className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={onclose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Project",
              "Experience",
              "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onclose}
                  className="relative text-white text-4xl font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0  after:w-0 after:h-[3px] after:bg-pink-400 after:transition-all after:duration-300  hover:after:w-full hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
