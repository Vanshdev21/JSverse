import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Cpu, 
  Compass, 
  HelpCircle, 
  Globe, 
  Heart, 
  BookOpen,
  Activity
} from 'lucide-react';
import { CONCEPTS_DATA } from '../data/conceptsData';

export default function Footer() {
  const concepts = Object.values(CONCEPTS_DATA);

  return (
    <footer className="relative bg-[#02040a] border-t border-white/5 pt-16 pb-12 text-left z-10">
      {/* Ambient glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo / Brand (Col-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-1.5 cursor-pointer group">
              <span className="text-space-yellow font-black font-mono text-lg">{'{'}</span>
              <span className="text-white font-display font-black text-base tracking-wider">JS</span>
              <span className="text-space-yellow font-black font-mono text-lg">{'}'}</span>
              <span className="ml-1 text-xs font-bold tracking-widest text-slate-300 group-hover:text-white transition-colors">VERSE</span>
            </Link>
            <p className="text-space-textSecondary text-xs leading-relaxed max-w-sm">
              JSVerse is an immersive, interactive technical learning universe. Visualize executions, explore closures, and simulate the JavaScript event loop in real-time.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-space-textSecondary hover:text-white transition-colors" aria-label="GitHub">
                <Globe className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Learn Concepts Columns (Col-5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display font-bold text-[10px] tracking-widest text-[#C084FC] uppercase block">
              JavaScript Concepts
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {concepts.map((concept) => (
                <Link
                  key={concept.id}
                  to={`/learn/${concept.id}`}
                  className="text-space-textSecondary hover:text-white text-xs transition-colors truncate block"
                  title={concept.title}
                >
                  {concept.title.replace(" Explained Visually", "").replace(" Visualizer", "")}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links & Platforms (Col-3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-display font-bold text-[10px] tracking-widest text-[#FACC15] uppercase block">
              Universe Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-2.5">
                <Link to="/" className="text-space-textSecondary hover:text-white transition-colors block">Home</Link>
                <Link to="/notes" className="text-space-textSecondary hover:text-white transition-colors block">Learn</Link>
                <Link to="/roadmap" className="text-space-textSecondary hover:text-white transition-colors block">Roadmap</Link>
                <Link to="/sandbox" className="text-space-textSecondary hover:text-white transition-colors block">Sandbox</Link>
              </div>
              <div className="space-y-2.5">
                <Link to="/playground" className="text-space-textSecondary hover:text-white transition-colors block">Playground</Link>
                <Link to="/mentor" className="text-space-textSecondary hover:text-white transition-colors block">AI Mentor</Link>
                <Link to="/about" className="text-space-textSecondary hover:text-white transition-colors block">Creator</Link>
                <Link to="/support" className="text-space-textSecondary hover:text-white transition-colors block">Support</Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-space-textSecondary/50 uppercase tracking-widest">
            © {new Date().getFullYear()} JSVERSE.ORG // SECURE NODE DISCOVERED
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-space-textSecondary font-mono">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>for JavaScript learners globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
