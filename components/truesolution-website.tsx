'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Menu, X, ArrowRight, ExternalLink, Github, Linkedin,
  Mail, Phone, MapPin, CheckCircle, Globe, Smartphone,
  Code2, Zap, Cloud, ChevronRight, Star, Send,
  Building2, Layers, Shield, TrendingUp, Users, Award,
  Clock, HelpCircle, Check, Target, Database, Server,
  Lock, Cpu, GitBranch, BarChart3, Rocket, Eye,
  Sparkles, ArrowUpRight, Play, Terminal, Box,
  Workflow, Monitor, ChevronDown, Quote, FileCode,
  Gauge, Timer, UserCheck, Trophy
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
//  Types
// ═══════════════════════════════════════════════════════════

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  category: string;
  video?: string;
  challenge: string;
  solution: string;
  architecture: string[];
  tech: string[];
  impact: string;
  metrics: { value: string; label: string }[];
  demoUrl: string;
}

// ═══════════════════════════════════════════════════════════
//  Data
// ═══════════════════════════════════════════════════════════

const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: 'Launch Revenue-Generating Web Platforms',
    desc: 'Full-stack web applications optimized for conversion, speed, and scale.',
    deliverables: ['Next.js / React SPAs', 'Server-side rendering & SEO', 'Payment & auth integration', 'Admin dashboards'],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Ship App Store-Ready Mobile Products',
    desc: 'Cross-platform mobile apps with native performance and delightful UX.',
    deliverables: ['iOS & Android deployment', 'Push notifications & offline', 'Real-time sync', 'App Store optimization'],
    tech: ['React Native', 'Flutter', 'Firebase'],
  },
  {
    icon: <Layers size={22} />,
    title: 'Build Multi-Tenant SaaS at Scale',
    desc: 'Subscription-based platforms with automated billing and tenant isolation.',
    deliverables: ['Multi-tenant architecture', 'Stripe billing integration', 'Role-based access control', 'Usage analytics'],
    tech: ['Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Automate Operations with AI & ML',
    desc: 'Custom AI models and intelligent automation for business processes.',
    deliverables: ['Custom ML model training', 'NLP & document processing', 'Recommendation engines', 'Workflow automation'],
    tech: ['Python', 'TensorFlow', 'OpenAI'],
  },
  {
    icon: <Eye size={22} />,
    title: 'Convert Users with Research-Backed Design',
    desc: 'Data-driven UI/UX that reduces friction and increases conversion rates.',
    deliverables: ['User research & testing', 'Design system creation', 'Interaction prototyping', 'Accessibility compliance'],
    tech: ['Figma', 'Framer', 'Analytics'],
  },
  {
    icon: <Cloud size={22} />,
    title: 'Deploy on Auto-Scaling Infrastructure',
    desc: 'Cloud-native deployments with zero-downtime and automated scaling.',
    deliverables: ['AWS / GCP setup', 'CI/CD pipelines', 'Docker & Kubernetes', 'Monitoring & alerting'],
    tech: ['AWS', 'Docker', 'Terraform'],
  },
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: 'PrimeEstate Property Management Platform',
    client: 'Bhuvantu',
    category: 'Real Estate & PropTech',
    video: '/Bhuvantu_video.mp4',
    challenge: 'A real estate brokerage firm struggled with managing property listings, handling buyer inquiries, and coordinating property visits manually — resulting in delayed responses, missed leads, and lost revenue opportunities.',
    solution: 'We engineered a full-stack property management platform with an admin dashboard for listing management, advanced search with multi-parameter filtering, detailed property pages with virtual tour integration, and a smart appointment scheduling system for automated property tour booking.',
    architecture: ['Next.js Frontend', 'Node.js API', 'PostgreSQL', 'Admin Dashboard', 'Booking Engine', 'Email Service'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    impact: 'Transformed the client\'s manual workflow into a fully digital property management ecosystem, enabling self-service property discovery and automated appointment scheduling.',
    metrics: [
      { value: '3x', label: 'Lead Increase' },
      { value: '60%', label: 'Faster Response' },
      { value: '85%', label: 'Booking Rate' },
    ],
    demoUrl: 'https://www.bhuvantu.com/',
  },
  {
    id: 2,
    title: 'Lokhandwala Group Corporate Platform',
    client: 'Lokhandwala Group',
    category: 'Enterprise Real Estate',
    video: '/ALOKHANDWALA_video.mp4',
    challenge: 'The client needed a premium digital platform to showcase decades of real estate excellence, highlight residential and commercial developments, strengthen brand credibility, and provide buyers with a seamless way to explore projects and submit inquiries.',
    solution: 'We developed a modern enterprise website featuring immersive project showcases, company heritage timeline, township portfolios, luxury property presentations, lead generation forms, and a scalable CMS for managing current and future developments.',
    architecture: ['Next.js SSR', 'Headless CMS', 'PostgreSQL', 'Lead Capture API', 'CDN', 'Analytics'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    impact: 'Established a commanding digital presence that matched the client\'s offline brand stature, driving significant improvements in online lead generation and project visibility.',
    metrics: [
      { value: '150%', label: 'More Inquiries' },
      { value: '40%', label: 'Bounce Reduction' },
      { value: '2.5x', label: 'Page Engagement' },
    ],
    demoUrl: 'https://alokhandwala.com/',
  },
  {
    id: 3,
    title: 'Grind — Browser-Based Coding Platform',
    client: 'Grind',
    category: 'EdTech & Developer Tools',
    video: '/Grind_video.mp4',
    challenge: 'Aspiring developers needed a fast, accessible platform to practice coding and prepare for technical interviews without the complexity of local environment setup. Traditional development tools require significant installation, configuration, and system resources.',
    solution: 'We built a browser-based coding platform with an online compiler supporting multiple languages, a coding challenge system with difficulty progression, AI-powered learning assistance, real-time code execution with sandboxed containers, progress tracking dashboards, and interview preparation resources.',
    architecture: ['Next.js Frontend', 'Code Execution Engine', 'Docker Sandboxes', 'PostgreSQL', 'AI Assistant API', 'WebSocket'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    impact: 'Created an accessible coding education platform that eliminates setup barriers and enables developers to start practicing instantly from any device.',
    metrics: [
      { value: '10K+', label: 'Active Users' },
      { value: '50K+', label: 'Code Executions' },
      { value: '95%', label: 'Uptime SLA' },
    ],
    demoUrl: 'https://www.grind.org.in',
  },
  {
    id: 4,
    title: 'Civic Samadhan — Smart Grievance Platform',
    client: 'Civic Samadhan',
    category: 'Civic Technology & E-Governance',
    video: '/civicsamadhan_video.mp4',
    challenge: 'Citizens struggled to report civic issues efficiently due to fragmented complaint systems, lack of transparency, and zero visibility into the resolution process. Municipal authorities faced challenges organizing, tracking, and responding to public grievances at scale.',
    solution: 'We developed a centralized civic grievance management platform enabling citizens to report issues with evidence upload, track complaint status in real time, and receive notifications throughout the resolution lifecycle. Role-based administration, intelligent categorization, and location-based tracking empower authorities to manage complaints at scale.',
    architecture: ['Next.js Frontend', 'Node.js API', 'PostgreSQL', 'Role-Based Auth', 'Geo Tracking', 'Notification Service'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    impact: 'Digitized the entire civic grievance lifecycle from reporting to resolution, establishing transparency and accountability between citizens and government bodies.',
    metrics: [
      { value: '70%', label: 'Faster Resolution' },
      { value: '5K+', label: 'Issues Tracked' },
      { value: '4.8★', label: 'Citizen Rating' },
    ],
    demoUrl: 'https://civicsamadhan.vercel.app',
  },
];

const PROCESS_STEPS = [
  {
    phase: 'Discovery & Scoping',
    duration: 'Week 1–2',
    icon: <Target size={18} />,
    details: [
      'Stakeholder interviews & requirements gathering',
      'User research and competitive analysis',
      'Technical architecture planning',
      'Detailed SOW & milestone delivery',
    ],
  },
  {
    phase: 'System Design',
    duration: 'Week 2–3',
    icon: <FileCode size={18} />,
    details: [
      'Database schema & API contract design',
      'UI/UX wireframing and prototyping',
      'Security model & auth flow planning',
      'Infrastructure topology planning',
    ],
  },
  {
    phase: 'Sprint Development',
    duration: 'Week 3–10',
    icon: <Terminal size={18} />,
    details: [
      '2-week agile sprints with daily standups',
      'CI/CD pipeline with automated testing',
      'Staging environment with weekly demos',
      'Continuous integration & code reviews',
    ],
  },
  {
    phase: 'QA & Security Audit',
    duration: 'Week 10–11',
    icon: <Shield size={18} />,
    details: [
      'Automated unit & integration testing',
      'Security scanning & penetration testing',
      'Load testing & performance optimization',
      'Accessibility & cross-browser QA',
    ],
  },
  {
    phase: 'Deployment & Launch',
    duration: 'Week 11–12',
    icon: <Rocket size={18} />,
    details: [
      'Production deployment with zero downtime',
      'DNS, SSL, and CDN configuration',
      'Monitoring, logging & alerting setup',
      'Technical documentation handoff',
    ],
  },
  {
    phase: 'Ongoing Support',
    duration: 'Post-Launch',
    icon: <Gauge size={18} />,
    details: [
      'SLA-backed support & incident response',
      'Proactive monitoring & uptime guarantees',
      'Feature iterations & scaling support',
      'Quarterly architecture reviews',
    ],
  },
];

const TECH_STACK = {
  Frontend: [
    { name: 'React', desc: 'Component architecture' },
    { name: 'Next.js', desc: 'Full-stack framework' },
    { name: 'TypeScript', desc: 'Type-safe development' },
    { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  ],
  Backend: [
    { name: 'Node.js', desc: 'Server-side runtime' },
    { name: 'Python', desc: 'ML & automation' },
    { name: 'Go', desc: 'High-performance services' },
    { name: 'REST/GraphQL', desc: 'API design' },
  ],
  Database: [
    { name: 'PostgreSQL', desc: 'Relational data' },
    { name: 'MongoDB', desc: 'Document storage' },
    { name: 'Redis', desc: 'Caching layer' },
    { name: 'Firebase', desc: 'Real-time data' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS', desc: 'Cloud infrastructure' },
    { name: 'Docker', desc: 'Containerization' },
    { name: 'Kubernetes', desc: 'Orchestration' },
    { name: 'CI/CD', desc: 'Automated pipelines' },
  ],
};

const TESTIMONIALS = [
  {
    name: 'Ajay Sisodiya',
    role: 'Real Estate Consultant',
    company: 'Bhuvantu',
    text: 'TrueSolution developed a powerful real estate platform tailored to our business needs. The property listing system and appointment scheduling features have made it much easier for clients to discover properties and connect with us. Their professionalism and technical expertise were exceptional throughout the entire engagement.',
    avatar: 'AS',
  },
  {
    name: 'Aliasger Lokhandwala',
    role: 'Managing Director',
    company: 'Lokhandwala Group',
    text: 'From concept to deployment, TrueSolution delivered a professional website that showcases our scaffolding services and real estate portfolio perfectly. The design is modern, responsive, and has helped us generate significantly more business inquiries through our online presence. Their attention to detail was remarkable.',
    avatar: 'AL',
  },
  {
    name: 'Asmit Panday',
    role: 'Founder & CEO',
    company: 'Grind Platform',
    text: 'The online compiler platform developed by TrueSolution provides a smooth coding experience with fast execution and an intuitive interface. Their team demonstrated strong technical skills in containerization and real-time systems, and delivered a product that exceeded our expectations on both performance and user experience.',
    avatar: 'AP',
  },
];

const FAQS = [
  {
    question: 'How do you estimate project budgets?',
    answer: 'We conduct a detailed, complimentary scoping phase where we break down your goals, wireframes, and technical specifications. You receive a comprehensive document outlining precise sprints, line-item budgets, and milestones with zero hidden fees. Typical projects range from $5K–$100K+ depending on complexity.',
  },
  {
    question: 'Do we own the full intellectual property?',
    answer: 'Absolutely. Once milestones are completed and invoiced, 100% of the proprietary source code, IP rights, deployment configurations, and assets are legally transferred directly to your organization. We operate on a clean work-for-hire basis.',
  },
  {
    question: 'How do you handle security?',
    answer: 'Security is built into the architecture from day one. We implement secure OAuth/JWT authentication, data encryption at rest and in transit, OWASP security scanning, automated vulnerability audits, and follow principle-of-least-privilege access controls throughout.',
  },
  {
    question: 'What does communication look like during development?',
    answer: 'We run weekly live demo reviews where you see active software progress on staging URLs. A dedicated project manager is available daily on Slack. You get access to our project board for full transparency into sprint progress, blockers, and deliverables.',
  },
  {
    question: 'Can the architecture scale as we grow?',
    answer: 'Yes. We build clean, modular, fully documented codebases using containerized infrastructure. Our architectures are designed to scale horizontally — handling growth from hundreds to millions of users without requiring code rewrites or platform migrations.',
  },
];

// ═══════════════════════════════════════════════════════════
//  Animation Variants
// ═══════════════════════════════════════════════════════════

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ═══════════════════════════════════════════════════════════
//  Counter Component
// ═══════════════════════════════════════════════════════════

function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════
//  Navigation
// ═══════════════════════════════════════════════════════════

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Solutions', href: '#services' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#hero" className="flex items-center group text-decoration-none transition-transform duration-300 hover:scale-[1.02]">
            <img src="/logo.png" alt="TrueSolution Logo" className="h-20 md:h-24 lg:h-28 w-auto object-contain" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-[#71717A] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary py-2.5 px-5 text-[13px] font-semibold inline-flex items-center gap-2">
              Start a Project
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#A1A1AA] hover:text-white transition-colors focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-[#09090B]/98 backdrop-blur-xl flex flex-col justify-center items-center gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-semibold text-white hover:text-[#818CF8] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-4 px-8 py-3"
            >
              Start a Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
//  Hero Section
// ═══════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 dot-grid-bg">
      {/* Background glows */}
      <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[700px] h-[700px] bg-[#6366F1]/[0.04] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-[#818CF8]/[0.03] rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-full px-4 py-1.5 mb-8"
        >
          <Lock size={12} className="text-[#22C55E]" />
          <span className="text-[11px] font-medium text-[#A1A1AA] tracking-wide">
            Enterprise-Grade Security · Production-Ready Systems
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.08] mb-6 max-w-[820px] tracking-tight"
        >
          We Engineer the Software That{' '}
          <span className="gradient-text">Funded Startups Scale With</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-lg max-w-[620px] text-[#A1A1AA] leading-relaxed mb-10 font-normal"
        >
          From MVPs that close seed rounds to platforms processing millions in transactions —
          we deliver production-grade systems trusted by startups, SMBs, and government organizations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 mb-16"
        >
          <a href="#contact" className="btn-primary py-3.5 px-7 text-sm font-semibold inline-flex items-center gap-2.5">
            Schedule Architecture Review
            <ArrowRight size={16} />
          </a>
          <a href="#case-studies" className="btn-secondary py-3.5 px-7 text-sm font-medium inline-flex items-center gap-2.5">
            View Case Studies
          </a>
        </motion.div>

        {/* Social proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-[11px] font-medium text-[#52525B] uppercase tracking-[0.15em] mb-10"
        >
          Trusted by funded startups, government agencies, and scaling SMBs
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-[800px]"
        >
          {[
            { value: 10, suffix: '+', label: 'Projects Delivered', icon: <Box size={16} /> },
            { value: 10, suffix: 'K+', label: 'Active Users Served', icon: <Users size={16} /> },
            { value: 1, suffix: '+', label: 'Years Experience', icon: <Clock size={16} /> },
            { value: 100, suffix: '%', label: 'Client Satisfaction', icon: <Trophy size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-[#6366F1]">{stat.icon}</span>
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#71717A]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  Client Logo Marquee
// ═══════════════════════════════════════════════════════════

function ClientLogos() {
  const clients = [
    'Bhuvantu', 'Lokhandwala Group', 'Grind Platform', 'Civic Samadhan',
    'AWS', 'Vercel', 'Docker', 'GitHub',
  ];

  return (
    <section className="py-8 border-b border-[rgba(255,255,255,0.06)] bg-[#09090B] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#52525B] whitespace-nowrap hidden md:block">
            Trusted By
          </span>
          <div className="flex-1 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />
            <div className="marquee-track">
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={i}
                  className="text-[13px] font-semibold text-[#3F3F46] tracking-wide mx-8 whitespace-nowrap hover:text-[#71717A] transition-colors"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  Services Section — Outcome-Driven
// ═══════════════════════════════════════════════════════════

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#09090B]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <motion.span variants={fadeInUp} className="section-label">What We Build</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Outcome-driven engineering for{' '}
            <span className="gradient-text">every stage of growth</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[15px] max-w-[560px] text-[#71717A]">
            We don't just write code — we deliver business outcomes. Every engagement starts with your goals and works backwards to the architecture.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="glass-card glass-card-glow p-6 group cursor-default"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 bg-[rgba(99,102,241,0.08)] text-[#6366F1] border border-[rgba(99,102,241,0.15)] group-hover:bg-[#6366F1] group-hover:text-white group-hover:border-[#6366F1] transition-all duration-300">
                {service.icon}
              </div>

              <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight leading-snug">
                {service.title}
              </h3>
              <p className="text-[13px] text-[#71717A] leading-relaxed mb-4">{service.desc}</p>

              {/* Deliverables */}
              <ul className="space-y-1.5 mb-5">
                {service.deliverables.map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-[12px] text-[#A1A1AA]">
                    <Check size={12} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tech.map((t) => (
                  <span key={t} className="tech-badge text-[10px]">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  Case Studies Section
// ═══════════════════════════════════════════════════════════

function CaseStudiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="case-studies" className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#0F0F12]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <motion.span variants={fadeInUp} className="section-label">Case Studies</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Real problems solved,{' '}
            <span className="gradient-text">measurable results delivered</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[15px] max-w-[560px] text-[#71717A]">
            Each engagement is a partnership. Here's how we've helped organizations transform their operations through technology.
          </motion.p>
        </motion.div>

        {/* Case Study Cards */}
        <div className="space-y-6">
          {CASE_STUDIES.map((cs) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="glass-card border border-[rgba(255,255,255,0.06)] hover:border-[rgba(99,102,241,0.15)] transition-colors duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Video / Visual */}
                <div className="lg:col-span-5 relative h-[240px] md:h-[320px] lg:h-full bg-[#0F0F12] overflow-hidden">
                  {cs.video ? (
                    <video
                      src={cs.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play size={40} className="text-[#6366F1] opacity-50" />
                    </div>
                  )}
                  {/* Category badge overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="tech-badge text-[10px] bg-[#09090B]/80 backdrop-blur-sm">{cs.category}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-[#6366F1] uppercase tracking-wider">{cs.client}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-5 tracking-tight leading-tight">
                    {cs.title}
                  </h3>

                  {/* Challenge / Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <h5 className="text-[11px] uppercase font-semibold tracking-wider text-[#EF4444]/80 mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]/60" /> Challenge
                      </h5>
                      <p className="text-[12px] text-[#71717A] leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h5 className="text-[11px] uppercase font-semibold tracking-wider text-[#22C55E]/80 mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]/60" /> Solution
                      </h5>
                      <p className="text-[12px] text-[#71717A] leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Architecture */}
                  <div className="mb-5">
                    <h5 className="text-[11px] uppercase font-semibold tracking-wider text-[#A1A1AA] mb-2">Architecture</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {cs.architecture.map((a) => (
                        <span key={a} className="arch-node text-[10px] py-1 px-2.5">{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Impact + Metrics */}
                  <div className="bg-[rgba(99,102,241,0.04)] border border-[rgba(99,102,241,0.1)] rounded-lg p-4 mb-5">
                    <h5 className="text-[11px] uppercase font-semibold tracking-wider text-white mb-2">Business Impact</h5>
                    <p className="text-[12px] text-[#A1A1AA] leading-relaxed mb-3">{cs.impact}</p>
                    <div className="grid grid-cols-3 gap-3">
                      {cs.metrics.map((m, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-bold gradient-text-green">{m.value}</div>
                          <div className="text-[9px] font-medium uppercase tracking-wider text-[#71717A]">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)] mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {cs.tech.map((t) => (
                        <span key={t} className="tech-badge text-[10px]">{t}</span>
                      ))}
                    </div>
                    <a
                      href={cs.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors"
                    >
                      View Live Project
                      <ExternalLink size={11} />
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

// ═══════════════════════════════════════════════════════════
//  Process Timeline
// ═══════════════════════════════════════════════════════════

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="process" className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#09090B]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left header */}
          <div className="lg:col-span-4">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <motion.span variants={fadeInUp} className="section-label">How We Build</motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                A proven process for{' '}
                <span className="gradient-text">predictable delivery</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[15px] text-[#71717A] leading-relaxed mb-6">
                Every project follows our battle-tested 12-week delivery framework. No surprises, no scope creep — just systematic execution from discovery to launch.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <a href="#contact" className="btn-primary py-3 px-6 text-[13px] font-semibold inline-flex items-center gap-2">
                  Start Discovery
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right timeline */}
          <div className="lg:col-span-8">
            <div className="relative pl-12">
              {/* Timeline line */}
              <div className="timeline-line" />

              <div className="space-y-6">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative flex gap-5"
                  >
                    {/* Dot */}
                    <div className="absolute -left-12 top-1">
                      <div className={`timeline-dot ${i === 0 ? 'timeline-dot-active' : ''}`} />
                    </div>

                    {/* Card */}
                    <div className="glass-card p-5 flex-1 hover:border-[rgba(99,102,241,0.15)] transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-[rgba(99,102,241,0.08)] text-[#6366F1] flex items-center justify-center border border-[rgba(99,102,241,0.15)]">
                            {step.icon}
                          </div>
                          <h4 className="text-[15px] font-semibold text-white">{step.phase}</h4>
                        </div>
                        <span className="tech-badge text-[10px]">{step.duration}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {step.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-2 text-[12px] text-[#71717A]">
                            <ChevronRight size={10} className="text-[#52525B] mt-1 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  Our Team
// ═══════════════════════════════════════════════════════════

const TEAM_MEMBERS = [
  {
    name: 'Burhanuddin Malu',
    role: 'Software Engineer',
    skills: 'Full Stack Development',
    img: '/burhan.jpeg',
    github: 'https://github.com/Burhanmalu',
    linkedin: 'https://www.linkedin.com/in/burhanuddin-malubhaiwala-35537b277/',
  },
  {
    name: 'Aman Patidar',
    role: 'Frontend Engineer',
    skills: 'React • Next.js • UI Systems',
    img: '/Aman.jpeg',
    github: 'https://github.com/amanpatidar514',
    linkedin: 'https://www.linkedin.com/in/aman-patidar-49449b292/',
  },
  {
    name: 'Atul Shukla',
    role: 'Backend Engineer',
    skills: 'Node.js • APIs • Databases',
    img: '/Atul.jpeg',
    github: 'https://github.com/shuklatul1021',
    linkedin: 'https://www.linkedin.com/in/mratul1021/',
  }
];

function FounderSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#0F0F12]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <motion.span variants={fadeInUp} className="section-label mx-auto mb-4">Our Team</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Meet the Team Behind <span className="gradient-text">TrueSolution</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[15px] md:text-lg text-[#A1A1AA] leading-relaxed">
            A multidisciplinary team of engineers, designers, and technology specialists building scalable digital products.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="relative group p-6 rounded-[20px] bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(124,92,255,0.5)] hover:shadow-[0_20px_50px_rgba(124,92,255,0.15)] overflow-hidden flex flex-col h-full"
            >
              {/* Subtle glow background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366F1]/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex flex-col items-center text-center relative z-10 flex-1">
                <div className="relative mb-5">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] group-hover:border-[#6366F1] transition-colors duration-300">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <h5 className="text-[16px] font-bold text-white group-hover:text-[#818CF8] transition-colors mb-1">{member.name}</h5>
                <p className="text-[13px] text-[#A1A1AA] font-medium mb-4">{member.role}</p>

                <div className="text-[11px] font-medium text-[#6366F1] bg-[#6366F1]/10 px-3 py-1.5 rounded-full inline-block mt-auto w-full">
                  {member.skills}
                </div>
              </div>

              {/* Social links (visible on hover) */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
                <a href={member.linkedin} className="text-[#A1A1AA] hover:text-[#0A66C2] transition-colors p-1 bg-[#18181B] rounded-md border border-[rgba(255,255,255,0.1)] hover:border-[#0A66C2]">
                  <Linkedin size={14} />
                </a>
                <a href={member.github} className="text-[#A1A1AA] hover:text-white transition-colors p-1 bg-[#18181B] rounded-md border border-[rgba(255,255,255,0.1)] hover:border-white">
                  <Github size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Statistics Section */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[rgba(255,255,255,0.06)]"
        >
          {[
            { value: '3', label: 'Team Members', icon: <Users size={18} /> },
            { value: '10+', label: 'Projects Delivered', icon: <Box size={18} /> },
            { value: '15+', label: 'Technologies', icon: <Layers size={18} /> },
            { value: '99.9%', label: 'System Reliability', icon: <Gauge size={18} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-col items-center justify-center p-6 glass-card bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(99,102,241,0.05)] transition-colors duration-300 border border-[rgba(255,255,255,0.04)] hover:border-[rgba(99,102,241,0.2)] rounded-2xl group"
            >
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] group-hover:bg-[#6366F1] group-hover:text-white text-[#A1A1AA] flex items-center justify-center mb-3 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#71717A] text-center">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  Testimonials
// ═══════════════════════════════════════════════════════════

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#09090B]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <motion.span variants={fadeInUp} className="section-label">Client Testimonials</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Don't take our word for it —{' '}
            <span className="gradient-text">hear from our clients</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="#6366F1" color="#6366F1" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[13px] text-[#A1A1AA] leading-relaxed mb-6 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-[#71717A]">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  Technical Expertise & Certifications
// ═══════════════════════════════════════════════════════════

function TechExpertiseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="tech" className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#0F0F12]">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <motion.span variants={fadeInUp} className="section-label">Technical Expertise</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Built on a foundation of{' '}
            <span className="gradient-text">modern engineering</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[15px] max-w-[560px] text-[#71717A]">
            We use production-proven technologies and follow industry best practices to ensure every system we deliver is maintainable, scalable, and secure.
          </motion.p>
        </motion.div>

        {/* Tech Stack Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {Object.entries(TECH_STACK).map(([category, techs], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className="glass-card p-5"
            >
              <h4 className="text-[11px] uppercase font-semibold tracking-wider text-[#6366F1] mb-4">{category}</h4>
              <div className="space-y-3">
                {techs.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[11px] font-bold text-[#A1A1AA]">
                      {tech.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-white">{tech.name}</div>
                      <div className="text-[10px] text-[#52525B]">{tech.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Practices & Partnerships */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.15)] flex items-center justify-center">
                <Shield size={18} className="text-[#22C55E]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-white">Security Practices</h4>
                <p className="text-[11px] text-[#71717A]">Enterprise-grade security built in</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['OWASP Compliance', 'Data Encryption', 'JWT/OAuth Auth', 'Pen Testing', 'Access Control', 'Audit Logging'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                  <Check size={10} className="text-[#22C55E] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Partnerships */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.15)] flex items-center justify-center">
                <Award size={18} className="text-[#6366F1]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-white">Technology Partnerships</h4>
                <p className="text-[11px] text-[#71717A]">Certified platforms we deploy on</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['AWS Cloud Services', 'Vercel Platform', 'Docker Hub', 'GitHub Actions', 'PostgreSQL', 'Stripe Payments'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                  <CheckCircle size={10} className="text-[#6366F1] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 glass-card p-6"
        >
          <h4 className="text-[11px] uppercase font-semibold tracking-wider text-[#6366F1] mb-5">
            Typical Production Architecture
          </h4>
          <div className="flex flex-col gap-3">
            {/* Row 1: Client Layer */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['Web App (Next.js)', 'Mobile App', 'Admin Dashboard'].map((node) => (
                <div key={node} className="arch-node">{node}</div>
              ))}
            </div>
            <div className="arch-connector mx-auto w-32" />
            {/* Row 2: API Layer */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['API Gateway', 'Auth Service', 'Business Logic'].map((node) => (
                <div key={node} className="arch-node border-[rgba(99,102,241,0.2)]">{node}</div>
              ))}
            </div>
            <div className="arch-connector mx-auto w-32" />
            {/* Row 3: Data Layer */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['PostgreSQL', 'Redis Cache', 'File Storage (S3)', 'CDN'].map((node) => (
                <div key={node} className="arch-node">{node}</div>
              ))}
            </div>
            <div className="arch-connector mx-auto w-32" />
            {/* Row 4: Infrastructure */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['Docker Containers', 'CI/CD Pipeline', 'Monitoring & Alerts', 'Auto-Scaling'].map((node) => (
                <div key={node} className="arch-node border-[rgba(34,197,94,0.15)]">{node}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  FAQ Section
// ═══════════════════════════════════════════════════════════

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="faq" className="section-padding border-b border-[rgba(255,255,255,0.06)] bg-[#09090B]">
      <div className="max-w-[800px] mx-auto px-6" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <motion.span variants={fadeInUp} className="section-label justify-center">FAQ</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Questions enterprise buyers{' '}
            <span className="gradient-text">always ask</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`glass-card overflow-hidden transition-all duration-200 ${isOpen ? 'border-[rgba(99,102,241,0.15)]' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center bg-transparent focus:outline-none group"
                >
                  <span className="text-[14px] font-medium text-white group-hover:text-[#818CF8] transition-colors pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#52525B] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#6366F1]' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-[13px] text-[#71717A] leading-relaxed border-t border-[rgba(255,255,255,0.04)] pt-4">
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

// ═══════════════════════════════════════════════════════════
//  Contact Section
// ═══════════════════════════════════════════════════════════

function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [formState, setFormState] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        setFormState({ name: '', email: '', company: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#0F0F12]">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#6366F1]/[0.03] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#818CF8]/[0.02] rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <motion.span variants={fadeInUp} className="section-label">Get Started</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Ready to build something{' '}
            <span className="gradient-text">production-grade?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[15px] max-w-[500px] text-[#71717A]">
            Schedule a free 30-minute architecture review. We'll evaluate your technical requirements and deliver a scoping document within 48 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-3">
            {[
              { icon: <Mail size={16} />, title: 'Email', value: 'True.Solution.21@gmail.com' },
              { icon: <Phone size={16} />, title: 'Phone', value: '+91 7415701497' },
              { icon: <MapPin size={16} />, title: 'Location', value: 'Indore, India' },
            ].map((info, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(99,102,241,0.08)] text-[#6366F1] flex items-center justify-center border border-[rgba(99,102,241,0.15)]">
                  {info.icon}
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#52525B]">{info.title}</div>
                  <div className="text-[13px] text-white font-medium">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Value prop card */}
            <div className="glass-card p-5 border-[rgba(99,102,241,0.1)] bg-[rgba(99,102,241,0.03)]">
              <div className="flex items-center gap-2 mb-3">
                <Rocket size={18} className="text-[#6366F1]" />
                <h5 className="text-[14px] font-semibold text-white">Free Architecture Review</h5>
              </div>
              <ul className="space-y-2">
                {['30-minute technical consultation', 'Scoping document in 48 hours', 'No commitment required'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12px] text-[#A1A1AA]">
                    <Check size={11} className="text-[#22C55E] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">Work Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formState.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">Company</label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Acme Inc."
                    value={formState.company}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">Service *</label>
                  <select
                    name="service"
                    required
                    value={formState.service}
                    onChange={handleChange}
                    className="form-input"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#0F0F12' }}>Select a service...</option>
                    {['Web Platform', 'Mobile App', 'SaaS Product', 'AI/ML Integration', 'UI/UX Design', 'Cloud & DevOps'].map((s) => (
                      <option key={s} value={s} style={{ background: '#0F0F12' }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">Project Details *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project goals, technical requirements, and timeline..."
                  value={formState.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full py-3.5 text-[13px] font-semibold justify-center gap-2"
                style={{ opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.15)] text-[#22C55E] rounded-lg text-[12px] font-medium"
                  >
                    <CheckCircle size={14} />
                    Message sent! We'll respond within 24 hours.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)] text-[#EF4444] rounded-lg text-[12px] font-medium"
                  >
                    <X size={14} />
                    Something went wrong. Please try again or email us directly.
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

// ═══════════════════════════════════════════════════════════
//  Footer
// ═══════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer style={{ background: '#06060A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-start mb-6 md:mb-8 transition-transform duration-300 hover:scale-[1.02] origin-left">
              <img src="/logo.png" alt="TrueSolution Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain" />
            </div>
            <p className="text-[12px] leading-relaxed text-[#52525B] mb-5 max-w-[260px]">
              Production-grade software engineering for funded startups, SMBs, and government organizations.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Solutions', href: '#services' },
                { label: 'Case Studies', href: '#case-studies' },
                { label: 'Process', href: '#process' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[12px] text-[#52525B] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mb-4">Services</h4>
            <ul className="space-y-2">
              {['Web Platforms', 'Mobile Apps', 'SaaS Products', 'AI Integration', 'UI/UX Design', 'Cloud & DevOps'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-[12px] text-[#52525B] hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mb-4">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: <Mail size={12} />, value: 'True.Solution.21@gmail.com' },
                { icon: <Phone size={12} />, value: '+91 7415701497' },
                { icon: <MapPin size={12} />, value: 'Indore, India' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#6366F1] mt-0.5">{item.icon}</span>
                  <span className="text-[12px] text-[#52525B]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-[rgba(255,255,255,0.04)]">
          <p className="text-[11px] text-[#3F3F46] mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} TrueSolution. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-[11px] text-[#3F3F46] hover:text-[#71717A] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
//  Root Component
// ═══════════════════════════════════════════════════════════

export default function TrueSolutionWebsite() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090B] text-[#FAFAFA] font-sans antialiased">
      <div className="noise-overlay" />

      <Navigation />

      <main>
        <HeroSection />
        <ClientLogos />
        <ServicesSection />
        <CaseStudiesSection />
        <ProcessSection />
        <FounderSection />
        <TestimonialsSection />
        <TechExpertiseSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
