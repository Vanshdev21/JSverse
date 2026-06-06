import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import LoadingFallback from './components/LoadingFallback';
import Footer from './components/Footer';

const LandingView = lazy(() => import('./components/LandingView'));
const NotesView = lazy(() => import('./components/NotesView'));
const RoadmapView = lazy(() => import('./components/RoadmapView'));
const PlaygroundView = lazy(() => import('./components/PlaygroundView'));
const MentorView = lazy(() => import('./components/MentorView'));
const AboutView = lazy(() => import('./components/AboutView'));
const FounderView = lazy(() => import('./components/FounderView'));
const SupportView = lazy(() => import('./components/SupportView'));
const SandboxView = lazy(() => import('./components/SandboxView'));
const WeirdnessView = lazy(() => import('./components/WeirdnessView'));
const ProjectsView = lazy(() => import('./components/ProjectsView'));
const InterviewView = lazy(() => import('./components/InterviewView'));
const ConceptSEOView = lazy(() => import('./components/ConceptSEOView'));


export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-space-textPrimary bg-space-bg selection:bg-[#7C3AED]/30 selection:text-[#FACC15] relative">
      {/* Immersive space canvas particles */}
      <ParticleBackground />

      {/* Sticky blurred glass header */}
      <Navbar />

      {/* Main viewport with cinematic page transitions */}
      <Suspense fallback={<LoadingFallback />}>
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
        <Route path="/sandbox" element={<SandboxView />} />
        <Route path="/sandbox/:conceptId" element={<SandboxView />} />
        <Route path="/visualizer/:conceptId" element={<SandboxView />} />
        <Route path="/learn/:conceptId" element={<ConceptSEOView />} />
        <Route path="/weirdness" element={<WeirdnessView />} />
        <Route path="/projects" element={<ProjectsView />} />
        <Route path="/interview" element={<InterviewView />} />
        <Route path="*" element={<LandingView />} />
      </Routes>
    </motion.div>
  </AnimatePresence>
</Suspense>      
      <Footer />
    </div>
  );
}
