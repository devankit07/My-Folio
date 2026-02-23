import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const directions = ["left", "right", "top", "bottom"];

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Welcome",
      "स्वागतम्",
      "Namaste",
      "स्वागत है",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const startTimeoutRef = useRef(null);
  const tlRef = useRef(null);
  // portfolio-themed background: deep navy with left teal -> purple highlight and right cyan glow
  const bgStyle = {
    background:
      "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.08) 0%, transparent 18%), radial-gradient(circle at 78% 60%, rgba(56,189,248,0.06) 0%, transparent 22%), linear-gradient(90deg, #040714 0%, #081026 40%, #071523 100%)",
    backgroundBlendMode: "overlay, overlay, normal",
  };

  // Helper to split text into characters (we'll query DOM for these nodes in effects)
  function splitChars(text) {
    return text.split("").map((ch, i) => (
      <span key={`${ch}-${i}`} className="inline-block opacity-0 intro-char" aria-hidden={false}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));
  }

  useEffect(() => {
    // create timeline for each greeting change
    if (!visible) return;
    const word = greetings[index] || "";
    const dir = directions[index % directions.length];
    // query characters from the rendered DOM
    const chars = containerRef.current ? Array.from(containerRef.current.querySelectorAll(".intro-char")) : [];

    // kill previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const fromVars = { opacity: 0 };
    // faster per-char animation to keep overall intro short (~2-3s)
    const toVars = { x: 0, y: 0, opacity: 1, ease: "power3.out", duration: 0.18 };

    // set from based on direction
    switch (dir) {
      case "left":
        fromVars.x = -40;
        break;
      case "right":
        fromVars.x = 40;
        break;
      case "top":
        fromVars.y = -30;
        break;
      case "bottom":
      default:
        fromVars.y = 30;
        break;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // after showing word, hold then animate out
        const hold = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            // animate out
            const outDir = dir === "left" ? -80 : dir === "right" ? 80 : dir === "top" ? -60 : 60;
            const outVars = dir === "left" || dir === "right" ? { x: outDir, opacity: 0 } : { y: outDir, opacity: 0 };
            gsap.to(chars, { ...outVars, stagger: 0.01, duration: 0.18, ease: "power2.in" }).then(() => {
              if (index < greetings.length - 1) {
                setIndex((i) => i + 1);
              } else {
                // final exit: slide overlay up and call onFinish
                gsap.to(containerRef.current, {
                  yPercent: -120,
                  duration: 0.5,
                  ease: "power3.inOut",
                  onComplete: () => {
                    setVisible(false);
                    if (typeof onFinish === "function") onFinish();
                  },
                });
              }
            });
          },
        });
        hold.to({}, { duration: 0.15 });
      },
    });

    // initial set to ensure predictable layout
    gsap.set(chars, { x: 0, y: 0, opacity: 0 });
    tl.fromTo(chars, fromVars, { ...toVars, stagger: 0.02 });
    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [index, visible, greetings, onFinish]);

  // safety: if user wants to skip intro externally
  useEffect(() => {
    if (!visible) {
      if (typeof onFinish === "function") onFinish();
    }
  }, [visible, onFinish]);
  // Force-complete the intro if it takes too long (keep it within ~2.5s)
  useEffect(() => {
    const MAX_INTRO_MS = 2500;
    if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
    startTimeoutRef.current = setTimeout(() => {
      if (visible) {
        // fast hide
        if (containerRef.current) {
          gsap.killTweensOf(containerRef.current);
          gsap.to(containerRef.current, {
            yPercent: -120,
            duration: 0.35,
            ease: "power3.inOut",
            onComplete: () => {
              setVisible(false);
              if (typeof onFinish === "function") onFinish();
            },
          });
        } else {
          setVisible(false);
          if (typeof onFinish === "function") onFinish();
        }
      }
    }, MAX_INTRO_MS);

    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={bgStyle}
      className="fixed inset-0 z-50 flex items-center justify-center text-white overflow-hidden"
      role="dialog"
      aria-label="Intro animation"
    >
      <div className="px-6 py-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight select-none">
          {splitChars(greetings[index])}
        </h1>
        <p className="mt-6 text-sm md:text-base text-neutral-300">
          Designer & Developer — crafting immersive web experiences
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
