import m1 from "../assets/m1.png";
import w1 from "../assets/w1.png";
import m2 from "../assets/m2.png";
import w2 from "../assets/w2.png";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    review:
      "Working with Ankit was a great experience. Clean UI, smooth animations, and solid code quality.",
    img: m1,
  },
  {
    name: "Sneha Verma",
    role: "UI/UX Designer",
    review:
      "Very detail-oriented developer. Understands design systems well and delivers pixel-perfect results.",
    img: w1,
  },
  {
    name: "Aman Gupta",
    role: "Startup Founder",
    review:
      "Ankit built our website exactly as we envisioned. Performance and responsiveness were top-notch.",
    img: m2,
  },
  {
    name: "Neha Singh",
    role: "Product Manager",
    review:
      "Professional, reliable, and quick to iterate. Communication and execution were excellent.",
    img: w2,
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-between px-6 py-20"
    >
      <motion.h2
        className="text-4xl font-bold mb-16"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        What Our Clients Say
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl w-full">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transition duration-500 hover:scale-105 hover:rotate-1"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
              loading="lazy"
            />
            <p className="text-gray-300 italic mb-4">{t.review}</p>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-400">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
