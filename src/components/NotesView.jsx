import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown,
  ChevronLeft, 
  BookOpen, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  BookMarked,
  List,
  Menu,
  Copy,
  Check,
  Home,
  Compass,
  Terminal,
  Cpu,
  Bookmark,
  HelpCircle,
  Bell,
  Sun,
  Moon,
  Search,
  Share2,
  Lightbulb,
  Send,
  Zap,
  Clock,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

import { CHAPTERS_DATA } from '../data/chaptersData';

// Sidebar links mapping to routes
const SIDEBAR_NAV = [
  { label: 'Dashboard', icon: Home, path: '/sandbox' },
  { label: 'Roadmap', icon: Compass, path: '/roadmap' },
  { label: 'Playground', icon: Terminal, path: '/playground' },
  { label: 'Weirdness', icon: HelpCircle, path: '/weirdness' },
  { label: 'AI Mentor', icon: Cpu, path: '/mentor' },
  { label: 'Bookmarks', icon: Bookmark, path: '/notes' }
];

const CHAPTERS_LIST = [
  {
    phase: '01. Introduction to JS',
    topics: [
      { id: 'intro-exists', label: 'Why JavaScript Exists' },
      { id: 'browser-env', label: 'The Browser Environment' },
      { id: 'how-works', label: 'How JS Works' },
      { id: 'standards', label: 'ECMAScript & Standards' }
    ]
  },
  {
    phase: '02. Data Types',
    topics: [
      { id: 'data-primitives', label: 'Primitives vs Objects' },
      { id: 'data-coercion', label: 'Type Coercion & Truthiness' }
    ]
  },
  {
    phase: '03. Operators',
    topics: [
      { id: 'ops-arithmetic', label: 'Arithmetic & Type Casting' },
      { id: 'ops-comparison', label: 'Equality == vs ===' }
    ]
  },
  {
    phase: '04. Loops',
    topics: [
      { id: 'loops-control', label: 'For, While & Flow' },
      { id: 'loops-iteration', label: 'For...in vs For...of' }
    ]
  },
  {
    phase: '05. Functions',
    topics: [
      { id: 'func-execution', label: 'Execution Context & Scope' },
      { id: 'func-closures', label: 'Closures & Lexical Scope' }
    ]
  },
  {
    phase: '06. Objects',
    topics: [
      { id: 'obj-prototypes', label: 'Prototypes & Delegation' },
      { id: 'obj-manipulation', label: 'Mutation & Object Freezing' }
    ]
  },
  {
    phase: '07. Arrays',
    topics: [
      { id: 'arr-mechanics', label: 'Arrays Under the Hood' },
      { id: 'arr-methods', label: 'Functional Array Methods' }
    ]
  },
  { 
    phase: '08. DOM & Events', 
    topics: [
      { id: 'dom-interaction', label: 'DOM & Event Delegation' }
    ] 
  },
  { 
    phase: '09. Asynchronous JS', 
    topics: [
      { id: 'async-callbacks', label: 'Promises & Async/Await' }
    ] 
  },
  { 
    phase: '10. Modern JavaScript', 
    topics: [
      { id: 'esnext-features', label: 'Modern ES6+ & Modular JS' }
    ] 
  }
];

