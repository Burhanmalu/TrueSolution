'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Menu, X, ArrowRight, ExternalLink, Github, Linkedin,
  Mail, Phone, MapPin, CheckCircle, Globe, Smartphone,
  Code2, Palette, Zap, Cloud, Headphones, ChevronLeft,
  ChevronRight, Star, Send, Building2, Layers,
  Shield, TrendingUp, Users, Award, Clock, HelpCircle,
  Play, Check, CheckSquare
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
//  Types & Data Structures
// ─────────────────────────────────────────────────────────
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  demoUrl: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  skills: string[];
  desc: string;
  linkedin: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────────────────
//  Mock & Structural Data
// ─────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    icon: <Globe size={26} />,
    title: 'Web Development',
    description: 'Enterprise-grade, blazing-fast web applications built on modern frameworks like React, Next.js, and TypeScript, optimized for conversion and scale.',
    color: '#C9A96E'
  },
  {
    icon: <Smartphone size={26} />,
    title: 'Mobile Apps',
    description: 'Bespoke native and cross-platform mobile apps for iOS and Android, engineered with high-performance engines and delightful micro-interactions.',
    color: '#E8D5B0'
  },
  {
    icon: <Layers size={26} />,
    title: 'SaaS Development',
    description: 'Multi-tenant cloud architecture, automated subscription systems, and highly scalable databases designed for fast-growing software products.',
    color: '#C9A96E'
  },
  {
    icon: <Zap size={26} />,
    title: 'AI Solutions',
    description: 'Custom machine learning models, intelligent recommendation engines, automation agents, and natural language processing pipelines.',
    color: '#E8D5B0'
  },
  {
    icon: <Palette size={26} />,
    title: 'UI/UX Design',
    description: 'Luxury-tier, editorial user experiences built on rigorous user research, wireframing, and custom design systems matching your exact brand DNA.',
    color: '#C9A96E'
  },
  {
    icon: <Cloud size={26} />,
    title: 'Cloud Solutions',
    description: 'High-availability infrastructure configurations, Amazon Web Services hosting, custom DevOps pipelines, and Docker/Kubernetes container orchestration.',
    color: '#E8D5B0'
  }
];

const WHY_CHOOSE = [
  { title: 'Custom Software Expertise', desc: 'Bespoke systems built from scratch to match your unique operations, avoiding cookie-cutter structures.' },
  { title: 'Agile Development', desc: 'Continuous deployment, regular iteration schedules, and clear sprint reviews that keep you fully in control.' },
  { title: 'Dedicated Team', desc: 'Senior engineers, certified product architects, and world-class designers assigned exclusively to your product.' },
  { title: 'Fast Delivery', desc: 'Optimized developer velocity and automated pipelines that ship production-grade code to market ahead of deadlines.' },
  { title: 'Long-Term Support', desc: 'Round-the-clock systems monitoring, proactive code audits, performance tuning, and scaling support.' },
  { title: 'Scalable Solutions', desc: 'Infrastructure systems designed modularly, prepared to seamlessly absorb millions of active transactions.' }
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'NexaFlow SaaS Analytics Platform',
    category: 'SaaS & Enterprise',
    image: '/project-1.png',
    problem: 'The client faced heavy performance bottlenecks and high database latency when processing real-time subscription analytics for over 100,000 active users.',
    solution: 'We engineered a Next.js frontend paired with an optimized Go backend, using Redis cache clustering and partition postgres configurations.',
    tech: ['Next.js', 'Go', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    impact: 'Reduced database queries response latency by 72% and saved the client over $18,000 in monthly database hosting bills.',
    demoUrl: '#'
  },
  {
    id: 2,
    title: 'Equinox Personal Banking App',
    category: 'Fintech Mobile',
    image: '/project-2.png',
    problem: 'A personal banking startup required a premium cross-platform app featuring bio-metric authentication, high security, and instant global ledger updates.',
    solution: 'We built a React Native app utilizing secure hardware encryption hooks, integrated with AWS serverless backend transaction systems.',
    tech: ['React Native', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Framer Motion'],
    impact: 'Successfully passed rigorous security audits and achieved over 50,000 active app downloads within the first three months of launch.',
    demoUrl: '#'
  },
  {
    id: 3,
    title: 'ApexCare AI Health Agent',
    category: 'Healthcare AI',
    image: '/project-3.png',
    problem: 'Healthcare providers suffered from high support overhead, wasting hours daily answering repetitive patient pre-screening questions manually.',
    solution: 'We trained and integrated a secure OpenAI pre-screening agent with HIPAA-compliant data routing, embedded into a beautiful web portal.',
    tech: ['Next.js', 'Python', 'OpenAI API', 'FastAPI', 'PostgreSQL'],
    impact: 'Automated 84% of initial patient pre-screen queries, saving clinics an average of 45 hours per week of nurse administrative labor.',
    demoUrl: '#'
  }
];

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'Amir Hassan',
    role: 'Founder & Chief Technology Officer',
    image: '/team-1.png',
    skills: ['System Architecture', 'Next.js', 'Go', 'AI Engineering'],
    desc: 'Ex-Senior Systems Architect with a passion for engineering ultra-fast, world-class enterprise applications.',
    linkedin: '#'
  },
  {
    id: 2,
    name: 'Sarah Ahmed',
    role: 'Lead UI Architect & Frontend Specialist',
    image: '/team-2.png',
    skills: ['Figma', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    desc: 'Award-winning interactive designer dedicated to translating complex business requirements into sleek web visual experiences.',
    linkedin: '#'
  },
  {
    id: 3,
    name: 'Usman Malik',
    role: 'Lead Cloud & DevOps Engineer',
    image: '/team-3.png',
    skills: ['AWS', 'Docker', 'CI/CD Pipelines', 'Kubernetes'],
    desc: 'DevOps professional focused on setting up highly secure, auto-scaling, HIPAA-compliant hosting infrastructures.',
    linkedin: '#'
  }
];

