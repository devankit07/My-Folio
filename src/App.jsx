import Navbar from './components/Navbar.jsx'
import Home from './sections/Home.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Project from './sections/Project.jsx'
import Experience from './sections/Experience.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import CustomCursor from './components/CustomCurso.jsx'
import React from 'react'
import IntroAnimation from './components/IntroAnimation.jsx'

const App = () => {
  const[introDone,setIntroDone]= React.useState(false);
  return (
    <>
    {!introDone && <IntroAnimation onFinish={()=> setIntroDone(true)} />}

      {introDone && (


    <div className='relative gradient text-white'>
      <CustomCursor />
  

      <Navbar />
      <Home/>
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
  )
}

export default App
