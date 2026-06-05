import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Compass, 
  BrainCircuit, 
  Code, 
  Terminal, 
  Globe, 
  Eye, 
  Activity,
  Bookmark
} from 'lucide-react';

// Locally defined SVG icons for build stability
const LinkedInIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function FounderView() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const skillsList = [
    "React", "JavaScript", "Tailwind CSS", "Flutter",
    "Node.js", "Express", "MongoDB", "AI",
    "Web3", "Rust", "UI/UX", "Storytelling"
  ];

  const cardSkills = [
    "React", "JavaScript", "Flutter", "AI", 
    "Web3", "Cybersecurity", "UI/UX", "Storytelling"
  ];

  const timelineItems = [
    {
      title: "Started with app and web development",
      description: "Began crafting custom responsive sites and mobile app modules from scratch."
    },
    {
      title: "Explored AI and machine learning",
      description: "Built semantic prompt structures, visual heuristics models, and model integrations."
    },
    {
      title: "Learned full-stack technologies",
      description: "Designed back-end pipelines, database storage configurations, and REST interfaces."
    },
    {
      title: "Experimented with Web3 and Rust",
      description: "Compiled smart contract models, crypto modules, and low-level system threads."
    },
    {
      title: "Built immersive learning experiences",
      description: "Iterated on visual explanations, call stack simulators, and code animations."
    },
    {
      title: "Created JSVerse",
      description: "Launched the cinematic interactive universe to completely change how devs learn JS."
    }
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-0 w-[350px] h-[350px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-24"
      >
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text details (Col-7) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#7C3AED]/35 bg-[#7C3AED]/10 text-[10px] font-bold uppercase tracking-wider text-space-textPrimary">
              <Sparkles className="h-3 w-3 text-space-yellow animate-pulse" />
              <span>Built by a Young Developer</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight leading-none">
              Meet <span className="text-gradient-purple-yellow">Vansh Khubchandani</span>
            </h1>

            <p className="text-space-textSecondary text-sm sm:text-base font-semibold leading-relaxed">
              16-year-old developer exploring AI, full-stack development, Web3, cybersecurity, storytelling, and futuristic learning experiences.
            </p>

            <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed">
              JSVerse was created to transform how developers understand JavaScript through visual thinking, storytelling, first principles, and immersive experiences.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/vansh-khubchandani-492702332/"
                target="_blank"
                rel="noreferrer"
                className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-yellow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <LinkedInIcon className="h-4 w-4 text-black" />
                <span>View LinkedIn</span>
                <ArrowRight className="h-3.5 w-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://x.com/Vansh_k21"
                target="_blank"
                rel="noreferrer"
                className="group px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-space-textPrimary bg-white/5 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 active:scale-95"
              >
                <TwitterIcon className="h-4 w-4 text-white" />
                <span>Follow on X</span>
              </a>
            </div>
          </motion.div>

          {/* Right Creator Card (Col-5) */}
          <motion.div 
            variants={itemVariants}
            animate={{ y: [-6, 6] }}
            transition={{ 
              y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 5,
                ease: 'easeInOut'
              }
            }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Backglow */}
            <div className="absolute inset-4 rounded-[32px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#FACC15]/10 blur-3xl opacity-60 pointer-events-none -z-10 animate-pulse"></div>

            {/* Glowing Backdrop Border wrap */}
            <div className="relative p-[1px] rounded-[32px] bg-gradient-to-tr from-[#7C3AED]/25 via-white/5 to-[#FACC15]/25 shadow-[0_0_40px_rgba(124,58,237,0.15)] overflow-hidden">
              <div className="rounded-[31px] bg-[#0A0F24]/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 text-left">
                
                {/* Header Node */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-space-yellow tracking-widest uppercase font-bold">Node Developer</span>
                    <h3 className="font-display font-black text-xl text-white">Vansh K.</h3>
                  </div>

                  {/* Pulsing Active Status Indicator */}
                  <div className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/25 flex items-center gap-1.5 text-[9px] font-mono text-green-400 font-bold uppercase tracking-wider select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span>ONLINE</span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5"></div>

                {/* Profile detail */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-space-textSecondary uppercase tracking-widest">Designation</span>
                  <p className="text-xs font-semibold text-white">AI & Full-Stack Developer</p>
                </div>

                {/* Skills list inside card */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono text-space-textSecondary uppercase tracking-widest block">Primary Vectors</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cardSkills.map((s, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.8 rounded-md bg-white/5 border border-white/5 font-mono text-[9px] text-space-textPrimary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-white/5"></div>

                {/* Micro metrics */}
                <div className="flex justify-between items-center text-[9px] font-mono text-space-textSecondary">
                  <span>SYSTEM_CODE: V8_SANDBOX</span>
                  <span>BUILD: STABLE</span>
                </div>

              </div>
            </div>
          </motion.div>

        </section>

        {/* VISION SECTION */}
        <motion.section 
          variants={itemVariants}
          className="relative py-12 px-6 sm:px-8 rounded-3xl glass-card-premium border border-[#7C3AED]/20 bg-gradient-to-b from-[#7C3AED]/5 to-transparent space-y-6 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/25 text-[#C084FC] mx-auto">
            <BrainCircuit className="h-5 w-5" />
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            The Vision Behind JSVerse
          </h2>

          <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-space-textSecondary leading-relaxed">
            <p className="font-semibold text-white">
              "Most learning platforms teach syntax. JSVerse was created to teach understanding."
            </p>
            <p>
              Instead of overwhelming beginners with repetitive exercises, the platform explains JavaScript using: storytelling, analogies, visual mental models, experimentation, and immersive learning.
            </p>
            <p>
              JSVerse is designed to feel less like a course platform and more like a futuristic operating system for learning.
            </p>
          </div>
        </motion.section>

        {/* TIMELINE SECTION */}
        <motion.section variants={itemVariants} className="space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-[#7C3AED] font-display font-bold tracking-wider uppercase">
              <Compass className="h-4 w-4" /> EXPERIENCE PATHWAY
            </div>
            <h2 className="font-display font-black text-3xl text-white tracking-tight">
              Journey
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 sm:pl-10 space-y-8">
            
            {/* Vertical glowing timeline line */}
            <div className="absolute left-[8px] sm:left-[10px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#7C3AED] via-[#FACC15] to-[#7C3AED]/20 -z-10 shadow-[0_0_10px_rgba(124,58,237,0.3)]"></div>

            {timelineItems.map((item, idx) => (
              <div key={idx} className="relative group text-left">
                
                {/* Node indicator */}
                <div className="absolute -left-[32px] sm:-left-[34px] top-1.5 w-4 h-4 rounded-full border-2 border-space-bg bg-[#050816] shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] group-hover:bg-[#FACC15] shadow-[0_0_8px_#7C3AED]"></span>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-[#7C3AED]/20 hover:bg-[#7C3AED]/5 transition-all duration-300">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white mb-1 uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-space-textSecondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </motion.section>

        {/* SKILLS GRID */}
        <motion.section variants={itemVariants} className="space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-space-yellow font-display font-bold tracking-wider uppercase">
              <Terminal className="h-4 w-4" /> CORE TECHNOLOGY INDEX
            </div>
            <h2 className="font-display font-black text-3xl text-white tracking-tight">
              Skills Matrix
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {skillsList.map((skill, idx) => (
              <div 
                key={idx}
                className="glass-card-premium p-4 rounded-xl border border-white/5 flex items-center justify-center text-center hover:border-[#7C3AED]/35 hover:bg-[#7C3AED]/5 transition-all duration-300 group cursor-default"
              >
                <span className="font-display font-bold text-[10px] tracking-widest uppercase text-space-textSecondary group-hover:text-space-yellow group-hover:shadow-[0_0_8px_rgba(250,204,21,0.2)] transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SOCIAL CARDS SECTION */}
        <motion.section variants={itemVariants} className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-display font-black text-2xl text-white tracking-tight uppercase tracking-wider">
              Secure Communications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/vansh-khubchandani-492702332/"
              target="_blank"
              rel="noreferrer"
              className="glass-card-premium p-5 rounded-2xl border border-white/5 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all duration-300 flex items-center gap-4 text-left group"
            >
              <div className="p-3 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/25 text-[#C084FC] group-hover:text-white transition-colors">
                <LinkedInIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">LinkedIn</h4>
                <span className="text-[10px] text-space-textSecondary font-mono block mt-0.5">/in/vansh-khubchandani</span>
              </div>
            </a>

            {/* X (Twitter) Card */}
            <a
              href="https://x.com/Vansh_k21"
              target="_blank"
              rel="noreferrer"
              className="glass-card-premium p-5 rounded-2xl border border-white/5 hover:border-[#FACC15]/40 hover:bg-[#FACC15]/5 transition-all duration-300 flex items-center gap-4 text-left group"
            >
              <div className="p-3 rounded-xl bg-[#FACC15]/15 border border-[#FACC15]/25 text-space-yellow group-hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">X / Twitter</h4>
                <span className="text-[10px] text-space-textSecondary font-mono block mt-0.5">@Vansh_k21</span>
              </div>
            </a>

          </div>
        </motion.section>

      </motion.div>

    </div>
  );
}
