import { useState } from "react";
import ParticalBackground from "../components/ParticalBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";

const SERVICEID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATEID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLICKEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [error, seterror] = useState({});
  const [status, setstatus] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d*$/.test(value)) return;
    setformdata((p) => ({ ...p, [name]: value }));
    if (error[name]) seterror((p) => ({ ...p, [name]: "" }));
  };

  const validateform = () => {
    const newerror = {};
    ["name", "email", "service", "idea"].forEach((f) => {
      if (!formdata[f].trim()) newerror[f] = "fill this field";
    });
    if (formdata.service !== "other" && !formdata.budget.trim())
      newerror.budget = "fill this field";
    seterror(newerror);
    return !Object.keys(newerror).length;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateform()) return;
    setstatus("sending");
    try {
      await emailjs.send(
  SERVICEID,
  TEMPLATEID,
  { ...formdata, from_name: formdata.name, reply_to: formdata.email },
  PUBLICKEY
);

      setstatus("success");
      setformdata({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (err) {
      console.log("Emailjs Error", err);
      setstatus("error");
    }
  };

  return (
    <section
      id="Contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticalBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-white/5 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl mb-6 font-bold">Let's Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
            <div className="flex flex-col">
              <label className="mb-1">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handlechange}
                className={`p-3 rounded-md bg-white/10 ${
                  error.name ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {error.name && (
                <p className="text-red-500 text-xs">{error.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">
                Your Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handlechange}
                className={`p-3 rounded-md bg-white/10 ${
                  error.email ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {error.email && (
                <p className="text-red-500 text-xs">{error.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">
                Service Interested In <span className="text-red-600">*</span>
              </label>
              <select
                name="service"
                value={formdata.service}
                onChange={handlechange}
                className={`p-3 rounded-md bg-white/10 ${
                  error.service ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="Full Stack development" className="text-black">
                  Full Stack Development
                </option>
                <option value="Frontend Development" className="text-black">
                  Frontend Development
                </option>
                <option value="Backend Development" className="text-black">
                  Backend Development
                </option>
                <option value="other" className="text-black">
                  Other
                </option>
              </select>
              {error.service && (
                <p className="text-red-500 text-xs">{error.service}</p>
              )}
            </div>

            {formdata.service && formdata.service !== "other" && (
              <div className="flex flex-col">
                <label className="mb-1">
                  Budget <span className="text-red-600"></span>
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Your Budget"
                  onChange={handlechange}
                  value={formdata.budget}
                  className={`p-3 rounded-md bg-white/10 ${
                    error.budget ? "border-red-500" : "border-gray-500"
                  } text-white focus:outline-none focus:border-blue-500`}
                />
                {error.budget && (
                  <p className="text-red-500 text-xs">{error.budget}</p>
                )}
              </div>
            )}

            <div className="flex flex-col">
              <label className="mb-1">
                Your Idea <span className="text-red-600"></span>
              </label>
              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your Idea"
                value={formdata.idea}
                onChange={handlechange}
                className={`p-3 rounded-md bg-white/10 ${
                  error.idea ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              ></textarea>
              {error.idea && (
                <p className="text-red-500 text-xs">{error.idea}</p>
              )}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-500"
                    : status === "error"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {status === "sending"
                  ? "sending..."
                  : status === "success"
                  ? "message sent successfully✅"
                  : "something went wrong❌"}
              </p>
            )}

            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60 font-bold py-3 px-6 rounded-md transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
      
    </section>
    
  );
};

export default Contact;