export default function NotesView() {
  const location = useLocation();
  const [activeTopic, setActiveTopic] = useState('intro-exists');
  const [activeTab, setActiveTab] = useState('notes');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);


  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('jsverse_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchActiveIndex, setSearchActiveIndex] = useState(0);
  const searchInputRef = useRef(null);

  // Sync routing state from Roadmap and Bookmarks state
  useEffect(() => {
    // Check for topic parameter from Share URL
    const params = new URLSearchParams(window.location.search);
    const sharedTopic = params.get('topic');
    if (sharedTopic && CHAPTERS_DATA.some(ch => ch.id === sharedTopic)) {
      setActiveTopic(sharedTopic);
      // Clean up parameter from URL clean slate
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (location.state?.activeTopicId) {
      setActiveTopic(location.state.activeTopicId);
    }
    if (location.state?.showBookmarkedOnly) {
      setShowBookmarkedOnly(true);
    }
  }, [location.state?.activeTopicId, location.state?.showBookmarkedOnly]);

  const toggleBookmark = (topicId) => {
    setBookmarks(prev => {
      const updated = prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId];
      localStorage.setItem('jsverse_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Global search hotkeys listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
      if (e.key === 'Escape') {
        setSearchQuery('');
        setSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = searchQuery.trim() === '' ? [] : CHAPTERS_DATA.filter(chapter => {
    const query = searchQuery.toLowerCase();
    return (
      chapter.title.toLowerCase().includes(query) ||
      chapter.subtitle.toLowerCase().includes(query) ||
      chapter.heading.toLowerCase().includes(query) ||
      (chapter.notes && chapter.notes.blocks && chapter.notes.blocks.some(block => 
        (block.heading && block.heading.toLowerCase().includes(query)) ||
        (block.paragraphs && block.paragraphs.some(p => p.toLowerCase().includes(query)))
      ))
    );
  });

  const handleSearchKeyDown = (e) => {
    if (searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSearchActiveIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSearchActiveIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = searchResults[searchActiveIndex];
      if (selected) {
        setActiveTopic(selected.id);
        setSearchQuery('');
        setSearchFocused(false);
        searchInputRef.current?.blur();
      }
    }
  };



  // Playground Sandbox
  const [playgroundCode, setPlaygroundCode] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Quiz State
  const [selectedQuizOpt, setSelectedQuizOpt] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(null);

  // Active Content
  const currentChapter = CHAPTERS_DATA.find(ch => ch.id === activeTopic) || CHAPTERS_DATA[0];

  const activeChapterInfo = CHAPTERS_LIST.find(ch => ch.topics.some(t => t.id === activeTopic)) || CHAPTERS_LIST[0];
  const activeTopicInfo = activeChapterInfo.topics.find(t => t.id === activeTopic) || activeChapterInfo.topics[0];

  const allTopics = CHAPTERS_LIST.flatMap(ch => ch.topics);
  const currentIndex = allTopics.findIndex(t => t.id === activeTopic);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const renderedChapters = CHAPTERS_LIST.map(chapter => {
    const filteredTopics = showBookmarkedOnly
      ? chapter.topics.filter(t => bookmarks.includes(t.id))
      : chapter.topics;
    return { ...chapter, topics: filteredTopics };
  }).filter(chapter => chapter.topics.length > 0);

  // Sync playground
  useEffect(() => {
    setPlaygroundCode(currentChapter.sandboxCode);
    setConsoleLogs([]);
    setSelectedQuizOpt(null);
    setQuizSubmitted(false);
    setQuizIsCorrect(null);
  }, [activeTopic, currentChapter]);

  const handleRunCode = () => {
    setConsoleLogs([]);
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
    };

    try {
      const result = new Function(playgroundCode)();
      if (result !== undefined) {
        logs.push(`↳ Return value: ${typeof result === 'object' ? JSON.stringify(result) : String(result)}`);
      }
    } catch (err) {
      logs.push(`✖ Error: ${err.message}`);
    }

    console.log = originalLog;
    setConsoleLogs(logs.length > 0 ? logs : ["Code executed successfully with no logs."]);
  };

  const handleResetCode = () => {
    setPlaygroundCode(currentChapter.sandboxCode);
    setConsoleLogs([]);
  };

  const handleCopyCode = () => {
    const cleanText = currentChapter.codeHtml.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOpt === null) return;
    const isCorrect = selectedQuizOpt === currentChapter.quiz.answerIdx;
    setQuizIsCorrect(isCorrect);
    setQuizSubmitted(true);
  };

  const tabs = [
    { id: 'notes', label: 'Notes' },
    { id: 'summary', label: 'Summary' },
    { id: 'code', label: 'Code Examples' },
    { id: 'tryit', label: 'Try It' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'references', label: 'References' }
  ];

  return (
    <div className="relative pt-24 min-h-screen bg-[#050816] text-[#E5E7EB] flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* BACKGROUND Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#7C3AED]/5 to-transparent pointer-events-none -z-10"></div>

      {/* Floating Navigator Toggle on Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FACC15] text-white shadow-glow-purple lg:hidden hover:scale-105 active:scale-95 transition-transform"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* LEFT COLUMN: Sidebar matching screenshot */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed lg:sticky top-24 left-4 lg:left-0 z-30 h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)] w-[260px] shrink-0 overflow-y-auto flex flex-col glass-card-premium rounded-3xl p-4 mr-6"
          >
            {/* Logo */}
            <div className="flex justify-start items-center pb-4 border-b border-white/5 mb-4 px-2">
              <span className="text-space-yellow font-black font-mono text-base">{'{'}</span>
              <span className="text-white font-display font-black text-sm">JS</span>
              <span className="text-space-yellow font-black font-mono text-base">{'}'}</span>
              <span className="ml-1 text-[10px] font-bold tracking-widest text-slate-300">VERSE</span>
            </div>

            {/* Sidebar Navigation */}
            <div className="space-y-1 mb-6 px-1">
              {SIDEBAR_NAV.map((nav) => {
                const Icon = nav.icon;
                const isBookmarks = nav.label === 'Bookmarks';
                
                if (isBookmarks) {
                  return (
                    <button
                      key={nav.label}
                      onClick={() => {
                        setShowBookmarkedOnly(prev => !prev);
                        if (window.innerWidth <= 1024) setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all border ${
                        showBookmarkedOnly
                          ? 'bg-[#7C3AED]/20 border-[#7C3AED]/35 text-white shadow-[0_0_8px_rgba(124,58,237,0.15)]'
                          : 'border-transparent text-space-textSecondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${showBookmarkedOnly ? 'text-[#FACC15] fill-[#FACC15]' : 'text-[#7C3AED]/70'}`} />
                      <span>{nav.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={nav.label}
                    to={nav.path}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-space-textSecondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Icon className="h-4 w-4 text-[#7C3AED]/70" />
                    <span>{nav.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Section separator */}
            <div className="px-3 pb-2 flex justify-between items-center text-[10px] font-mono text-space-textSecondary uppercase tracking-widest font-bold">
              <span>{showBookmarkedOnly ? 'Bookmarked Topics' : 'JS Fundamentals'}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>

            {/* Expandable Chapters tree */}
            <nav className="space-y-1.5 px-1 flex-1">
              {showBookmarkedOnly && renderedChapters.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-5 py-8 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                  <Bookmark className="h-7 w-7 text-space-textSecondary/40 animate-pulse" />
                  <p className="text-[10px] text-space-textSecondary leading-normal">
                    No bookmarked topics. Click the bookmark icon on any topic page to save it.
                  </p>
                  <button
                    onClick={() => setShowBookmarkedOnly(false)}
                    className="px-2.5 py-1 text-[9px] font-bold bg-[#7C3AED]/20 text-white rounded-lg border border-[#7C3AED]/30 hover:bg-[#7C3AED]/30 transition-all cursor-pointer"
                  >
                    View All Topics
                  </button>
                </div>
              ) : (
                renderedChapters.map((chapter) => {
                  const isExpanded = showBookmarkedOnly || chapter.topics.some(t => t.id === activeTopic) || (activeTopic === 'intro-exists' && chapter.phase.includes('01'));
                  
                  return (
                    <div key={chapter.phase} className="space-y-1">
                      <button 
                        onClick={() => {
                          if (chapter.topics.length > 0) {
                            setActiveTopic(chapter.topics[0].id);
                          }
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold uppercase tracking-wider text-space-textPrimary hover:bg-white/5 transition-all"
                      >
                        <span>{chapter.phase}</span>
                        {chapter.topics.length > 0 && <ChevronDown className="h-3.5 w-3.5 text-space-textSecondary" />}
                      </button>

                      {isExpanded && chapter.topics.map((topic) => {
                        const isActive = activeTopic === topic.id;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => {
                              setActiveTopic(topic.id);
                              if (window.innerWidth <= 1024) setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 pl-6 pr-3 py-2 rounded-xl text-left text-xs font-semibold tracking-wide transition-all border ${
                              isActive
                                ? 'bg-[#7C3AED]/20 border-[#7C3AED]/35 text-white shadow-[0_0_8px_rgba(124,58,237,0.15)]'
                                : 'border-transparent text-space-textSecondary hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#FACC15]' : 'bg-[#7C3AED]/35'}`}></span>
                            <span>{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </nav>

          </motion.aside>
        )}
      </AnimatePresence>

      {/* CENTER COLUMN: Reader panel matching screenshot */}
      <main className="flex-1 lg:px-6 py-2 overflow-y-auto max-w-2xl mx-auto w-full z-10 text-left">
        
        {/* Top Header Search Bar matching screenshot */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/5">
          {/* Search mock box */}
          <div className="relative flex-grow max-w-sm mr-4 z-50">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-space-textSecondary" />
            <input 
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchActiveIndex(0);
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search notes, topics, code..."
              className="w-full pl-9 pr-12 py-1.5 rounded-full bg-black/40 border border-white/5 text-xs text-space-textPrimary focus:outline-none"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] text-space-textSecondary/50 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 uppercase">⌘K</span>

            {/* Search results dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-[var(--glass-border)] shadow-xl bg-[var(--bg-color)] max-h-80 overflow-y-auto p-2 space-y-1 backdrop-blur-2xl">
                {searchResults.map((result, idx) => {
                  const isActive = idx === searchActiveIndex;
                  return (
                    <button
                      key={result.id}
                      onMouseDown={() => {
                        setActiveTopic(result.id);
                        setSearchQuery('');
                        setSearchFocused(false);
                      }}
                      onMouseEnter={() => setSearchActiveIndex(idx)}
                      className={`w-full flex flex-col items-start text-left px-4 py-2.5 rounded-xl transition-all border ${
                        isActive
                          ? 'bg-[#7C3AED]/20 border-[#7C3AED]/40 text-[var(--text-primary)]'
                          : 'border-transparent text-[var(--text-secondary)] hover:bg-[#7C3AED]/10 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="font-display text-xs font-bold uppercase tracking-wider block">
                        {result.title}
                      </span>
                      <span className="text-[10px] opacity-70 line-clamp-1 mt-0.5">
                        {result.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {searchFocused && searchQuery.trim() !== '' && searchResults.length === 0 && (
              <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-[var(--glass-border)] shadow-xl bg-[var(--bg-color)] p-4 text-center text-xs text-[var(--text-secondary)] backdrop-blur-2xl">
                No matching topics found for &ldquo;<span className="text-[var(--text-primary)] font-semibold">{searchQuery}</span>&rdquo;
              </div>
            )}
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-full hover:bg-white/5 text-space-textSecondary hover:text-white">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Breadcrumbs matching screenshot */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-space-textSecondary mb-4">
          <span>Home</span>
          <ChevronRight className="h-3 w-3" />
          <span>JavaScript Fundamentals</span>
          <ChevronRight className="h-3 w-3" />
          <span>{activeChapterInfo?.phase}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-semibold">{activeTopicInfo?.label}</span>
        </div>

        {/* Title & Metadata Badges */}
        <div className="space-y-4 pb-5 border-b border-white/5">
          <div className="flex justify-between items-center">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none flex items-center gap-2">
              {currentChapter.heading}
              <Bookmark 
                onClick={() => toggleBookmark(activeTopic)}
                className={`h-5 w-5 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${
                  bookmarks.includes(activeTopic)
                    ? 'fill-[#FACC15] text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                    : 'text-space-textSecondary hover:text-white'
                }`} 
              />
            </h1>
            <div className="relative">
              <button
                onClick={() => {
                  const shareUrl = window.location.href.split('?')[0] + `?topic=${activeTopic}`;
                  if (navigator.share) {
                    navigator.share({
                      title: `JSVerse - ${currentChapter.heading}`,
                      text: currentChapter.subtitle,
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
                className="p-1.5 rounded-full hover:bg-white/5 text-space-textSecondary hover:text-white transition-all cursor-pointer"
                title="Share this topic"
              >
                <Share2 className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
          
          <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed">
            {currentChapter.subtitle}
          </p>

          {/* Badges row matching screenshot */}
          <div className="flex flex-wrap gap-2 pt-1">
            {currentChapter.badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <span key={i} className="inline-flex items-center gap-1.2 px-2.5 py-0.8 rounded-full bg-white/5 border border-white/5 font-mono text-[9px] text-space-textSecondary">
                  <Icon className={`h-3 w-3 ${badge.color}`} />
                  <span>{badge.text}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Dynamic Navigation Tabs inside article */}
        <div className="flex border-b border-white/5 mt-4 overflow-x-auto gap-1 py-1 scrollbar-none">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-2 font-display text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                  isTabActive ? 'text-white' : 'text-space-textSecondary hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {isTabActive && (
                  <motion.div
                    layoutId="activeNotesTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#FACC15] shadow-[0_0_8px_#7C3AED]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Article content canvas */}
        <div className="py-6 text-sm sm:text-[15px] leading-relaxed">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTopic}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* TAB 1: Notes */}
              {activeTab === 'notes' && (
                <div className="space-y-6 text-space-textPrimary leading-relaxed">
                  {currentChapter.notes.blocks.map((block, bIdx) => {
                    if (block.type === 'text') {
                      return (
                        <div key={bIdx} className="space-y-3">
                          {block.heading && (
                            <h3 className="font-display font-bold text-base text-white">{block.heading}</h3>
                          )}
                          {block.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="text-xs sm:text-sm text-space-textSecondary leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                          ))}
                        </div>
                      );
                    }
                    if (block.type === 'takeaway') {
                      return (
                        <div key={bIdx} className="notes-takeaway-card flex gap-3.5 items-start">
                          <div className="p-1.5 rounded-lg bg-[#7C3AED]/15 text-[#C084FC] border border-[#7C3AED]/25 shrink-0 mt-0.5">
                            <Lightbulb className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-display font-bold text-[10px] text-[#C084FC] uppercase tracking-wider block mb-0.5">{block.title}</span>
                            <p className="text-xs text-white leading-relaxed">
                              {block.text}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'quote') {
                      return (
                        <div key={bIdx} className="notes-quote-block">
                          {block.text}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* TAB 2: Summary */}
              {activeTab === 'summary' && (
                <div className="text-space-textPrimary text-xs sm:text-sm leading-relaxed max-w-2xl">
                  <p>{currentChapter.summary}</p>
                </div>
              )}

              {/* TAB 3: Code Examples */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-space-textSecondary text-xs">Review typical code implementation below:</p>
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-space-textSecondary hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="glass-card-premium p-5 rounded-2xl border border-[#7C3AED]/20 shadow-glow-purple font-mono text-[11px] leading-relaxed overflow-x-auto">
                    <pre className="text-space-textPrimary">
                      <code dangerouslySetInnerHTML={{ __html: currentChapter.codeHtml }} />
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 4: Try It Sandbox */}
              {activeTab === 'tryit' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-space-textSecondary text-xs">Compile and run live code inside this compiler node:</p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={handleResetCode}
                        className="px-2.5 py-1.2 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1 text-space-textSecondary hover:text-white"
                      >
                        <RotateCcw className="h-3 w-3" /> Reset
                      </button>
                      <button
                        onClick={handleRunCode}
                        className="px-3 py-1.2 rounded-lg text-[10px] font-bold bg-gradient-to-r from-[#7C3AED] to-[#FACC15] text-white shadow-glow-purple flex items-center gap-1 active:scale-95 transition-transform"
                      >
                        <Play className="h-3 w-3 text-white fill-white" /> Run
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 relative rounded-2xl border border-[#7C3AED]/20 bg-black/40 overflow-hidden">
                      <textarea
                        value={playgroundCode}
                        onChange={(e) => setPlaygroundCode(e.target.value)}
                        className="w-full h-64 p-5 font-mono text-xs bg-transparent text-white outline-none resize-none focus:ring-0 leading-relaxed"
                        spellCheck="false"
                      />
                    </div>

                    <div className="md:col-span-4 rounded-2xl border border-white/5 bg-[#050816] flex flex-col overflow-hidden">
                      <div className="px-4 py-2 border-b border-white/5 bg-white/5 font-display text-[9px] tracking-widest font-bold text-space-textSecondary uppercase">
                        CONSOLE OUTPUT
                      </div>
                      <div className="p-4 flex-1 font-mono text-[10px] space-y-2 overflow-y-auto h-56 text-green-400">
                        {consoleLogs.length === 0 ? (
                          <span className="text-space-textSecondary/40 italic">Process clean. Run compiler to verify.</span>
                        ) : (
                          consoleLogs.map((log, idx) => (
                            <div key={idx} className="whitespace-pre-wrap leading-relaxed border-b border-white/5 pb-1">
                              {log}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Quiz */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  <p className="text-space-textSecondary text-xs">Test your comprehension below:</p>
                  
                  <div className="glass-card-premium p-6 rounded-2xl border border-[#7C3AED]/15 space-y-5">
                    <h4 className="font-display font-bold text-sm sm:text-base text-white">
                      {currentChapter.quiz.question}
                    </h4>

                    <div className="space-y-2.5">
                      {currentChapter.quiz.options.map((opt, idx) => {
                        const isSelected = selectedQuizOpt === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (!quizSubmitted) setSelectedQuizOpt(idx);
                            }}
                            disabled={quizSubmitted}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-xs sm:text-sm font-bold transition-all border ${
                              isSelected 
                                ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white shadow-glow-purple' 
                                : 'bg-[#050816]/40 border-white/5 text-space-textPrimary hover:border-white/15'
                            }`}
                          >
                            <span>{opt}</span>
                            <span className="w-4.5 h-4.5 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-space-yellow shadow-[0_0_8px_#FACC15]" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={selectedQuizOpt === null}
                        className="px-5 py-2 rounded-lg text-[10px] font-display font-bold tracking-widest uppercase bg-gradient-to-r from-[#7C3AED] to-[#FACC15] text-white shadow-glow-purple disabled:opacity-50"
                      >
                        Submit Response
                      </button>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2">
                          {quizIsCorrect ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-green-400 font-bold font-display text-xs tracking-wider uppercase">Correct Answer!</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-red-400" />
                              <span className="text-red-400 font-bold font-display text-xs tracking-wider uppercase">Incorrect Answer.</span>
                            </>
                          )}
                        </div>
                        <p className="text-space-textSecondary text-xs sm:text-sm italic leading-relaxed">
                          {currentChapter.quiz.explanation}
                        </p>
                        <button
                          onClick={() => {
                            setSelectedQuizOpt(null);
                            setQuizSubmitted(false);
                            setQuizIsCorrect(null);
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          Retry Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: References */}
              {activeTab === 'references' && (
                <div className="space-y-4">
                  <p className="text-space-textSecondary text-xs">External specifications and document links:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentChapter.references.map((ref) => (
                      <a
                        key={ref.name}
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-card-premium p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all group"
                      >
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-space-yellow transition-colors">{ref.name}</span>
                        <ExternalLink className="h-4 w-4 text-space-textSecondary group-hover:text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Previous / Next buttons matching screenshot */}
        <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-10 gap-4">
          <button 
            onClick={() => prevTopic && setActiveTopic(prevTopic.id)}
            disabled={!prevTopic}
            className={`flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/5 text-left flex-1 max-w-[240px] transition-all ${
              prevTopic 
                ? 'hover:border-white/15 cursor-pointer opacity-100' 
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="h-5 w-5 text-space-textSecondary shrink-0" />
            <div>
              <span className="block font-mono text-[9px] text-space-textSecondary uppercase font-bold tracking-wider">Previous</span>
              <span className="block text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[180px]">
                {prevTopic ? prevTopic.label : 'None'}
              </span>
            </div>
          </button>
          
          <button 
            onClick={() => nextTopic && setActiveTopic(nextTopic.id)}
            disabled={!nextTopic}
            className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border border-white/5 bg-white/5 text-right flex-1 max-w-[240px] transition-all ${
              nextTopic 
                ? 'hover:border-white/15 cursor-pointer opacity-100' 
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <div>
              <span className="block font-mono text-[9px] text-space-textSecondary uppercase font-bold tracking-wider">Next</span>
              <span className="block text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[180px]">
                {nextTopic ? nextTopic.label : 'None'}
              </span>
            </div>
            <ArrowRight className="h-5 w-5 text-space-textSecondary shrink-0" />
          </button>
        </div>

      </main>

      {/* RIGHT COLUMN: TOC, AI mentor prompt box & Links matching screenshot */}
      <aside className="w-[260px] shrink-0 sticky top-28 h-[calc(100vh-140px)] overflow-y-auto hidden xl:block p-4 space-y-6 border-l border-white/5 ml-6">
        
        {/* On This Page List */}
        <div className="space-y-3 text-left">
          <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase flex items-center gap-1.5">
            <List className="h-4 w-4 text-[#FACC15]" /> On this page
          </span>
          <div className="space-y-2 border-l border-white/5 pl-3">
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-[#FACC15] border-l-2 border-[#FACC15] -ml-[14px] pl-3.5">
              1. The Web Was Born Dead
            </button>
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-space-textSecondary hover:text-white pl-0.5">
              2. Enter Sun, and a Language Called Java
            </button>
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-space-textSecondary hover:text-white pl-0.5">
              3. The Secret War Against Microsoft
            </button>
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-space-textSecondary hover:text-white pl-0.5">
              4. Why a SECOND Language Was Needed
            </button>
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-space-textSecondary hover:text-white pl-0.5">
              5. Ten Days in May
            </button>
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-space-textSecondary hover:text-white pl-0.5">
              6. Two Languages, Side by Side
            </button>
            <button className="block text-[11px] text-left font-bold tracking-wider uppercase text-space-textSecondary hover:text-white pl-0.5">
              7. How the Little Brother Won
            </button>
          </div>
        </div>

        {/* AI Mentor Card matching screenshot */}
        <div className="rounded-2xl border border-white/5 bg-[#050816] p-4 text-left space-y-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-space-yellow font-display font-bold text-[10px] uppercase tracking-wider">
            <Cpu className="h-4 w-4 text-[#C084FC]" />
            <span>AI Mentor</span>
          </div>
          <p className="text-[9px] text-space-textSecondary leading-normal">
            Ask me anything about this topic!
          </p>
          
          <div className="space-y-1.5">
            <Link to="/mentor" className="block p-2 rounded bg-white/5 border border-white/5 text-[9px] text-space-textPrimary hover:border-[#7C3AED]/35 hover:text-white transition-colors">
              Why was JavaScript created in 10 days? →
            </Link>
            <Link to="/mentor" className="block p-2 rounded bg-white/5 border border-white/5 text-[9px] text-space-textPrimary hover:border-[#7C3AED]/35 hover:text-white transition-colors">
              What was the conflict between Netscape, Sun and Microsoft? →
            </Link>
            <Link to="/mentor" className="block p-2 rounded bg-white/5 border border-white/5 text-[9px] text-space-textPrimary hover:border-[#7C3AED]/35 hover:text-white transition-colors">
              What is the difference between Java and JavaScript? →
            </Link>
          </div>

          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask a question..."
              className="w-full pl-3 pr-9 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[10px] text-space-textPrimary focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/40"
            />
            <button className="absolute right-1 p-1 rounded bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors">
              <Send className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Quick Links List matching screenshot */}
        <div className="space-y-3 text-left border-t border-white/5 pt-6">
          <span className="font-display font-bold text-[10px] tracking-widest text-space-textSecondary uppercase">
            Quick Links
          </span>
          <div className="space-y-2 font-mono text-[9px]">
            <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer" className="flex items-center justify-between text-space-textSecondary hover:text-[#7C3AED] transition-colors">
              <span>MDN: JavaScript Guide</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://javascript.info" target="_blank" rel="noreferrer" className="flex items-center justify-between text-space-textSecondary hover:text-[#7C3AED] transition-colors">
              <span>JavaScript Timeline</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a href="https://tc39.es/ecma262/" target="_blank" rel="noreferrer" className="flex items-center justify-between text-space-textSecondary hover:text-[#7C3AED] transition-colors">
              <span>ECMAScript Specification</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

      </aside>

    </div>
  );
}
