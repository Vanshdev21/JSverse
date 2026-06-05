import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Compass, 
  Activity, 
  Terminal, 
  BrainCircuit, 
  Code, 
  Globe, 
  Heart, 
  Coffee, 
  Copy, 
  Check, 
  HelpCircle,
  AlertTriangle,
  Play,
  Share2,
  Bookmark,
  BookOpen
} from 'lucide-react';

export default function SupportView() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("vanshkhubchandani@fam");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const visionCards = [
    {
      title: "Cinematic Story Chapters",
      description: "Future chapters will feel like cinematic experiences with emotional storytelling, immersive explanations, and visual analogies instead of traditional tutorials.",
      icon: Play,
      color: "from-purple-500/20 to-indigo-500/5",
      borderColor: "group-hover:border-purple-500/40",
      glowColor: "rgba(168, 85, 247, 0.15)"
    },
    {
      title: "AI Visualized Concepts",
      description: "Complex topics like closures, event loops, memory heaps, async JavaScript, and execution contexts will be transformed into animated visual systems powered by AI.",
      icon: BrainCircuit,
      color: "from-amber-500/20 to-yellow-500/5",
      borderColor: "group-hover:border-amber-500/40",
      glowColor: "rgba(245, 158, 11, 0.15)"
    },
    {
      title: "Interactive Learning Systems",
      description: "Users will explore JavaScript through futuristic playgrounds, simulations, visual experiments, and interactive systems designed for deep understanding.",
      icon: Terminal,
      color: "from-cyan-500/20 to-blue-500/5",
      borderColor: "group-hover:border-cyan-500/40",
      glowColor: "rgba(6, 182, 212, 0.15)"
    },
    {
      title: "Immersive AI Videos",
      description: "Every lecture will eventually include AI-generated cinematic videos with animations, storytelling, futuristic visuals, and intuitive explanations.",
      icon: Cpu,
      color: "from-pink-500/20 to-rose-500/5",
      borderColor: "group-hover:border-pink-500/40",
      glowColor: "rgba(236, 72, 153, 0.15)"
    }
  ];

  const roadmapItems = [
    { title: "JavaScript Fundamentals Universe", status: "completed", desc: "Core language matrix, primitives, operators, and functions." },
    { title: "Interactive Playground Expansion", status: "completed", desc: "Advanced web compiler sandbox modules with console streaming." },
    { title: "Event Loop Visualizer", status: "active", desc: "Visualizing Web APIs, macro/microtask queues, call stack cycles." },
    { title: "Memory Heap Simulator", status: "upcoming", desc: "Visualizing variable garbage collection and heap references." },
    { title: "AI Story Videos", status: "upcoming", desc: "Generating cinematic animated videos for complex scripting topics." },
    { title: "React Universe", status: "upcoming", desc: "Interactive virtual DOM trees and fiber reconciliation nodes." },
    { title: "Web3 Universe", status: "upcoming", desc: "Low-level smart contracts and blockchain client transactions." },
    { title: "Cybersecurity Story Modules", status: "upcoming", desc: "Interactive network exploitation and encryption code chambers." },
    { title: "AI Learning Mentor", status: "upcoming", desc: "Fully integrated coding tutor contextually scanning codebases." }
  ];

  // Floating background particles
  const particles = Array.from({ length: 15 });

  return (
    <div className="relative pt-28 pb-24 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#050816]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[5%] left-0 w-[450px] h-[450px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[380px] h-[380px] ambient-yellow-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>

      {/* Floating particles background loops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/25"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-28"
      >
        
        {/* HERO SECTION */}
        <motion.section variants={itemVariants} className="text-center space-y-6 max-w-3xl mx-auto relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[10px] font-bold uppercase tracking-wider text-space-textPrimary shadow-[0_0_15px_rgba(124,58,237,0.1)]">
            <Sparkles className="h-3.5 w-3.5 text-space-yellow animate-pulse" />
            <span>Building the Future of Learning</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Help Build The <span className="text-gradient-purple-yellow">JSVerse</span> Universe
          </h1>

          <p className="text-space-textSecondary text-sm sm:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
            JSVerse is evolving into an immersive learning platform where JavaScript and computer science concepts are taught through cinematic storytelling, AI-generated visuals, interactive simulations, and futuristic educational experiences.
          </p>

          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-radial from-[#7C3AED]/20 to-transparent blur-2xl -z-10" />
        </motion.section>

        {/* VISION SECTION */}
        <section className="space-y-12">
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              The Immersive Vision
            </h2>
            <p className="text-space-textSecondary text-xs sm:text-sm max-w-xl mx-auto">
              How JSVerse aims to redefine technical learning from syntax memorization to emotional comprehension.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`group relative p-6 sm:p-8 rounded-3xl glass-card-premium border border-white/5 bg-gradient-to-br ${card.color} transition-all duration-300 overflow-hidden flex flex-col justify-between`}
                  style={{
                    boxShadow: `inset 0 1px 1px 0 rgba(255,255,255,0.05)`
                  }}
                >
                  {/* Decorative Glow */}
                  <div 
                    className="absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundColor: card.glowColor }}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0 w-12 h-12 flex items-center justify-center text-white group-hover:text-space-yellow group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-space-yellow transition-colors">
                      {card.title}
                    </h3>
                    
                    <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ROADMAP SECTION */}
        <section className="space-y-12">
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              The Future Roadmap
            </h2>
            <p className="text-space-textSecondary text-xs sm:text-sm max-w-xl mx-auto">
              Our orbital milestones planned to scale JSVerse into a multiversal learning node.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto pl-8 sm:pl-10 space-y-8">
            {/* Timeline Vertical Connecting Vector */}
            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#7C3AED] via-[#FACC15] to-[#7C3AED]/20" />

            {roadmapItems.map((item, index) => {
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl glass-card-premium border border-white/5 hover:border-[#7C3AED]/35 hover:bg-white/5 transition-all duration-300 gap-4 text-left"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[31px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-[#050816] ${
                      isCompleted ? 'bg-[#7C3AED] shadow-[0_0_10px_#7C3AED]' :
                      isActive ? 'bg-[#FACC15] animate-ping' :
                      'bg-white/20'
                    }`} />
                    {isActive && (
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-[#FACC15] z-20" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-mono font-bold uppercase tracking-wider ${
                        isCompleted ? 'bg-[#7C3AED]/20 text-[#C084FC] border border-[#7C3AED]/25' :
                        isActive ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/25' :
                        'bg-white/5 text-space-textSecondary'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-space-textSecondary text-[11px] sm:text-xs">
                      {item.desc}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <span className="font-mono text-[10px] text-space-textSecondary/50 font-bold uppercase tracking-wider">
                      STAGE {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CREATOR MESSAGE SECTION */}
        <motion.section 
          variants={itemVariants}
          className="relative max-w-3xl mx-auto rounded-3xl glass-card-premium border border-white/5 p-8 sm:p-12 text-center bg-gradient-to-b from-[#7C3AED]/5 to-transparent space-y-6 overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-[#7C3AED]/5 blur-3xl pointer-events-none -z-10" />

          <div className="w-12 h-12 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/25 flex items-center justify-center mx-auto text-[#C084FC]">
            <Heart className="h-5 w-5 fill-[#C084FC]" />
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Why I’m Building JSVerse
          </h3>

          <div className="space-y-4 font-display text-sm sm:text-lg leading-relaxed text-space-textPrimary italic max-w-2xl mx-auto">
            <p className="font-extrabold text-[#C084FC]">
              &ldquo;Most platforms teach syntax. JSVerse was created to teach understanding.&rdquo;
            </p>
            <p className="text-space-textSecondary text-xs sm:text-sm">
              &ldquo;The goal is to transform difficult programming concepts into immersive experiences that feel visual, interactive, emotional, and unforgettable.&rdquo;
            </p>
            <p className="text-[#FACC15] font-bold text-xs sm:text-sm tracking-wide">
              &ldquo;Programming education should feel like exploring a universe — not memorizing documentation.&rdquo;
            </p>
          </div>
        </motion.section>

        {/* SUPPORT SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Support description details (Col-6) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 rounded-3xl glass-card-premium border border-white/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white/5 to-transparent text-left"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
                <Coffee className="h-5 w-5 text-space-yellow" />
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Support The Universe ☕
                </h3>
              </div>

              <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed">
                If you believe education can become more immersive, visual, and inspiring, you can support the future development of JSVerse.
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C084FC] uppercase block">YOUR SUPPORT HELPS CREATE:</span>
                <ul className="space-y-2.5">
                  {[
                    "cinematic AI-generated story videos",
                    "interactive visual simulations",
                    "animated explanations",
                    "futuristic educational experiences",
                    "immersive learning systems"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-space-textSecondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] shadow-[0_0_6px_#FACC15] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-2 text-[10px] font-mono text-space-textSecondary">
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>Engineered with passion for learners globally.</span>
            </div>
          </motion.div>

          {/* Card 2: UPI SUPPORT CARD (Col-6) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 rounded-3xl glass-card-premium border border-[#7C3AED]/25 bg-[#050816]/75 shadow-glow-purple p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-pulse" />

            <div className="w-full space-y-6 z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/25 flex items-center justify-center text-[#C084FC] shadow-glow-purple">
                <Coffee className="h-5 w-5" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-black text-xl text-white">
                  Support via UPI ☕
                </h3>
                <p className="text-space-textSecondary text-xs leading-relaxed max-w-sm mx-auto">
                  Support JSVerse directly and help build the future of cinematic programming education.
                </p>
              </div>

              {/* Futuristic Holographic QR Code Box */}
              <div className="relative w-44 h-44 rounded-2xl border border-white/10 bg-black/50 p-3.5 flex items-center justify-center group overflow-hidden">
                {/* Neon scanner sweeping overlay */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FACC15] shadow-[0_0_10px_#FACC15] animate-[scan_3s_ease-in-out_infinite]" />
                {/* Actual QR Code image */}
                <img 
                  src="/support-qr.jpg" 
                  alt="JSVerse Support UPI QR" 
                  className="w-full h-full object-cover rounded-lg relative opacity-90 group-hover:scale-95 transition-transform duration-500"
                />

                {/* Target Corners */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#7C3AED]" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#7C3AED]" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#7C3AED]" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#7C3AED]" />
              </div>

              {/* UPI ID Panel with Copy Action */}
              <div className="w-full max-w-sm space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-black/40 font-mono text-xs text-white">
                  <span className="text-space-textSecondary select-all">vanshkhubchandani@fam</span>
                  
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-space-textSecondary hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-[9px] font-bold text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold">Copy UPI ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 w-full flex justify-center text-[10px] text-space-textSecondary/50 font-mono">
              SECURE UPI PAYMENTS NODE
            </div>
          </motion.div>

        </section>

      </motion.div>
    </div>
  );
}