const FAQS: FAQItem[] = [
  {
    question: 'How do you estimate custom software development budgets?',
    answer: 'We conduct a detailed, complimentary scoping phase where we break down your goals, wireframes, and technical specifications. You receive a comprehensive document outlining precise sprints, line-item budgets, and milestones with zero hidden fees.'
  },
  {
    question: 'Do we own the full intellectual property (IP) of the software?',
    answer: 'Absolutely. Once milestones are completed and invoiced, 100% of the proprietary source code, IP rights, deployment setups, and assets are legally transferred directly to your organization.'
  },
  {
    question: 'How do you ensure enterprise-grade security?',
    answer: 'We build security into the initial application architecture from day one. We use secure OAuth systems, strict data encryption at rest and in transit, OWASP security scanning, and run rigorous automated audits to ensure defense against common vulnerabilities.'
  },
  {
    question: 'What is your communication schedule during developers sprints?',
    answer: 'We schedule weekly live demo reviews where you see active software progress. Additionally, we provide staging URLs updated continuously, and assign a dedicated Product Manager available daily on Slack for quick responses.'
  },
  {
    question: 'Can you scale the software architecture later as we grow?',
    answer: 'Yes. We compile clean, modular, and fully documented codebases using serverless infrastructure models or Docker container grids. This ensures you can scale horizontally to handle millions of active users without needing code rewrites.'
  }
];

// ─────────────────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

