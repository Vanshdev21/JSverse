import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Orbit, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();



  const navLinks = [
    { path: '/notes', label: 'Learn' },
    { path: '/roadmap', label: 'Roadmap' },
    { path: '/sandbox', label: 'Sandbox' },
    { path: '/projects', label: 'Projects' },
    { path: '/mentor', label: 'AI Mentor' },
    { path: '/about', label: 'About' },
    { path: '/founder', label: 'Creator' },
    { path: '/support', label: 'Support' }
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8">
      {/* Floating Centered Pill Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full max-w-6xl rounded-full bg-[#050816]/75 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-4 flex items-center justify-between shadow-[0_12px_36px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
      >
        
        {/* Logo Section */}
        <Link 
          to="/"
          className="flex items-center gap-1.5 cursor-pointer group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex items-center text-base font-display font-black tracking-wider text-white">
            <span className="text-space-yellow font-black font-mono text-lg">{'{'}</span>
            <span className="text-white">JS</span>
            <span className="text-space-yellow font-black font-mono text-lg">{'}'}</span>
            <span className="ml-1.5 text-xs font-bold tracking-widest text-slate-300 group-hover:text-white transition-colors">VERSE</span>
          </div>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={`${link.path}-${idx}`}
                to={link.path}
                className={`relative px-4 py-2 font-display text-xs tracking-wider uppercase font-bold transition-colors duration-300 rounded-full ${
                  isActive ? 'text-white' : 'text-space-textSecondary hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePillUnderline"
                    className="absolute inset-0 bg-white/5 border border-white/5 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Action buttons to replicate screenshot */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/notes"
            className="px-4.5 py-1.5 rounded-full bg-space-yellow text-black font-display font-bold text-xs flex items-center gap-1 hover:bg-[#EAB308] hover:shadow-glow-yellow transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Hamburger Toggle (Mobile) */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-1.5 rounded-full text-space-textSecondary hover:text-white hover:bg-white/5 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 left-4 right-4 z-40 rounded-3xl border border-white/10 bg-[#050816]/95 backdrop-blur-xl p-4 shadow-2xl md:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={`${link.path}-${idx}`}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-display text-xs tracking-wider uppercase font-bold transition-all ${
                      isActive 
                        ? 'bg-[#7C3AED]/20 text-white border-l-2 border-[#FACC15]' 
                        : 'text-space-textSecondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 px-2 flex flex-col gap-2">
                <Link
                  to="/notes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-1 px-6 py-2.5 rounded-full bg-space-yellow font-display text-xs font-bold text-black shadow-glow-yellow"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
