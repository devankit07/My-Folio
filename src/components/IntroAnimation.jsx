import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Welcome",
      "Willkommen",
      "Benvenuto",
      "ようこそ",
      "欢迎",
      "환영합니다",
      "أهلاً وسهلاً",
      "स्वागत है",
      "Bienvenue",
      "Bienvenido",
      "Добро пожаловать",
      "स्वागतम्",
      "Namaste",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => setIndex((i) => i + 1), 250);
      return () => clearTimeout(id);
    } else {
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