// ─────────────────────────────────────────────────────────
//  Counter Component
// ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────
//  Navigation Component
// ─────────────────────────────────────────────────────────
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-choose' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Team', href: '#team' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[85px]">
          {/* Monogram Monolith Badge */}
          <a href="#hero" className="flex items-center gap-3.5 group text-decoration-none">
            <div className="w-[38px] h-[38px] rounded-lg border border-[#C9A96E] flex items-center justify-center relative overflow-hidden bg-transparent shadow-[0_0_15px_rgba(201,169,110,0.1)]">
              <span className="text-[#C9A96E] font-serif font-bold text-lg z-10">TS</span>
              <div className="absolute inset-0 bg-[#C9A96E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-white font-medium text-xl tracking-tight font-serif">
              True<span className="text-[#C9A96E] italic font-normal ml-0.5">Solution</span>
            </span>
          </a>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A7A68] hover:text-[#C9A96E] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary py-3 px-6 text-xs uppercase font-bold tracking-[0.08em] inline-flex items-center gap-2">
              Book Consultation
            </a>
          </div>

          {/* Toggle drawer mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#F5ECD7] hover:text-[#C9A96E] transition-colors focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0D0A07]/98 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-serif text-3xl text-white hover:text-[#C9A96E] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-6 tracking-widest text-center"
            >
              Book Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────
//  Hero Section & Stats
// ─────────────────────────────────────────────────────────
function HeroSection() {
  const floatingIcons = [
    { icon: '🚀', x: '8%', y: '25%', delay: 0 },
    { icon: '⚡', x: '88%', y: '18%', delay: 0.4 },
    { icon: '💻', x: '84%', y: '65%', delay: 0.8 },
    { icon: '☁️', x: '6%', y: '68%', delay: 1.2 },
    { icon: '⚛️', x: '78%', y: '40%', delay: 0.6 },
    { icon: '📱', x: '18%', y: '45%', delay: 1.0 },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-36 pb-20 grid-bg border-b border-[rgba(201,169,110,0.15)]">
      {/* Editorial Radial Glow */}
      <div className="absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[85vw] h-[85vw] max-w-[800px] max-h-[800px] bg-gradient-to-r from-[#C9A96E]/5 to-transparent rounded-full filter blur-[100px] pointer-events-none z-0" />

      {/* Floating Badges */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center p-3.5 bg-[#13100C]/70 backdrop-blur-md border border-[rgba(201,169,110,0.15)] rounded-xl pointer-events-none z-10"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
        >
          <span className="text-xl">{item.icon}</span>
        </motion.div>
      ))}

      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* Editorial Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#1A1510]/50 border border-[rgba(201,169,110,0.18)] rounded-full px-5 py-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shadow-[0_0_8px_#C9A96E]" />
          <span className="text-xs uppercase tracking-[0.12em] font-semibold text-[#E8D5B0]">
            Enterprise-Grade Software Engineering
          </span>
        </motion.div>

        {/* Large Serifs Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.1] mb-6 max-w-[950px]"
        >
          Building Digital Products That<br />
          <span className="gradient-text italic font-normal">Drive Business Growth</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm md:text-base max-w-[620px] text-[#8A7A68] leading-relaxed mb-10"
        >
          We construct bespoke software systems, modern SaaS applications, custom APIs, and AI integrations designed exclusively to power secure digital operations at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <a href="#contact" className="btn-primary py-4 px-8 text-xs font-bold tracking-[0.08em] uppercase inline-flex items-center gap-2">
            <span>Book Free Consultation</span>
            <ArrowRight size={14} />
          </a>
          <a href="#projects" className="btn-secondary py-4 px-8 text-xs font-bold tracking-[0.08em] uppercase inline-flex items-center gap-2">
            <span>View Our Work</span>
          </a>
        </motion.div>

        {/* Trusted By Enterprise Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-[850px] mb-20"
        >
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A7A68] mb-6">
            TRUSTED BY ELITE TECHNOLOGY TEAMS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-35 hover:opacity-60 transition-opacity duration-300">
            {['STRIPE', 'AWS', 'VERCEL', 'LINEAR', 'RETOOL'].map((brand) => (
              <span key={brand} className="text-white font-serif tracking-[0.15em] text-xs font-semibold">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
        >
          {[
            { value: 10, suffix: '+', label: 'Projects Delivered' },
            { value: 10, suffix: '+', label: 'Happy Clients' },
            { value: 3, suffix: '+', label: 'Years of Excellence' },
            { value: 100, suffix: '%', label: 'Satisfaction Rate' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 border border-[rgba(201,169,110,0.12)] text-center">
              <div className="text-4xl md:text-5xl font-serif text-[#C9A96E] mb-1 font-light">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A7A68]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Why Choose Section
// ─────────────────────────────────────────────────────────
function WhyChooseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-choose" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#0D0A07]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left info */}
          <div className="lg:col-span-5">
            <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Why Us</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
              Why Choose<br />
              <span className="gradient-text italic font-normal">TrueSolution?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm text-[#8A7A68] leading-relaxed">
              We operate at the interface of custom visual architectures and clean system design, providing dedicated co-pilot software consulting to build stable software platforms.
            </motion.p>
          </div>

          {/* Right Cards List */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-card p-5 border border-[rgba(201,169,110,0.12)] hover:border-[#C9A96E]/30 card-glow transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-[18px] h-[18px] rounded bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E]">
                    <Check size={10} />
                  </div>
                  <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-[#8A7A68] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Services Section
// ─────────────────────────────────────────────────────────
function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#13100C]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Services Catalog</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            Everything You Need to <span className="gradient-text italic font-normal">Scale Digitally</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm max-w-[600px] mx-auto text-[#8A7A68]">
            From database strategy to pixel-perfect design, we offer premium development solutions engineered to produce commercial velocity.
          </motion.p>
        </motion.div>

        {/* Grid cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-8 card-glow group cursor-pointer rounded-2xl flex flex-col justify-between border border-[rgba(201,169,110,0.12)]"
              style={{ background: '#131820', transition: 'all 0.4s ease' }}
            >
              <div>
                {/* Custom rounded box icon */}
                <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center mb-6 bg-[#C9A96E]/5 text-[#C9A96E] border border-[#C9A96E]/15 group-hover:bg-[#C9A96E] group-hover:text-[#0D0A07] group-hover:border-[#C9A96E] transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">{service.title}</h3>
                <p className="text-xs text-[#8A7A68] leading-relaxed mb-6">{service.description}</p>
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A96E] group-hover:gap-3 transition-all duration-300">
                <span>Learn More</span>
                <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Featured Projects Section
// ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#0D0A07]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Featured Case Studies</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            Our <span className="gradient-text italic font-normal">Recent Work</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm max-w-[550px] mx-auto text-[#8A7A68]">
            Discover real solutions designed for leading business operators, resolving complex scaling obstacles.
          </motion.p>
        </motion.div>

        {/* Large Case Study Grid */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-10 border border-[rgba(201,169,110,0.12)] hover:border-[#C9A96E]/20 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Screenshot Placeholder */}
                <div className="lg:col-span-5 relative h-[250px] md:h-[320px] rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1510] to-[#13100C] border border-[rgba(201,169,110,0.15)] flex flex-col justify-center items-center text-center p-6">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-4 border border-[#C9A96E]/20">
                    <Play size={20} className="text-[#C9A96E]" />
                  </div>
                  <h4 className="text-white text-base font-semibold mb-1 font-serif">{project.title}</h4>
                  <p className="text-[10px] text-[#8A7A68] tracking-widest uppercase">{project.category}</p>
                </div>

                {/* Case Study Details */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A96E] mb-2 inline-block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-5">{project.title}</h3>

                    {/* Problem/Solution Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="text-xs uppercase font-bold tracking-[0.1em] text-red-300/80 mb-2">The Problem</h5>
                        <p className="text-xs text-[#8A7A68] leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <h5 className="text-xs uppercase font-bold tracking-[0.1em] text-[#C9A96E] mb-2">The Solution</h5>
                        <p className="text-xs text-[#8A7A68] leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Impact Row */}
                    <div className="bg-[#13100C] p-4 rounded-lg border border-[rgba(201,169,110,0.1)] mb-6">
                      <h5 className="text-xs uppercase font-bold tracking-[0.1em] text-white mb-1.5">Business Impact</h5>
                      <p className="text-xs text-[#E8D5B0] leading-relaxed">{project.impact}</p>
                    </div>
                  </div>

                  {/* Tech stack and Action */}
                  <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-[rgba(201,169,110,0.08)]">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-badge text-[10px]">{t}</span>
                      ))}
                    </div>

                    <a href={project.demoUrl} className="btn-secondary py-2.5 px-5 text-[10px] font-bold uppercase tracking-[0.08em] inline-flex items-center gap-1.5">
                      <span>Live Case Study</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Development Process Section
// ─────────────────────────────────────────────────────────
function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    { title: 'Discover', desc: 'Complimentary wireframe reviews, security planning, and architectural budgeting specs.' },
    { title: 'Design', desc: 'Luxury UI/UX prototyping directly mapped to match your corporate system requirements.' },
    { title: 'Develop', desc: 'Senior engineers compile scalable frontend logic, custom databases, and API structures.' },
    { title: 'Test', desc: 'Rigorous security scanning, automation checking, database audit runs, and load audits.' },
    { title: 'Launch', desc: 'Deployment on high-availability, fully automated serverless setups or Docker grids.' },
    { title: 'Support', desc: 'Dedicated engineering monitoring, continuous maintenance support, and sprint scaling.' }
  ];

  return (
    <section id="process" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#13100C]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Our Timeline</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            Premium <span className="gradient-text italic font-normal">Development Process</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm max-w-[550px] mx-auto text-[#8A7A68]">
            How we translate complex application requirements into production platforms seamlessly.
          </motion.p>
        </motion.div>

        {/* Process Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-5 border border-[rgba(201,169,110,0.12)] flex flex-col items-center text-center relative"
            >
              {/* Gold Badge Number */}
              <div className="w-[30px] h-[30px] rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] font-serif font-bold text-xs mb-4">
                0{i + 1}
              </div>
              <h4 className="font-serif text-white font-medium text-lg mb-2">{step.title}</h4>
              <p className="text-[11px] text-[#8A7A68] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Testimonials Section
// ─────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  const testimonials = [
    { name: 'James Carter', role: 'CEO', company: 'NexaVentures', text: 'TrueSolution completely transformed our digital systems. They engineered our serverless database dashboard ahead of schedule. Their system architecture and attention to visual detail is incomparable.', avatar: 'JC' },
    { name: 'Emily Rodriguez', role: 'Product Lead', company: 'FinEdge Technologies', text: 'The React Native mobile banking app they constructed passed strict external penetration audits effortlessly. Users adore the premium speed and elegant animations.', avatar: 'ER' },
    { name: 'Tariq Mahmood', role: 'Chief Information Officer', company: 'RetailPro Inc.', text: 'We pre-screen thousands of patients now automatically thanks to their compliance AI integration. The developers communication velocity was excellent.', avatar: 'TM' }
  ];

  return (
    <section id="testimonials" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#0D0A07]">
      <div className="max-w-[850px] mx-auto px-6" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Partner Stories</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl font-serif font-light text-white mb-4">
            What Our <span className="gradient-text italic font-normal">Clients Say</span>
          </motion.h2>
        </motion.div>

        {/* Carousel Card */}
        <div className="glass-card p-8 md:p-12 border border-[rgba(201,169,110,0.15)] text-center relative overflow-hidden">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} fill="#C9A96E" color="#C9A96E" />
            ))}
          </div>

          <p className="text-sm md:text-base text-[#F5ECD7] italic leading-relaxed mb-8">
            &ldquo;{testimonials[current].text}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#C9A96E] to-[#E8D5B0] text-[#0D0A07] font-serif font-bold text-sm flex items-center justify-center">
              {testimonials[current].avatar}
            </div>
            <div className="text-left">
              <h5 className="font-semibold text-white text-sm">{testimonials[current].name}</h5>
              <p className="text-[11px] text-[#C9A96E]">
                {testimonials[current].role} &middot; {testimonials[current].company}
              </p>
            </div>
          </div>

          {/* Dots Controls */}
          <div className="flex gap-2 justify-center mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '6px',
                  backgroundColor: i === current ? '#C9A96E' : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Leadership Team Section
