import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ArrowDown, ArrowUpRight, Instagram, Linkedin, Mail } from 'lucide-react';

// --- Types & Data ---

type Project = {
  id: number;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
  size: string;
};
const PROJECTS: Project[] = [{
  id: 1,
  title: "Void House",
  location: "Kyoto, Japan",
  year: "2023",
  category: "Residential",
  image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop",
  size: "240m²"
}, {
  id: 2,
  title: "Mono Tower",
  location: "Berlin, Germany",
  year: "2022",
  category: "Commercial",
  image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2400&auto=format&fit=crop",
  size: "12,500m²"
}, {
  id: 3,
  title: "Gallery X",
  location: "Copenhagen, Denmark",
  year: "2024",
  category: "Cultural",
  image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2400&auto=format&fit=crop",
  size: "1,200m²"
}, {
  id: 4,
  title: "Desert Pavilion",
  location: "Joshua Tree, USA",
  year: "2021",
  category: "Public",
  image: "https://images.unsplash.com/photo-1506126335919-80d23d11fca6?q=80&w=2400&auto=format&fit=crop",
  size: "450m²"
}, {
  id: 5,
  title: "Concrete Villa",
  location: "Zurich, Switzerland",
  year: "2023",
  category: "Residential",
  image: "https://images.unsplash.com/photo-1628611225249-6c0580a9324c?q=80&w=2400&auto=format&fit=crop",
  size: "680m²"
}, {
  id: 6,
  title: "Harbor Office",
  location: "Oslo, Norway",
  year: "2022",
  category: "Workspace",
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop",
  size: "3,400m²"
}];
const NEWS = [{
  id: 1,
  date: "OCT 24, 2024",
  title: "Minimalism in the Modern Age",
  category: "ESSAY"
}, {
  id: 2,
  date: "SEP 12, 2024",
  title: "Void House Wins ArchDaily Award",
  category: "AWARD"
}, {
  id: 3,
  date: "AUG 05, 2024",
  title: "Sustainable Concrete: A contradiction?",
  category: "RESEARCH"
}];

// --- Helper Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Projects", "Studio", "Journal", "Contact"];
  return <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-6 py-6 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
          <span className="font-bold text-lg tracking-tighter uppercase">Krono / Arch</span>
          <span className="text-xs tracking-widest opacity-60 mt-1">EST. 2018</span>
        </div>
        
        <button onClick={() => setIsOpen(true)} className="pointer-events-auto group flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest hidden md:block group-hover:tracking-[0.2em] transition-all duration-300">Menu</span>
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }} className="fixed inset-0 bg-zinc-950 z-[60] text-white flex flex-col">
            <div className="flex justify-between items-start px-6 py-6">
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tighter uppercase">Krono / Arch</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="group flex items-center gap-2 hover:text-zinc-400 transition-colors">
                <span className="text-xs uppercase tracking-widest hidden md:block">Close</span>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-24 lg:px-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
                <ul className="flex flex-col gap-4">
                  {navItems.map((item, i) => <motion.li key={item} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.5
              }}>
                      <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-5xl md:text-7xl font-light tracking-tighter hover:ml-4 transition-all duration-300 block group">
                        {item}
                        <span className="text-lg ml-2 opacity-0 group-hover:opacity-100 align-top text-zinc-500 transition-opacity">0{i + 1}</span>
                      </a>
                    </motion.li>)}
                </ul>
                
                <div className="hidden md:flex flex-col justify-end pb-4 text-zinc-500">
                  <p className="text-sm max-w-xs leading-relaxed">
                    We create spaces that embrace silence and light.
                    Architecture reduced to its essential elements.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-8 text-xs uppercase tracking-widest">
                    <div>
                      <p className="text-white mb-2">Tokyo</p>
                      <p>3-4-1 Marunouchi</p>
                      <p>Chiyoda-ku</p>
                    </div>
                    <div>
                      <p className="text-white mb-2">Socials</p>
                      <p className="hover:text-white cursor-pointer">Instagram</p>
                      <p className="hover:text-white cursor-pointer">LinkedIn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
