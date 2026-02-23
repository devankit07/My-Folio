import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = ({ targetRef }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef?.current) {
        const el = targetRef.current;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const scrolled = window.scrollY || window.pageYOffset;
        // show when we've scrolled past the home section (its bottom has passed the top of viewport)
        if (scrolled >= top + height - window.innerHeight) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
            className="fixed bottom-8 right-8 text-white p-4 rounded-full shadow-lg z-50 transform animate-drop transition-transform duration-500 
             bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"

        >
          <FaArrowUp />
        </button>
      )}

      <style>{`
        .animate-drop {
          animation: drop 0.5s ease-out forwards;
        }
        @keyframes drop {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton;