// ─────────────────────────────────────────────────────────
function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#13100C]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">The Architects</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            Meet The <span className="gradient-text italic font-normal">Core Team</span>
          </motion.h2>
          <p className="text-sm max-w-[500px] mx-auto text-[#8A7A68]">
            An elite cohort of engineers and architects driving project success with absolute code integrity.
          </p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden border border-[rgba(201,169,110,0.12)] hover:border-[#C9A96E]/20 card-glow group"
            >
              {/* Photo Box Placeholder */}
              <div className="relative h-[220px] bg-gradient-to-br from-[#1A1510] to-[#13100C] border-b border-[rgba(201,169,110,0.12)] flex items-center justify-center">
                <Users size={48} className="text-[#C9A96E]/15 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#C9A96E]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Details */}
              <div className="p-6">
                <h4 className="font-serif text-white text-xl font-medium mb-1">{member.name}</h4>
                <p className="text-xs text-[#C9A96E] font-medium mb-4">{member.role}</p>
                <p className="text-xs text-[#8A7A68] leading-relaxed mb-5">{member.desc}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.skills.map((skill) => (
                    <span key={skill} className="tech-badge text-[9px]">{skill}</span>
                  ))}
                </div>

                {/* Linkedin Link */}
                <a
                  href={member.linkedin}
                  className="inline-flex items-center gap-1.5 text-xs text-[#E8D5B0] hover:text-[#C9A96E] transition-colors"
                >
                  <Linkedin size={12} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Technologies Section