const Hero = () => {
  const {
    scrollY
  } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  return <section className="relative h-screen w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
      <motion.div style={{
      y: y1
    }} className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1485628390555-1a7bd503f9fe?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20"></div>
      </motion.div>

      <div className="z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-end pb-24">
        <motion.div style={{
        opacity
      }} className="lg:col-span-8">
          <h1 className="text-[12vw] leading-[0.85] font-medium tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase mix-blend-overlay">
            Form <br /> Follows <br /> <span className="italic font-serif font-light">Silence</span>
          </h1>
        </motion.div>
        
        <motion.div style={{
        opacity
      }} className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
          <p className="text-sm md:text-base max-w-xs leading-relaxed text-zinc-600 dark:text-zinc-400 text-left lg:text-right mb-12">
            An international architecture practice exploring the intersection of minimalism, sustainability, and human experience.
          </p>
          <a href="#projects" className="group flex items-center gap-4 text-xs uppercase tracking-widest border border-zinc-900 dark:border-zinc-100 px-6 py-3 text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-colors duration-300">
            Explore Projects
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>;
};
const ProjectList = () => {
  return <section id="projects" className="py-32 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-20 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Selected Works</h2>
          <span className="text-xs tracking-widest hidden md:block">2018 — 2024</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
          {PROJECTS.map((project, index) => <div key={project.id} className={`group flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}>
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-zinc-100">
                <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500 z-10"></div>
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              </div>
              
              <div className="flex justify-between items-start border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight mb-1">{project.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.location}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm">{project.year}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.category}</p>
                </div>
              </div>
            </div>)}
        </div>

        <div className="mt-32 flex justify-center">
          <button className="group flex items-center gap-3 text-sm uppercase tracking-widest hover:text-zinc-500 transition-colors">
            All Projects
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>;
};
const Philosophy = () => {
  return <section id="studio" className="py-32 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
             <h2 className="text-xs font-bold uppercase tracking-widest mb-8 sticky top-32">The Studio</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-12">
              We believe architecture is not just about building structures, but about framing life itself. Our approach subtracts the unnecessary to reveal the essential.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>
                Founded in 2018, Krono/Arch has established a reputation for rigor and refinement. We work across scales, from private residences to large public institutions, always with the same attention to detail and materiality.
              </p>
              <p>
                Our process is iterative and collaborative. We work closely with clients, engineers, and craftspeople to create spaces that endure. We prioritize natural materials that age gracefully, creating buildings that become part of their landscape.
              </p>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-300 dark:border-zinc-700 pt-8">
              {[{
              label: "Founded",
              value: "2018"
            }, {
              label: "Projects",
              value: "42+"
            }, {
              label: "Awards",
              value: "15"
            }, {
              label: "Team",
              value: "12"
            }].map(stat => <div key={stat.label}>
                  <span className="block text-3xl font-medium mb-1">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-zinc-500">{stat.label}</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
const Journal = () => {
  return <section id="journal" className="py-32 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Journal</h2>
          <a href="#" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest hover:text-zinc-500 transition-colors">
            Read Archive <ArrowRight size={14} />
          </a>
        </div>

        <div className="flex flex-col">
          {NEWS.map(item => <a key={item.id} href="#" className="group py-10 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <div className="md:col-span-2 text-xs tracking-widest text-zinc-500">{item.date}</div>
              <div className="md:col-span-8 text-2xl md:text-4xl font-light tracking-tight group-hover:pl-4 transition-all duration-300">{item.title}</div>
              <div className="md:col-span-2 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-none">{item.category}</span>
                <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>)}
          <div className="w-full border-b border-zinc-200 dark:border-zinc-800"></div>
        </div>
      </div>
    </section>;
};
const Footer = () => {
  return <footer id="contact" className="bg-zinc-950 text-white pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          <div className="flex flex-col gap-8">
             <h3 className="text-2xl font-medium tracking-tight">Let's build something meaningful together.</h3>
             <a href="mailto:hello@kronoarch.com" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors text-lg">
               <Mail size={20} />
               hello@kronoarch.com
             </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Tokyo Office</h4>
            <p className="text-sm leading-relaxed text-zinc-300">
              3-4-1 Marunouchi<br />
              Chiyoda-ku, Tokyo<br />
              100-0005, Japan
            </p>
            <p className="text-sm text-zinc-400">+81 3 1234 5678</p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Berlin Office</h4>
            <p className="text-sm leading-relaxed text-zinc-300">
              Torstraße 120<br />
              10119 Berlin<br />
              Germany
            </p>
            <p className="text-sm text-zinc-400">+49 30 9876 5432</p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Social</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                <Instagram size={16} /> Instagram
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-zinc-800 pt-8">
          <div className="mb-8 md:mb-0">
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-zinc-900 uppercase select-none pointer-events-none">
              Krono
            </h1>
          </div>
          <div className="flex gap-8 text-xs text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Imprint</a>
            <span>© 2024 Krono/Arch</span>
          </div>
        </div>
      </div>
    </footer>;
};
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    const handleLinkHover = () => setIsHoveringLink(true);
    const handleLinkLeave = () => setIsHoveringLink(false);
    window.addEventListener('mousemove', moveCursor);
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  return <div ref={cursorRef} className={`fixed top-0 left-0 w-4 h-4 bg-black dark:bg-white rounded-none pointer-events-none z-[100] mix-blend-difference transition-[width,height,opacity] duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:block
        ${isHoveringLink ? 'w-8 h-8 opacity-50' : 'opacity-100'}
      `} />;
};

// @component: ArchitectureWebsite
export const ArchitectureWebsite = () => {
  // @return
  return <div className="font-sans bg-white dark:bg-zinc-950 text-black dark:text-zinc-50 min-h-screen w-full selection:bg-zinc-200 selection:text-black dark:selection:bg-zinc-800 dark:selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <ProjectList />
        <Philosophy />
        <Journal />
      </main>
      <Footer />
    </div>;
};
