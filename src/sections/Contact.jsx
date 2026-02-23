import { useState } from "react";
import ParticalBackground from "../components/ParticalBackground";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DeveloperDesk from "../components/DeveloperDesk";
import { OrbitControls, Environment } from "@react-three/drei";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

function CanvasArea() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.6, 3.2], fov: 35 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 2]} intensity={0.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
        <DeveloperDesk position={[0, -0.2, 0]} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3.5} />
    </Canvas>
  );
}


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
  const [copied, setCopied] = useState(false);

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
      id="contact"
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
          <div className="w-72 md:w-140 rounded-2xl shadow-lg overflow-hidden" style={{ height: 420 }}>
            <CanvasArea />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-3xl mb-4 font-bold">Let's Work Together</h2>

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
          </div>

          {/* Right info column (email only) */}
          <aside className="w-44 md:w-56 flex-shrink-0 bg-gradient-to-br from-blue-900/30 to-black/20 rounded-xl p-4 flex flex-col gap-4 items-start justify-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="inline-block w-3 h-3 rounded-full bg-teal-300 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-white/70">Email</p>
                <p className="text-sm font-medium break-all">ankitrathor272005@gmail.com</p>
              </div>
            </div>

            <div className="mt-1 w-full">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText("ankitrathor272005@gmail.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    setCopied(false);
                  }
                }}
                className="w-full bg-white/5 hover:bg-white/10 text-sm text-white py-2 rounded-md transition"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>

            <div className="text-xs text-white/60">
              <p>Available for freelance & remote work.</p>
            </div>
          </aside>
        </div>
        </motion.div>
      </div>
      
    </section>
    
  );
};

export default Contact;
