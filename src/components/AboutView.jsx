import React from 'react';
import { Sparkles, Compass, Layers, Cpu, Code } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-4xl mx-auto px-4 sm:px-6">
      {/* Background glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="space-y-3 border-b border-white/5 pb-8 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-space-yellow font-display font-bold tracking-wider uppercase">
          <Compass className="h-4 w-4" /> PLATFORM CORE
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
          About JSVerse
        </h1>
        <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed max-w-xl">
          A cinematic interactive universe built to explain the architectural pillars of the web.
        </p>
      </div>

      {/* Narrative Blocks */}
      <div className="space-y-10 text-space-textPrimary">
        
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-space-yellow" />
            The Immersive Philosophy
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-space-textSecondary">
            Traditional online platforms teach JavaScript by dumping code templates, requiring dry algorithmic problem-solving, or tracking your engagement using streak systems and level-up popups. 
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-space-textSecondary">
            JSVerse is designed to be a distraction-free environment. We treat code as an artifact of historic design decisions. By focusing on context, visual mental models (like call stacks and memory heaps), and sandbox experimentation, we allow developers to understand *why* JavaScript behaves the way it does, rather than just memorizing syntax.
          </p>
        </div>

        {/* Mini Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          <div className="glass-card-premium p-5 rounded-2xl border border-[#7C3AED]/20 space-y-2.5">
            <span className="font-display font-bold text-[10px] text-space-purple uppercase tracking-widest font-bold">Design Architecture</span>
            <p className="text-[11px] sm:text-xs leading-relaxed text-space-textSecondary">
              Deep space-like color palettes (#050816) combined with glowing border glows, translucent glass panels, and premium typography inspired by Linear, Vercel, and Apple interfaces.
            </p>
          </div>
          <div className="glass-card-yellow p-5 rounded-2xl border border-[#FACC15]/20 space-y-2.5">
            <span className="font-display font-bold text-[10px] text-space-yellow uppercase tracking-widest font-bold">Technical Grid</span>
            <p className="text-[11px] sm:text-xs leading-relaxed text-space-textSecondary">
              Built with React, styled with Tailwind CSS, and animated using Framer Motion. Zero server overhead and zero analytics trackers to guarantee lightweight performance.
            </p>
          </div>
        </div>

        {/* Brendan Eich Quote block */}
        <div className="p-5.5 rounded-2xl glass-card-premium border border-white/5 bg-black/40 relative overflow-hidden mt-6">
          <blockquote className="border-l border-[#7C3AED] pl-4 italic text-xs sm:text-sm text-space-textSecondary leading-relaxed">
            "If I had done a class-based language, it would have been too heavy. Scheme functions and Self prototypes allowed JavaScript to be dynamic, flexible, and rapidly adopted."
          </blockquote>
          <div className="mt-3 text-right text-[10px] font-mono text-space-purple font-bold">// Brendan Eich // Creator of JS</div>
        </div>

      </div>

    </div>
  );
}
