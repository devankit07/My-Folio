import { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/logo1.png";
import { TfiMenu } from "react-icons/tfi";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const[forcevisible,setForceVisible]=useState(false);

  const lastscolly = useRef(0);
  const timeout =  useRef(null);


  useEffect(()=>{
    const homesection = document.querySelector('#Home');
    const observer = new IntersectionObserver(
      ([entry]) =>{
        if(entry.isIntersecting){
          setForceVisible(true)
          setVisible(true);
        }else{
          setForceVisible(false);
        }
      },{threshold:0.1}
    )
    if(homesection) observer.observe(homesection);
    return ()=>{
      if(homesection)observer.unobserve(homesection);
    }

  },[])

  useEffect(() => {
    const handleScroll = ()=>{
      if(forcevisible){
        setVisible(true);
        return
      }
      const currentScrollY = window.scrollY;
      if(currentScrollY>lastscolly.current){
        setVisible(false)
      }else{
        setVisible(true);

        if(timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(()=>{
          setVisible(false)
        },3000)
      }
      lastscolly.current =currentScrollY;
    }
    window.addEventListener("scroll",handleScroll,{passive:true});

    return()=>{
      window.removeEventListener("scroll",handleScroll)
      if(timeout.current) clearTimeout(timeout.current);
    }
  },[forcevisible])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-14 h-14" />
          
        </div>

        <div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-2xl focus:outline-none"
            aria-label="open menu"
          >
            <TfiMenu />
          </button>
        </div>

        <div className="hidden lg:block">
          <a
            href="#Contact"
            className="bg-linear-to-r from-[#7dd3fc] via-[#a78bfa] to-[#22d3ee] text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu isopen={menuOpen} onclose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
