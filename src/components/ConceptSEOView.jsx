import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  Terminal, 
  Cpu, 
  ArrowRight, 
  Activity,
  Layers,
  Home,
  Share2
} from 'lucide-react';

import { CONCEPTS_DATA } from '../data/conceptsData';
import CodeEditor from './CodeEditor';
import VisualizationCard from './VisualizationCard';
import CallStackCard from './CallStackCard';
import ScopeChainCard from './ScopeChainCard';
import ExecutionContextCard from './ExecutionContextCard';
import MemoryHeapCard from './MemoryHeapCard';
import EventLoopCard from './EventLoopCard';
import MicrotaskQueueCard from './MicrotaskQueueCard';
import ConsoleOutputCard from './ConsoleOutputCard';
import TimelineControls from './TimelineControls';
import ErrorBoundary from './ErrorBoundary';
import { runCodeInWorker } from '../utils/workerManager';

export default function ConceptSEOView() {
  const { conceptId } = useParams();
  const location = useLocation();
  const concept = CONCEPTS_DATA[conceptId] || CONCEPTS_DATA['javascript-closures'];

  const [code, setCode] = useState(concept.sandboxCode);
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [autoRun, setAutoRun] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");
  const [isExecuting, setIsExecuting] = useState(false);
  const [execError, setExecError] = useState(null);



  // Compile concept code
  const executeCode = useCallback((codeToRun) => {
    setIsExecuting(true);
    setExecError(null);
    return runCodeInWorker(
      codeToRun,
      (generatedSteps) => {
        setSteps(generatedSteps);
        setCurrent(0);
        setIsExecuting(false);
      },
      (errorMsg) => {
        setExecError(errorMsg);
        setIsExecuting(false);
        setSteps([
          {
            line: 1,
            callStack: [{ name: "(error)", line: 1 }],
            scopeChain: [],
            context: { thisValue: "undefined", lexicalEnv: "error", variables: [] },
            heap: [],
            eventLoop: { status: "Idle", queue: [] },
            microtaskQueue: [],
            logs: [`Error: ${errorMsg}`]
          }
        ]);
        setCurrent(0);
      }
    );
  }, []);

  // Run code on concept change
  useEffect(() => {
    window.scrollTo(0, 0);
    setCode(concept.sandboxCode);
    const abort = executeCode(concept.sandboxCode);
    return () => abort();
  }, [concept, executeCode]);

  // Auto-run playback effect
  useEffect(() => {
    if (autoRun && steps.length > 0) {
      const interval = setInterval(() => {
        setCurrent((c) => {
          if (c < steps.length - 1) return c + 1;
          clearInterval(interval);
          return c;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [autoRun, steps]);

  const handleRun = () => {
    executeCode(code);
  };

  const handleReset = () => {
    setCode(concept.sandboxCode);
    executeCode(concept.sandboxCode);
  };

  // Variables for active step execution
  const currentStep = steps[current] || {};
  const callStack = currentStep.callStack || [];
  const scopeChain = currentStep.scopeChain || [];
  const context = currentStep.context || null;
  const heap = currentStep.heap || [];
  const eventLoop = currentStep.eventLoop || { status: "Idle", queue: [] };
  const microtaskQueue = currentStep.microtaskQueue || [];
  const logs = currentStep.logs || [];
  const activeLine = currentStep.line || 0;

  return (
    <div className="relative pt-24 min-h-screen bg-[#050816] text-[#E5E7EB] overflow-x-hidden">
      {/* React 19 Dynamic Documents Hoisting */}
      <title>{concept.seoTitle}</title>
      <meta name="description" content={concept.metaDescription} />
      <meta name="keywords" content={concept.keywords.join(', ')} />
      <link rel="canonical" href={`https://jsverse.space/learn/${concept.id}`} />
      
      {/* OpenGraph metadata */}
      <meta property="og:title" content={concept.seoTitle} />
      <meta property="og:description" content={concept.metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://jsverse.space/learn/${concept.id}`} />
      <meta property="og:image" content="https://jsverse.space/support-qr.jpg" />
      
      {/* Twitter metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={concept.seoTitle} />
      <meta name="twitter:description" content={concept.metaDescription} />
      <meta name="twitter:image" content="https://jsverse.space/support-qr.jpg" />

      {/* JSON-LD Script Injection */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://jsverse.space/#website",
              "url": "https://jsverse.space",
              "name": "JSVerse",
              "description": "Cinematic JavaScript Learning Universe",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jsverse.space/notes?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Article",
              "@id": `https://jsverse.space/learn/${concept.id}#article`,
              "isPartOf": { "@id": "https://jsverse.space/#website" },
              "headline": concept.title,
              "description": concept.metaDescription,
              "inLanguage": "en-US",
              "mainEntityOfPage": `https://jsverse.space/learn/${concept.id}`,
              "publisher": {
                "@type": "EducationalOrganization",
                "name": "JSVerse",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jsverse.space/favicon.png"
                }
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": concept.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            },
            {
              "@type": "Course",
              "name": concept.title,
              "description": concept.metaDescription,
              "provider": {
                "@type": "EducationalOrganization",
                "name": "JSVerse",
                "sameAs": "https://jsverse.space"
               }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://jsverse.space"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Learn",
                  "item": "https://jsverse.space/notes"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": concept.title,
                  "item": `https://jsverse.space/learn/${concept.id}`
                }
              ]
            }
          ]
        })}
      </script>

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#7C3AED]/5 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-space-textSecondary mb-6">
          <Link to="/" className="hover:text-white flex items-center gap-1">
            <Home className="h-3 w-3" /> Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/notes" className="hover:text-white">Learn</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#FACC15] font-semibold">{concept.title}</span>
        </div>

        {/* Title / Hero */}
        <div className="space-y-4 pb-8 border-b border-white/5 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-[#7C3AED]/10 text-[10px] font-bold uppercase tracking-wider text-space-textPrimary">
            <Sparkles className="h-3 w-3 text-space-yellow animate-pulse" />
            <span>Interactive Concept Studio</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
              {concept.h1}
            </h1>
            <button
              onClick={() => {
                const shareUrl = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: `JSVerse - Learn ${concept.title}`,
                    text: concept.subtitle,
                    url: shareUrl,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  const toast = document.createElement('div');
                  toast.className = 'fixed bottom-24 right-6 bg-[#7C3AED] text-white text-xs px-4 py-2 rounded-full shadow-glow-purple z-50 font-bold font-display tracking-wide animate-bounce';
                  toast.innerText = 'Link copied to clipboard! 🔗';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2500);
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 self-start sm:self-auto px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-xs font-bold text-white transition-all cursor-pointer shadow-md"
              title="Share this concept"
            >
              <Share2 className="h-4 w-4 text-purple-400" />
              <span>Share Concept</span>
            </button>
          </div>
          <p className="text-space-textSecondary text-sm sm:text-base max-w-3xl leading-relaxed">
            {concept.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {concept.keywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-space-textSecondary">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Grid Split: Concept explanations (left) vs Dynamic Sandbox (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Detailed explanations */}
          <div className="lg:col-span-6 space-y-10 text-left">
            
            {/* Introduction block */}
            <div className="glass-card-premium p-6 rounded-3xl border border-white/5 space-y-4">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-space-yellow" /> Conceptual Core
              </h2>
              <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed font-semibold">
                {concept.introduction}
              </p>
            </div>

            {/* Structured explanations */}
            <div 
              className="prose prose-invert max-w-none text-xs sm:text-sm text-space-textSecondary leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: concept.explanationHtml }}
            />

            {/* FAQs container */}
            <div className="space-y-4 pt-4">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <HelpCircle className="h-5 w-5 text-[#C084FC]" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {concept.faqs.map((faq, i) => (
                  <div key={i} className="glass-card-premium p-5 rounded-2xl border border-white/5 space-y-2">
                    <h3 className="font-display font-bold text-xs sm:text-sm text-white flex items-start gap-2">
                      <span className="text-[#FACC15] font-mono font-bold">Q:</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-space-textSecondary text-[11px] sm:text-xs leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Concepts (Internal Linking) */}
            <div className="pt-4 space-y-3">
              <span className="font-display font-bold text-[10px] tracking-widest text-[#C084FC] uppercase block">
                Related Core Concepts:
              </span>
              <div className="flex flex-wrap gap-3">
                {concept.related.map((relId) => {
                  const relConcept = CONCEPTS_DATA[relId];
                  if (!relConcept) return null;
                  return (
                    <Link
                      key={relId}
                      to={`/learn/${relId}`}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 text-xs font-bold text-white transition-all flex items-center gap-1.5"
                    >
                      <span>{relConcept.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-space-textSecondary" />
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Embedded Interactive Sandbox visualizer widget */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="glass-card-premium rounded-3xl border border-purple-500/20 bg-[#050816]/60 p-4 sm:p-5 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-pulse" />
              
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4.5 w-4.5 text-space-yellow" />
                  <span className="font-display font-bold text-xs text-white">Interactive Visual Compiler</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    disabled={isExecuting}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#FACC15] text-white text-[10px] font-bold shadow-glow-purple disabled:opacity-50 flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                  >
                    {isExecuting ? "Compiling..." : "Run ▶"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-space-textSecondary hover:text-white text-[10px] font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="h-60 rounded-xl overflow-hidden border border-white/5 bg-black/40">
                <CodeEditor code={code} onChange={setCode} theme="dark" activeLine={activeLine} />
              </div>

              {/* Tab selector */}
              <div className="flex justify-between items-center border-t border-b border-white/5 py-1">
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveTab("visualization")}
                    className={`text-[10px] font-bold tracking-wider uppercase pb-1 border-b-2 transition-all ${
                      activeTab === "visualization" ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Visualizer
                  </button>
                  <button
                    onClick={() => setActiveTab("output")}
                    className={`text-[10px] font-bold tracking-wider uppercase pb-1 border-b-2 transition-all ${
                      activeTab === "output" ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Logs
                  </button>
                </div>
                <span className="text-[9px] font-mono text-space-textSecondary/50 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  Step {steps.length > 0 ? current + 1 : 0} / {steps.length}
                </span>
              </div>

              {/* Tab visualizations */}
              <div className="h-[300px] overflow-y-auto pr-1">
                {activeTab === "visualization" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <ErrorBoundary>
                      <VisualizationCard title="Call Stack">
                        <CallStackCard stack={callStack} />
                      </VisualizationCard>
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <VisualizationCard title="Scope Chain">
                        <ScopeChainCard chain={scopeChain} />
                      </VisualizationCard>
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <VisualizationCard title="Execution Context">
                        <ExecutionContextCard ctx={context} />
                      </VisualizationCard>
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <VisualizationCard title="Memory Heap">
                        <MemoryHeapCard heap={heap} />
                      </VisualizationCard>
                    </ErrorBoundary>
                  </div>
                ) : (
                  <ErrorBoundary>
                    <div className="h-full">
                      <ConsoleOutputCard logs={logs} />
                    </div>
                  </ErrorBoundary>
                )}
              </div>

              {/* Controls */}
              <div className="border-t border-white/5 pt-3">
                <TimelineControls
                  steps={steps}
                  current={current}
                  setCurrent={setCurrent}
                  autoRun={autoRun}
                  setAutoRun={setAutoRun}
                />
              </div>

            </div>

            {/* Quick links to Sandbox routes */}
            <div className="glass-card-premium p-6 rounded-3xl border border-white/5 text-center space-y-4">
              <h3 className="font-display font-bold text-sm text-white">Want the Full Visual Experience?</h3>
              <p className="text-space-textSecondary text-xs leading-relaxed">
                Open this concept inside the full-screen compiler sandbox with event loop trackers and memory simulators.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={`/sandbox/${concept.id}`}
                  className="px-4.5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:shadow-glow-purple text-white text-xs font-bold transition-all text-center"
                >
                  Open in Sandbox 🚀
                </Link>
                <Link
                  to={`/visualizer/${concept.id}`}
                  className="px-4.5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white text-xs font-bold transition-all text-center"
                >
                  Full Stack Visualizer
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Global bottom section: Browse other concepts (Continue learning) */}
        <div className="pt-20 pb-10 space-y-6 text-left border-t border-white/5 mt-20">
          <h2 className="font-display font-black text-2xl text-white tracking-tight">
            Continue Learning Asynchronous & Core JS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(CONCEPTS_DATA).map((c) => {
              if (c.id === concept.id) return null;
              return (
                <Link
                  key={c.id}
                  to={`/learn/${c.id}`}
                  className="p-5 rounded-2xl glass-card-premium border border-white/5 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all flex flex-col justify-between group h-36 text-left"
                >
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-space-yellow transition-colors leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-space-textSecondary text-[10px] sm:text-[11px] line-clamp-2 leading-relaxed">
                      {c.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#7C3AED] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Visualize</span> <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