// ─────────────────────────────────────────────────────────
function TechStackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const techStack = [
    { name: 'React', desc: 'Component architectures' },
    { name: 'Next.js', desc: 'Server components' },
    { name: 'Node.js', desc: 'Secure backend operations' },
    { name: 'PostgreSQL', desc: 'Relational data partitioning' },
    { name: 'MongoDB', desc: 'Non-relational data structures' },
    { name: 'AWS', desc: 'Serverless cloud services' },
    { name: 'Docker', desc: 'System containerization' },
    { name: 'TypeScript', desc: 'Type-safe compilations' },
    { name: 'Python', desc: 'Machine learning operations' },
    { name: 'AI Tools', desc: 'Intelligent process agents' }
  ];

  return (
    <section id="tech-stack" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#0D0A07]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Modern Tooling</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            Engineered with <span className="gradient-text italic font-normal">Modern Technology</span>
          </motion.h2>
          <p className="text-sm max-w-[500px] mx-auto text-[#8A7A68]">
            We deploy production-grade software frameworks to guarantee application runtime stability and scale.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card p-5 text-center border border-[rgba(201,169,110,0.12)] hover:border-[#C9A96E]/20 transition-all card-glow cursor-default"
            >
              <div className="w-[38px] h-[38px] rounded-lg bg-[#C9A96E]/5 text-[#C9A96E] font-serif font-bold text-base flex items-center justify-center mx-auto mb-3.5 border border-[#C9A96E]/15">
                {tech.name.charAt(0)}
              </div>
              <h5 className="text-xs font-semibold text-white mb-1.5">{tech.name}</h5>
              <p className="text-[10px] text-[#8A7A68]">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  FAQ Accordion Section [NEW]
// ─────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section-padding border-b border-[rgba(201,169,110,0.15)] bg-[#13100C]">
      <div className="max-w-[750px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tech-badge mb-4 inline-block">Consultation FAQ</span>
          <h2 className="text-4xl font-serif font-light text-white mb-4">
            Frequently Asked <span className="gradient-text italic font-normal">Questions</span>
          </h2>
          <p className="text-sm text-[#8A7A68]">
            Have inquiries regarding our scoping processes, timelines, or intellectual property?
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-card border border-[rgba(201,169,110,0.12)] rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* Trigger */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center bg-transparent focus:outline-none"
                >
                  <span className="font-serif text-[#F5ECD7] hover:text-[#C9A96E] text-base md:text-lg transition-colors font-medium">
                    {faq.question}
                  </span>
                  <div className="text-[#C9A96E] ml-4 flex-shrink-0">
                    {isOpen ? <X size={16} /> : <HelpCircle size={16} />}
                  </div>
                </button>

                {/* Content collapsible */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="p-5 md:p-6 pt-0 border-t border-[rgba(201,169,110,0.08)] text-xs md:text-sm text-[#8A7A68] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Contact Section
// ─────────────────────────────────────────────────────────
function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(201,169,110,0.12)',
    borderRadius: '6px',
    color: 'white',
    padding: '0.875rem 1rem',
    width: '100%',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const servicesList = [
    'Web Application Development',
    'Mobile App Development',
    'SaaS Product Development',
    'AI Solutions Integration',
    'UI/UX Design Strategy',
    'Cloud & DevOps Solutions'
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#0D0A07]">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#C9A96E]/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#E8D5B0]/3 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="tech-badge mb-4 inline-block">Strategy Call</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            Let's Build Something <span className="gradient-text italic font-normal">Exceptional</span>
          </motion.h2>
          <p className="text-sm max-w-[500px] mx-auto text-[#8A7A68]">
            Schedule your complimentary pre-screening session to receive scoping and technical recommendations.
          </p>
        </motion.div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: <Mail size={18} />, title: 'Inquiries Email', value: 'True.Solution.21@gmail.com' },
              { icon: <Phone size={18} />, title: 'Direct Call Line', value: '+91 7415701497' },
              { icon: <MapPin size={18} />, title: 'Global Office', value: 'indore, india' }
            ].map((info, i) => (
              <div key={i} className="glass-card p-5 border border-[rgba(201,169,110,0.12)] flex items-center gap-4 card-glow">
                <div className="w-[42px] h-[42px] rounded-lg bg-[#C9A96E]/5 text-[#C9A96E] flex items-center justify-center border border-[#C9A96E]/15">
                  {info.icon}
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#8A7A68] mb-0.5">{info.title}</div>
                  <div className="text-white text-xs md:text-sm font-medium">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Strategy Card */}
            <div className="glass-card p-6 border border-[rgba(201,169,110,0.15)] bg-gradient-to-br from-[#C9A96E]/5 to-transparent text-center">
              <Building2 size={28} className="text-[#C9A96E] mx-auto mb-3" />
              <h5 className="font-serif text-white font-medium text-base mb-1">Free Strategy Scoping</h5>
              <p className="text-xs text-[#8A7A68] leading-relaxed">
                Connect with our system architects for 30 minutes to review structural layouts and code frameworks.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 border border-[rgba(201,169,110,0.12)] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7A68] mb-2">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7A68] mb-2">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formState.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7A68] mb-2">Service Required *</label>
                <select
                  name="service"
                  required
                  value={formState.service}
                  onChange={handleChange}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <option value="" style={{ background: '#0D0A07' }}>Select a service category...</option>
                  {servicesList.map(s => <option key={s} value={s} style={{ background: '#0D0A07' }}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7A68] mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Outline your application logic constraints and milestones..."
                  value={formState.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full py-4 text-xs font-bold uppercase tracking-[0.08em] inline-flex justify-center items-center gap-2"
                style={{ opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full relative z-10" />
                    <span className="relative z-10">Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send size={12} className="relative z-10" />
                  </>
                )}
              </button>

              {/* Responses status */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-xs font-medium">
                    <CheckCircle size={14} /> Message sent successfully! We will contact you within 24 hours.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">
                    <X size={14} /> Something went wrong. Please check inputs or email hello@truesolution.dev
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────────────────────
function Footer() {
  const linksQuick = ['Services', 'Why Us', 'Projects', 'Process', 'Team', 'FAQ'];
  const linksServices = [
    'Web Development',
    'Mobile Apps',
    'SaaS Development',
    'AI Solutions',
    'UI/UX Design Strategy',
    'Cloud & DevOps Solutions'
  ];

  return (
    <footer style={{ background: '#080604', borderTop: '1px solid rgba(201, 169, 110, 0.12)' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-[34px] h-[34px] rounded-lg border border-[#C9A96E] flex items-center justify-center bg-transparent">
                <span className="text-[#C9A96E] font-serif font-bold text-sm">TS</span>
              </div>
              <span className="text-white font-medium text-lg font-serif">
                True<span className="text-[#C9A96E] italic font-normal ml-0.5">Solution</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#8A7A68] mb-6 max-w-[280px]">
              Constructing world-class, luxury-tier software applications that drive sustainable business scale.
            </p>
            <div className="flex gap-2">
              {['LinkedIn', 'GitHub', 'Twitter'].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="px-3 py-2 rounded border border-[rgba(201,169,110,0.12)] text-[#8A7A68] hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all text-[10px] font-bold uppercase tracking-wider bg-transparent"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {linksQuick.map((link) => (
                <li key={link}>
                  <a href={`#${link.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs text-[#8A7A68] hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services list */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white mb-5">Services</h4>
            <ul className="space-y-2.5">
              {linksServices.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-xs text-[#8A7A68] hover:text-white transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global contacts */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white mb-5">Get In Touch</h4>
            <div className="space-y-3">
              {[
                { icon: <Mail size={13} />, value: 'True.Solution.21@gmail.com' },
                { icon: <Phone size={13} />, value: '+91 7415701497' },
                { icon: <MapPin size={13} />, value: 'indore, india' }
              ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-[#C9A96E]">{item.icon}</div>
                    <span className="text-xs text-[#8A7A68]">{item.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(201,169,110,0.08)]">
          <p className="text-[10px] text-[#8A7A68] mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TrueSolution. All rights reserved. Registered software agency.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a key={link} href="#" className="text-[10px] text-[#8A7A68] hover:text-white transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────
//  Root Component
// ─────────────────────────────────────────────────────────
export default function TrueSolutionWebsite() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0D0A07] text-[#F5ECD7] font-sans antialiased">
      {/* Texture noise background */}
      <div className="noise-overlay" />

      <Navigation />

      <main>
        <HeroSection />
        <WhyChooseSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <TeamSection />
        <TechStackSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
