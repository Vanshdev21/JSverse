import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import LandingView from './components/LandingView';
import NotesView from './components/NotesView';
import RoadmapView from './components/RoadmapView';
import PlaygroundView from './components/PlaygroundView';
import MentorView from './components/MentorView';
import AboutView from './components/AboutView';
import FounderView from './components/FounderView';
import SupportView from './components/SupportView';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-space-textPrimary bg-space-bg selection:bg-[#7C3AED]/30 selection:text-[#FACC15] relative">
      {/* Immersive space canvas particles */}
      <ParticleBackground />

      {/* Sticky blurred glass header */}
      <Navbar />

      {/* Main viewport with cinematic page transitions */}
      <div className="relative z-10 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<LandingView />} />
              <Route path="/notes" element={<NotesView />} />
              <Route path="/roadmap" element={<RoadmapView />} />
              <Route path="/playground" element={<PlaygroundView />} />
              <Route path="/mentor" element={<MentorView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/founder" element={<FounderView />} />
              <Route path="/support" element={<SupportView />} />
              <Route path="*" element={<LandingView />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
