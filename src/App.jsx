import React, { useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Project from './sections/Project.jsx';
import Experience from './sections/Experience.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import CustomCursor from './components/CustomCurso.jsx';
import IntroAnimation from './components/IntroAnimation.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';

const App = () => {
  const [introDone, setIntroDone] = React.useState(false);
  const homeRef = useRef(null); // ← Home section ref

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          <Navbar />
          <Home homeRef={homeRef} /> 
          <ScrollToTopButton targetRef={homeRef} /> 
          <About />
          <Skills />
          <Project />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
