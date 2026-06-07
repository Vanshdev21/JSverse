import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Eye, 
  Terminal, 
  Cpu, 
  Compass, 
  Sparkles, 
  ArrowRight,
  Code,
  Layers,
  Activity,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  Loader2,
  BrainCircuit
} from 'lucide-react';
import heroImage from '../assets/hero-futuristic.jpg';

export default function LandingView() {
  const navigate = useNavigate();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeTrailer();
      }
    };
    if (isTrailerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTrailerOpen]);

  // Autoplay with delay
  useEffect(() => {
    if (isTrailerOpen) {
      setIsLoading(true);
      setIsPlaying(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.log("Autoplay blocked:", err);
            setIsPlaying(false);
          });
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTrailerOpen]);

  const openTrailer = () => {
    setIsTrailerOpen(true);
  };

  const closeTrailer = () => {
    setIsTrailerOpen(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleScrub = (e) => {
    if (!videoRef.current) return;
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.log(err));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => console.log(err));
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Pre-generate static data for particles to avoid hydration mismatches
  const particlesConfig = [
    { size: 4, left: 12, top: 25, delay: 0.5, duration: 8 },
    { size: 6, left: 85, top: 15, delay: 1.2, duration: 11 },
    { size: 3, left: 45, top: 80, delay: 0.2, duration: 7 },
    { size: 5, left: 70, top: 40, delay: 2.1, duration: 13 },
    { size: 7, left: 22, top: 65, delay: 0.8, duration: 9 },
    { size: 3, left: 90, top: 75, delay: 1.5, duration: 10 },
    { size: 4, left: 5, top: 50, delay: 0.4, duration: 6 },
    { size: 5, left: 58, top: 20, delay: 2.5, duration: 12 },
    { size: 6, left: 35, top: 38, delay: 1.7, duration: 10 },
    { size: 4, left: 78, top: 62, delay: 0.9, duration: 8 }
  ];

  return (
    <div className="relative w-full min-h-screen">
      
      {/* BACKGROUND CONTENT: Scales down and blurs when trailer is active */}
      <motion.div
        animate={{ 
          scale: isTrailerOpen ? 0.96 : 1, 
          filter: isTrailerOpen ? 'blur(10px) brightness(0.35)' : 'blur(0px) brightness(1)' 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden w-full"
      >
        {/* Background Lighting Elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] ambient-purple-glow -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] ambient-yellow-glow -z-10 pointer-events-none"></div>

        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Content (Col-6) */}
            <div className="lg:col-span-6 text-left space-y-6">
              
              {/* Small Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#7C3AED]/35 bg-[#7C3AED]/10 text-[10px] font-bold uppercase tracking-wider text-space-textPrimary"
              >
                <Sparkles className="h-3 w-3 text-space-yellow animate-pulse" />
                <span>The most immersive way to learn JavaScript</span>
              </motion.div>

              {/* Huge Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-4xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08] text-white"
              >
                Understand <br />
                <span className="text-gradient-purple-yellow">JavaScript.</span> <br />
                Like Never Before.
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs sm:text-sm text-space-textSecondary max-w-xl leading-relaxed"
              >
                From the birth of the web to the power of modern JS. Learn through stories, visuals, and interactive simulations that make concepts <span className="text-[#C084FC] font-bold">stick forever</span>.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                
                {/* Primary "Start Your Journey" Button */}
                <Link
                  to="/notes"
                  className="group relative px-6 py-3 rounded-xl bg-space-yellow text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-yellow transition-transform active:scale-95 flex items-center gap-1.5 hover:bg-[#EAB308]"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Immersive "Enter Story Mode" Button */}
                <Link
                  to="/story"
                  className="group relative px-6 py-3 rounded-xl border border-[#7C3AED]/30 hover:border-transparent text-white bg-[#7C3AED]/10 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 overflow-hidden transition-all shadow-[0_0_0_0_rgba(124,58,237,0)] hover:shadow-[0_0_35px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 hover:bg-[#7C3AED]/20"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine-sweep"></div>
                  <Sparkles className="h-3.5 w-3.5 text-[#C084FC] group-hover:text-white animate-pulse" />
                  <span>Enter Story Mode</span>
                </Link>

                {/* Improved Watch Trailer Button */}
                <button
                  onClick={openTrailer}
                  className="group relative px-6 py-3 rounded-xl border border-white/10 hover:border-transparent text-space-textPrimary bg-white/5 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 overflow-hidden transition-all shadow-[0_0_0_0_rgba(124,58,237,0)] hover:shadow-[0_0_35px_rgba(124,58,237,0.35),0_0_20px_rgba(250,204,21,0.2)] hover:-translate-y-0.5 hover:bg-[#7C3AED]/15 hover:text-white"
                >
                  {/* Shine Sweep animation sweep line */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine-sweep"></div>
                  
                  {/* Glowing Border border outline */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#7C3AED]/40 transition-colors pointer-events-none"></div>

                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Play className="h-3.5 w-3.5 text-white fill-white" />
                  </motion.div>
                  <span>Watch Trailer</span>
                </button>
              </motion.div>

            </div>

            {/* Hero Visual centerpiece (Col-6) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [-6, 6]
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                y: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 4,
                  ease: 'easeInOut'
                }
              }}
              className="lg:col-span-6 relative"
            >
              {/* Ambient shadow glow around the image */}
              <div className="absolute inset-4 rounded-[32px] bg-gradient-to-tr from-[#7C3AED]/35 to-[#FACC15]/20 blur-3xl opacity-60 pointer-events-none -z-10 animate-pulse"></div>

              {/* Glowing Backdrop Border */}
              <div className="relative p-1 rounded-[32px] bg-gradient-to-tr from-[#7C3AED]/25 via-white/5 to-[#FACC15]/25 shadow-[0_0_50px_rgba(124,58,237,0.3),0_0_80px_rgba(250,204,21,0.15)]">
                <img 
                  src={heroImage} 
                  alt="JSVerse Space Centerpiece" 
                  className="w-full h-auto object-cover rounded-[28px] pointer-events-none select-none"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="border-t border-white/5 w-full h-[1px]"></div>
        </div>

        {/* BOTTOM HORIZONTAL PILL BAR */}
        <section id="explore-features" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
          <div className="rounded-3xl glass-card-premium p-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/5 text-left">
            
            <div className="flex gap-3 items-start p-2 sm:p-0">
              <div className="p-2.5 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/25 text-[#C084FC] shrink-0">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-1">Visualize Concepts</h4>
                <p className="text-[10px] text-space-textSecondary leading-relaxed">Interactive 3D animations make complex ideas simple.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start pt-4 sm:pt-0 lg:pl-6 p-2 sm:p-0">
              <div className="p-2.5 rounded-xl bg-[#FACC15]/15 border border-[#FACC15]/25 text-space-yellow shrink-0">
                <BrainCircuit className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-1">AI Mentor</h4>
                <p className="text-[10px] text-space-textSecondary leading-relaxed">Ask anything. Get answers that actually make sense.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start pt-4 sm:pt-0 lg:pl-6 p-2 sm:p-0">
              <div className="p-2.5 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/25 text-[#C084FC] shrink-0">
                <Code className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-1">Live Playground</h4>
                <p className="text-[10px] text-space-textSecondary leading-relaxed">Code, run, visualize and debug in real-time.</p>
              </div>
            </div>

          </div>
        </section>
      </motion.div>

      {/* FUTURISTIC CINEMATIC OVERLAY MODAL */}
      <AnimatePresence>
        {isTrailerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            
            {/* Backdrop Dark Mask with Vignette */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={closeTrailer}
              className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
            >
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_100%)] pointer-events-none"></div>

              {/* Floating Holographic Ambient Space Particles */}
              {particlesConfig.map((p, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full bg-[#7C3AED]/20 blur-[1.5px] pointer-events-none"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                  }}
                  animate={{
                    y: [0, -90, 0],
                    x: [0, Math.sin(idx) * 30, 0],
                    opacity: [0, 0.65, 0]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Cinematic Light Beams */}
              <div className="absolute top-[-20%] left-[-10%] w-[120vw] h-[140vh] bg-gradient-to-tr from-[#7C3AED]/3 via-transparent to-[#FACC15]/2 rotate-12 pointer-events-none blur-3xl opacity-40 animate-pulse"></div>
            </motion.div>

            {/* Modal Screen Container with Spring Entry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative w-full max-w-[1280px] aspect-video z-10 gradient-border-glow animate-float-modal animate-neon-pulse pointer-events-auto"
            >
              {/* Outer border container matches gradient border glow style */}
              <div 
                ref={playerContainerRef}
                className="w-full h-full bg-black/95 rounded-[28px] overflow-hidden relative flex flex-col justify-between"
              >
                {/* 1. Video Element wrapper */}
                <div className="relative w-full h-full flex-grow bg-black flex items-center justify-center">
                  
                  {/* Cinematic Loading Spinner before playback */}
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 space-y-4">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-[#7C3AED]/20 border-t-[#7C3AED] animate-spin"></div>
                        <Loader2 className="h-6 w-6 text-space-yellow animate-pulse" />
                      </div>
                      <span className="font-display text-[9px] font-bold tracking-[0.25em] text-[#C084FC] uppercase animate-pulse">
                        Opening Portal to JSVerse
                      </span>
                    </div>
                  )}

                  <video
                    ref={videoRef}
                    src="/trailer.mp4"
                    autoPlay
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={togglePlay}
                    className="w-full h-full object-cover select-none pointer-events-auto"
                    playsInline
                  />
                  
                  {/* Visual Whoosh Streaks on Open */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0.8 }}
                    animate={{ scaleX: 1, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent origin-center pointer-events-none z-10"
                  />
                </div>

                {/* 2. Custom Video Control Bar (Holographic glass bar) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-3 group/controls transition-opacity duration-300 hover:opacity-100 opacity-90">
                  
                  {/* Glowing Scrub bar slider wrapper */}
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-space-textSecondary">{formatTime(currentTime)}</span>
                    
                    <div className="relative flex-grow h-2 flex items-center">
                      <input 
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleScrub}
                        className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none cursor-pointer accent-space-yellow transition-all hover:h-1.5 focus:outline-none"
                        style={{
                          background: `linear-gradient(to right, #7C3AED ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.1) ${duration ? (currentTime / duration) * 100 : 0}%)`
                        }}
                      />
                    </div>

                    <span className="text-[10px] font-mono text-space-textSecondary">{formatTime(duration)}</span>
                  </div>

                  {/* Actions buttons row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      
                      {/* Play/Pause Button */}
                      <button 
                        onClick={togglePlay}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white hover:text-space-yellow transition-all active:scale-95"
                      >
                        {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
                      </button>

                      {/* Volume / Mute Toggle */}
                      <button 
                        onClick={toggleMute}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white hover:text-space-yellow transition-all active:scale-95"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-green-400" />}
                      </button>

                    </div>

                    {/* Right features controls */}
                    <div className="flex items-center gap-4">
                      
                      {/* Center Node Portal Tag */}
                      <span className="hidden sm:inline font-display text-[9px] font-black tracking-widest text-[#C084FC]/80 uppercase">
                        JSVERSE // PORTAL_NODE
                      </span>

                      {/* Fullscreen Toggle */}
                      <button 
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white hover:text-space-yellow transition-all active:scale-95"
                      >
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </button>

                    </div>
                  </div>

                </div>

                {/* 3. Futuristic Glowing Close Button */}
                <button
                  onClick={closeTrailer}
                  className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:text-[#FACC15] hover:border-[#7C3AED]/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
