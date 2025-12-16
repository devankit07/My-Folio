import  { useMemo, useEffect, useState } from "react";
import ParticalBackground from "../components/ParticalBackground";
import { motion } from "framer-motion";


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

    const timeout = setTimeout(() => {
      if (!deleting && subindex < current.length) {
        setSubindex(v => v + 1);
      } 
      else if (!deleting && subindex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } 
      else if (deleting && subindex > 0) {
        setSubindex(v => v - 1);
      } 
      else if (deleting && subindex === 0) {
        setDeleting(false);
        setIndex(p => (p + 1) % roles.length);
      }
    }, deleting ? 45 : 65);

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

      {/* content */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left">
          <div className="w-full lg:pr-24 mx-auto max-w[48rem]">
            <motion.div
              className="mb-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subindex)}</span>
              <span
                className="inline-block w-2px ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            <h1>Hello I'm  <br /><span className="font-bold text-white  text-3xl sm:text-4xl md:text-5xl lg:text-7xl lg:whitespace-nowrap ">Ankit Rathor</span></h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
