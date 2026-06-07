import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Terminal, 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Layers, 
  Activity, 
  Play, 
  RotateCcw,
  RefreshCw
} from 'lucide-react';

export default function StoryView() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // States
  const [activeSection, setActiveSection] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [skipRequested, setSkipRequested] = useState(false);
  
  // Interactive Section 3 (Read-only click test)
  const [clickCount, setClickCount] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Interactive Section 4 (Forms Submitted Blindly)
  const [formState, setFormState] = useState('idle'); // idle, submitting, success
  
  // Typewriter effect state for Section 1
  const [typedHTML, setTypedHTML] = useState('');
  const targetHTML = `<h1>Hello World</h1>\n<p>The web was static...</p>\n<!-- No interactivity allowed -->`;

  const musicRef = useRef(null);

  // Particle colors based on active section
  // 0: Deep CRT dark, 1: 1993, 2: Static blue, 3: glitch amber, 4: amber/gold, 5: bright gold/pulse, 6: JS purple/yellow, 7: JSVerse cosmic
  const sectionColors = [
    { primary: '#ffffff', secondary: '#333333', ambient: 'rgba(255,255,255,0.02)' }, // before JS
    { primary: '#60A5FA', secondary: '#1E3A8A', ambient: 'rgba(96,165,250,0.03)' },  // 1993
    { primary: '#EF4444', secondary: '#7F1D1D', ambient: 'rgba(239,68,68,0.03)' },   // click freeze
    { primary: '#F59E0B', secondary: '#78350F', ambient: 'rgba(245,158,11,0.03)' },  // Forms blindly
    { primary: '#FACC15', secondary: '#78350F', ambient: 'rgba(250,204,21,0.06)' },  // Countdown
    { primary: '#A78BFA', secondary: '#FACC15', ambient: 'rgba(124,58,237,0.12)' }, // Awakens
    { primary: '#7C3AED', secondary: '#FACC15', ambient: 'rgba(124,58,237,0.15)' }, // Core JS
    { primary: '#C084FC', secondary: '#FACC15', ambient: 'rgba(124,58,237,0.2)' }   // JSVerse
  ];

  const toggleAudio = () => {
    // Lazy initialize HTML5 audio element for music.mp3
    if (!musicRef.current) {
      const audioObj = new Audio('/music.mp3');
      audioObj.loop = true;
      audioObj.volume = 0.35;
      musicRef.current = audioObj;
    }

    if (isAudioEnabled) {
      musicRef.current.pause();
      setIsAudioEnabled(false);
    } else {
      musicRef.current.play().catch(err => console.log("Music play blocked:", err));
      setIsAudioEnabled(true);
    }
  };

  // Close audio on unmount
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, []);

  // Section 1 HTML Monospace Typewriter effect
  useEffect(() => {
    if (activeSection === 0) {
      let index = 0;
      setTypedHTML('');
      const interval = setInterval(() => {
        setTypedHTML((prev) => prev + targetHTML.charAt(index));
        index++;
        if (index >= targetHTML.length) {
          clearInterval(interval);
        }
      }, 45);
      return () => clearInterval(interval);
    }
  }, [activeSection]);

  // Handle section snapping and scroll updates
  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const index = Math.round(scrollTop / height);
    if (index !== activeSection && index >= 0 && index <= 7) {
      setActiveSection(index);
    }
  };

  // Skip Intro
  const handleSkipIntro = () => {
    setSkipRequested(true);
    const finalSection = containerRef.current?.querySelector('#section-8');
    if (finalSection) {
      finalSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Particle System Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic color helper
    let currentPrimary = sectionColors[0].primary;
    let currentSecondary = sectionColors[0].secondary;

    const particles = [];
    // Instantiate 100 floating star particles
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.6 - 0.2,
        brightness: Math.random()
      });
    }

    const drawParticles = () => {
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Smooth color transitions
      const targetColors = sectionColors[activeSection] || sectionColors[0];
      
      // Interpolate colors smoothly
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
      };

      const primaryRgb = hexToRgb(targetColors.primary);
      
      // Draw grid overlay for ambient retro aesthetic
      ctx.strokeStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.025)`;
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Ambient circular neon gradient glow
      const gradient = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, width * 0.8);
      gradient.addColorStop(0, targetColors.ambient);
      gradient.addColorStop(1, 'rgba(5, 8, 22, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw floating space particles
      particles.forEach((p) => {
        // Star color shifts slowly with section colors
        ctx.fillStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${p.brightness * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // High energy burst simulation in section 5/6
        if (activeSection === 5 || activeSection === 6) {
          p.y += p.speedY * 3;
          p.x += p.speedX * 3;
        } else {
          p.y += p.speedY;
          p.x += p.speedX;
        }

        // Loop boundaries
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSection]);

  // Section 3 Interactive logic
  const handleFakeClick = () => {
    if (isFrozen) return;
    
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setIsFrozen(true);
        setGlitchActive(true);
        // Play longer crash sound
        setTimeout(() => setGlitchActive(false), 800);
      }
      return next;
    });
  };

  const handleResetFreeze = () => {
    setIsFrozen(false);
    setClickCount(0);
  };

  // Section 4 Interactive logic
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState === 'submitting') return;
    
    setFormState('submitting');

    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    }, 2500);
  };

  // 10-day countdown items for Section 5
  const countdownDays = [
    { num: 10, label: "Variables & Scopes form" },
    { num: 9, label: "Functions become Objects" },
    { num: 8, label: "Prototypal Inheritance architecture" },
    { num: 7, label: "Lexical scoping compiled" },
    { num: 6, label: "Dynamic memory bounds locked" },
    { num: 5, label: "Web browser console bridge" },
    { num: 4, label: "First compilation run" },
    { num: 3, label: "Bugs fixed, specs polished" },
    { num: 2, label: "Engine integrated into Netscape" },
    { num: 1, label: "The core is ready." }
  ];

  // Dynamic values calculated from active scroll snapping indices
  const getProgressDotClass = (idx) => {
    return `w-2 h-2 rounded-full transition-all duration-300 ${
      activeSection === idx 
        ? 'bg-[#FACC15] scale-125 shadow-[0_0_10px_rgba(250,204,21,0.8)]' 
        : 'bg-white/20 hover:bg-white/40'
    }`;
  };

  return (
    <div className="relative w-full h-screen bg-[#050816] text-white overflow-hidden font-sans select-none">
      
      {/* Background Starfield Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Retro scanline Overlay for Section 1-4 */}
      {activeSection < 4 && (
        <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03] z-10" />
      )}

      {/* Floating Header UI */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        
        {/* Left Back Arrow */}
        <button
          onClick={() => navigate('/')}
          className="pointer-events-auto flex items-center gap-2 text-[10px] font-mono text-white/50 hover:text-white uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit Story</span>
        </button>

        {/* Right Controls */}
        <div className="pointer-events-auto flex items-center gap-4">
          
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[10px] font-mono text-white/70 hover:text-white uppercase tracking-widest transition-all"
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-green-400 animate-pulse" />
                <span>Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-white/30" />
                <span>Audio Off</span>
              </>
            )}
          </button>

          {/* Skip Intro */}
          {activeSection < 7 && (
            <button
              onClick={handleSkipIntro}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[10px] font-bold text-[#C084FC] hover:text-white hover:bg-[#7C3AED]/20 uppercase tracking-wider transition-all"
            >
              <span>Skip Intro</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

        </div>

      </div>

      {/* Floating Right Page Progress Indicator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => (
          <button
            key={val}
            onClick={() => {
              containerRef.current?.children[val]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={getProgressDotClass(val)}
            title={`Scene ${val + 1}`}
          />
        ))}
      </div>

      {/* FULLSCREEN SCROLL SNAPPING CONTAINER */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth relative z-10 scrollbar-none"
      >
        
        {/* SECTION 1: BEFORE JAVASCRIPT */}
        <section 
          id="section-1" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative overflow-hidden"
        >
          <div className="max-w-4xl text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: false }}
              className="space-y-4"
            >
              <h4 className="text-[11px] font-mono text-[#7C3AED] uppercase tracking-[0.3em] font-bold">
                Origin Story // Chapter I
              </h4>
              <h2 className="font-display font-black text-4xl sm:text-7xl leading-tight text-white tracking-tight">
                BEFORE JAVASCRIPT,<br />
                <span className="text-white/30">THE WEB WAS SILENT.</span>
              </h2>
            </motion.div>

            {/* Simulated HTML Typing Box */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-lg mx-auto bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-[11px] text-emerald-400 text-left shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                <span className="text-[9px] text-white/30 uppercase tracking-widest pl-2">index.html (Static)</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed select-text">
                {typedHTML}
                <span className="animate-pulse font-bold text-white pl-0.5">|</span>
              </pre>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ delay: 0.8 }}
              className="text-xs sm:text-sm text-space-textSecondary max-w-xl mx-auto leading-relaxed"
            >
              Pages could display formatted layouts, but they were static documents. Digital papers floating in the void. They could not interact, remember, or react.
            </motion.p>
          </div>

          {/* Bottom Prompt helper */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] animate-bounce">
            Scroll to begin journey
          </div>
        </section>

        {/* SECTION 2: 1993 - THE RETRO BROWSER */}
        <section 
          id="section-2" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative"
        >
          <div className="max-w-4xl text-center space-y-8 w-full">
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono text-[#FACC15] uppercase tracking-[0.3em] font-bold">
                1993 // The Dawn
              </h4>
              <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight leading-tight">
                THE INTERNET EXISTED.<br />
                <span className="text-white/20">BUT ONLY FOR READING.</span>
              </h2>
              <p className="text-xs text-space-textSecondary max-w-xl mx-auto">
                Connecting to Netscape via dial-up modems. Raw HTML layout without any style, design, or logical actions.
              </p>
            </div>

            {/* Vintage Browser Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="w-full max-w-2xl mx-auto bg-[#D1D5DB] text-black border-4 border-[#9CA3AF] rounded-lg shadow-2xl overflow-hidden text-left"
            >
              {/* Browser Window Header */}
              <div className="bg-[#9CA3AF] p-2 flex items-center justify-between border-b-2 border-black/20">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-[10px] font-bold font-mono pl-3 text-black/70">Mosaic Web Browser v1.0</span>
                </div>
                <div className="w-20 h-4 bg-white rounded border border-black/25"></div>
              </div>

              {/* Navigation URL Bar */}
              <div className="bg-[#E5E7EB] p-2 flex items-center gap-2 border-b border-black/10">
                <span className="text-[10px] font-bold uppercase text-black/50 pl-1">URL:</span>
                <div className="bg-white px-2 py-0.5 text-[10px] font-mono rounded flex-grow border border-black/20">
                  http://www.cern.ch/origin-of-web.html
                </div>
              </div>

              {/* Page Content area (Raw 1993 HTML render look) */}
              <div className="bg-[#F3F4F6] p-6 min-h-[180px] font-serif space-y-4 text-xs select-text">
                <h1 className="text-xl font-bold text-blue-900 border-b border-black/10 pb-1">Welcome to the World Wide Web</h1>
                <p>
                  The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.
                </p>
                <div className="space-y-1 pl-4">
                  <div>• <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-700 underline hover:text-red-700">What is hypertext?</a></div>
                  <div>• <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-700 underline hover:text-red-700">How can I build a web server?</a></div>
                </div>
                <button className="bg-[#E5E7EB] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 px-3 py-1 font-sans font-bold text-[10px] active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white">
                  Send Feedback (N/A)
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: YOU COULD READ, NOT INTERACT */}
        <section 
          id="section-3" 
          className={`w-full h-screen snap-start flex flex-col items-center justify-center px-4 transition-all duration-300 ${
            glitchActive ? 'bg-red-950/20' : ''
          }`}
        >
          <div className="max-w-4xl text-center space-y-8 w-full">
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono text-red-400 uppercase tracking-[0.3em] font-bold">
                Chapter II // The Barrier
              </h4>
              <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight leading-tight">
                YOU COULD READ.<br />
                <span className="text-red-500">BUT NOTHING ANSWERED.</span>
              </h2>
              <p className="text-xs text-space-textSecondary max-w-xl mx-auto">
                Try clicking the action buttons inside the mock browser below. Watch what happens without client-side scripts.
              </p>
            </div>

            {/* Interactive Limited Browser */}
            <div className="w-full max-w-lg mx-auto bg-[#1F2937] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative text-left">
              {/* Top controls */}
              <div className="bg-[#111827] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-[10px] font-mono text-white/40">Read-Only State // Live Simulator</span>
                <RefreshCw className={`h-3.5 w-3.5 text-white/40 ${isFrozen ? 'animate-spin text-red-400' : ''}`} />
              </div>

              {/* Simulator screen */}
              <div className="p-6 space-y-4">
                <p className="text-[11px] text-white/60 font-mono">
                  {isFrozen 
                    ? "> PROCESS STATE: CRASHED/FROZEN // NO EVENT LOOP FOUND" 
                    : `> Click the interactive action buttons below (${clickCount}/3)`
                  }
                </p>

                {/* Simulated Web Elements */}
                <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/80">Toggle Theme Color</span>
                    <button 
                      onClick={handleFakeClick}
                      className="px-3 py-1 rounded bg-[#7C3AED] hover:bg-[#6D28D9] text-[10px] font-bold text-white tracking-wide transition-all active:scale-95"
                    >
                      Change Color
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-xs text-white/80">Interactive Counter</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#FACC15]">0</span>
                      <button 
                        onClick={handleFakeClick}
                        className="px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white"
                      >
                        + Increment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dynamic Screen Glitch or Static Freeze status */}
                <AnimatePresence>
                  {isFrozen && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs flex justify-between items-center"
                    >
                      <span className="font-mono">Webpage unresponsive. Reload to reset.</span>
                      <button 
                        onClick={handleResetFreeze}
                        className="text-[10px] underline hover:text-white uppercase font-bold"
                      >
                        Reload
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-space-textSecondary max-w-lg mx-auto italic">
              "Without logic inside the browser, clicking did nothing locally. The computer sat idle, waiting for a server request that had to fetch the entire document from scratch."
            </p>
          </div>
        </section>

        {/* SECTION 4: FORMS SUBMITTED BLINDLY */}
        <section 
          id="section-4" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative"
        >
          <div className="max-w-4xl text-center space-y-8 w-full">
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono text-orange-400 uppercase tracking-[0.3em] font-bold">
                Chapter III // The Pipeline
              </h4>
              <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight leading-tight">
                FORMS SUBMITTED BLINDLY.<br />
                <span className="text-white/20">WAITING ON THE SERVER.</span>
              </h2>
              <p className="text-xs text-space-textSecondary max-w-xl mx-auto">
                Submit the mock email subscription form below. Experience the mandatory delay and full-page refresh loop of the old internet.
              </p>
            </div>

            {/* Simulated Form reload */}
            <div className="w-full max-w-md mx-auto bg-[#1F2937] border border-white/10 rounded-xl overflow-hidden shadow-2xl text-left">
              <div className="bg-[#111827] px-4 py-2.5 border-b border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                Form Submission Simulator
              </div>

              <div className="p-6 space-y-4">
                {formState === 'idle' && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-mono">Newsletter Signup</label>
                      <input 
                        required
                        type="email" 
                        placeholder="enterYourEmail@domain.com"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-[#7C3AED] text-xs font-mono outline-none text-white transition-colors"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white uppercase tracking-wider transition-all"
                    >
                      Subscribe
                    </button>
                  </form>
                )}

                {formState === 'submitting' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="h-6 w-6 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin"></div>
                    <span className="text-xs font-mono text-white/60">POSTing signup request to server...</span>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.25em]">Awaiting full page response</span>
                  </motion.div>
                )}

                {formState === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-3"
                  >
                    <div className="mx-auto h-8 w-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-bold">✓</div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">SERVER RESPONSE: ACCEPTED</h4>
                      <p className="text-[10px] text-white/60 font-mono">Whole DOM rebuilt. Layout reset complete.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <p className="text-xs text-space-textSecondary max-w-lg mx-auto italic">
              "Even if you typed a single letter wrong, the server would rebuild the entire layout and send it back. No instant validation existed."
            </p>
          </div>
        </section>

        {/* SECTION 5: THE 10-DAY COUNTDOWN */}
        <section 
          id="section-5" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative bg-gradient-to-b from-[#050816] via-[#1A120B] to-[#050816]"
        >
          {/* Spotlight overlay effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

          <div className="max-w-4xl text-center space-y-8 w-full">
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono text-[#FACC15] uppercase tracking-[0.3em] font-bold">
                May 1995 // The Directive
              </h4>
              <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight leading-none">
                NETSCAPE GAVE ONE ENGINEER<br />
                <span className="text-[#FACC15] font-extrabold">10 DAYS TO BREATHE LIFE.</span>
              </h2>
              <p className="text-xs text-white/60 max-w-xl mx-auto">
                Brendan Eich sat down to code a new scripting language for the browser. A sprint that changed technological history.
              </p>
            </div>

            {/* Scroll-snapping interactive Countdown days list */}
            <div className="relative w-full max-w-xl mx-auto h-[160px] overflow-y-auto border border-white/5 bg-black/40 rounded-xl flex flex-col snap-y snap-mandatory scrollbar-thin">
              <div className="sticky top-0 left-0 right-0 py-1.5 px-3 bg-black/60 border-b border-white/5 text-[9px] font-mono text-[#FACC15] uppercase tracking-widest text-left z-20">
                10-Day Sprint Logs // Scroll to navigate days
              </div>

              {countdownDays.map((day) => (
                <div 
                  key={day.num}
                  className="w-full h-[120px] flex-shrink-0 snap-start flex items-center justify-between px-8 border-b border-white/5 text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-[#EAB308]">
                      {day.num}
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-[#FACC15] uppercase tracking-widest font-bold">Day Remaining</div>
                      <div className="text-xs text-white/80 font-mono mt-0.5">{day.label}</div>
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Compiling...
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              ↑ Scroll list above to inspect the countdown sprint ↑
            </p>
          </div>
        </section>

        {/* SECTION 6: THE WEB AWAKENS */}
        <section 
          id="section-6" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative overflow-hidden"
        >
          {/* Radial explosion background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#FACC15]/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

          <div className="max-w-4xl text-center space-y-6 z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h4 className="text-[11px] font-mono text-[#C084FC] uppercase tracking-[0.3em] font-bold">
                The Breakthrough // 1995
              </h4>
              <h2 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none">
                THE WEB COULD<br />
                <span className="text-gradient-purple-yellow">FINALLY THINK.</span>
              </h2>
            </motion.div>

            {/* Glowing Awakened layout mockup */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-lg mx-auto p-1 rounded-xl bg-gradient-to-tr from-[#7C3AED]/50 to-[#FACC15]/50 shadow-[0_0_50px_rgba(124,58,237,0.3)]"
            >
              <div className="bg-[#0b0c16] rounded-[10px] p-6 space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#FACC15] uppercase tracking-widest">Client-Side Script Enabled</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#7C3AED] to-[#FACC15]" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-white/40">
                    <span>compiling index.js</span>
                    <span>100% active</span>
                  </div>
                </div>

                <blockquote className="border-l-2 border-[#7C3AED] pl-3 py-1 text-xs text-white/80 font-mono italic leading-relaxed">
                  "No reloads. Instant validation. Animations. Dynamic elements. The client browser has awakened."
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: BIRTH OF JAVASCRIPT / JS CORE */}
        <section 
          id="section-7" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative overflow-hidden"
        >
          {/* Nebular light glow behind core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="max-w-5xl text-center space-y-8 w-full z-10">
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono text-[#7C3AED] uppercase tracking-[0.3em] font-bold">
                The Universe // JavaScript Core
              </h4>
              <h2 className="font-display font-black text-3xl sm:text-6xl text-white tracking-tight leading-none">
                THE ENGINE OF THE INTERNET.
              </h2>
              <p className="text-xs text-space-textSecondary max-w-xl mx-auto">
                JavaScript became the foundation of all modern web apps. The compilation, the scopes, and the runtime.
              </p>
            </div>

            {/* Orbiting JS engine structure */}
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto flex items-center justify-center">
              
              {/* Rotating Event Loop Ring (Outer) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full rounded-full border border-dashed border-[#7C3AED]/30 flex items-center justify-center"
              >
                <div className="absolute top-0 px-2 py-0.5 rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[8px] font-mono uppercase tracking-widest text-[#C084FC]">
                  Event Loop
                </div>
              </motion.div>

              {/* Scope Chain Ring (Middle) */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-[80%] h-[80%] rounded-full border border-[#FACC15]/20 flex items-center justify-center"
              >
                <div className="absolute bottom-0 px-2 py-0.5 rounded bg-[#FACC15]/10 border border-[#FACC15]/30 text-[8px] font-mono uppercase tracking-widest text-[#FACC15]">
                  Scope Chain
                </div>
              </motion.div>

              {/* Call Stack / Memory Heap Inside */}
              <div className="w-[50%] h-[50%] rounded-full bg-black/80 border border-white/10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.25)] relative">
                <Sparkles className="h-6 w-6 text-[#FACC15] animate-pulse mb-1" />
                <span className="font-display font-black text-[15px] tracking-wider text-white">JS CORE</span>
                <span className="text-[8px] font-mono text-[#C084FC] uppercase tracking-widest mt-0.5">Runtime V8</span>
              </div>

              {/* Small floating energy components */}
              <motion.div 
                animate={{ y: [-6, 6] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 left-1/4 px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[8px] font-mono uppercase text-white/60"
              >
                Closures
              </motion.div>

              <motion.div 
                animate={{ y: [6, -6] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-1/4 right-1/4 px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[8px] font-mono uppercase text-white/60"
              >
                Memory Heap
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 8: ENTER JSVERSE */}
        <section 
          id="section-8" 
          className="w-full h-screen snap-start flex flex-col items-center justify-center px-4 relative"
        >
          {/* Spotlight accent */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#FACC15]/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

          <div className="max-w-4xl text-center space-y-8 z-10">
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono text-[#FACC15] uppercase tracking-[0.30em] font-bold">
                Welcome to JSVerse
              </h4>
              <h2 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-[1.05]">
                UNDERSTAND JAVASCRIPT<br />
                <span className="text-gradient-purple-yellow">LIKE NEVER BEFORE.</span>
              </h2>
              <p className="text-xs sm:text-sm text-space-textSecondary max-w-2xl mx-auto leading-relaxed">
                The cinematic scroll is complete. Now, dive into visual roadmap visualizations, interactive stack debugging sandboxes, and concept definitions.
              </p>
            </div>

            {/* Premium CTA Buttons matching landing page */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/notes')}
                className="group relative px-7 py-3.5 rounded-xl bg-[#FACC15] text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-yellow transition-transform active:scale-95 flex items-center gap-1.5 hover:bg-[#EAB308]"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => navigate('/sandbox')}
                className="group relative px-7 py-3.5 rounded-xl border border-white/10 hover:border-transparent text-white bg-white/5 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 overflow-hidden transition-all shadow-[0_0_0_0_rgba(124,58,237,0)] hover:shadow-[0_0_35px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 hover:bg-[#7C3AED]/15"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine-sweep"></div>
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#7C3AED]/40 transition-colors pointer-events-none"></div>
                <span>Open Sandbox</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="px-7 py-3.5 rounded-xl border border-white/5 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 text-xs font-display font-bold uppercase tracking-wider transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
