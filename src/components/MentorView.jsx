import React, { useState } from 'react';
import { Cpu, Send, Sparkles, Terminal, BookOpen, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const PRESETS = [
  {
    question: "Explain prototypes in simple terms.",
    answer: "An object prototype is like an inheritance link. If you ask an object for a property it doesn't have, it looks at its prototype. Think of it like a chain of ancestry: if you don't have a tool, you check if your father has it, then grandfather, etc. In JavaScript, this is called the Prototype Chain, and it terminates at Object.prototype (and finally null)."
  },
  {
    question: "Why does [] == ![] evaluate to true?",
    answer: "This is one of JS's historic Quirks! Let's break down the coercion chain:\n1. ![] evaluates first: since arrays are truthy, ![] becomes false.\n2. We are left with: [] == false.\n3. A comparison between an object (array) and boolean coerces both: false becomes number 0. The array [] converts to primitive empty string '', which then coerces to number 0.\n4. Finally, we compare 0 == 0, which is true! Always use === to avoid this type of coercion magic!"
  },
  {
    question: "How does the event loop prioritize promises vs timers?",
    answer: "Promises use the Microtask Queue, while timers (setTimeout) use the Macrotask (Task) Queue. The Event Loop prioritizes the Microtask Queue completely. As soon as a synchronous script finishes, the engine drains all waiting Promises in the Microtask Queue before it checks setTimeout callback tasks. Thus, Promise callbacks will always execute before timers."
  }
];

export default function MentorView() {
  const [messages, setMessages] = useState([
    {
      sender: 'mentor',
      text: "Greetings, initiate. I am the JSVerse Hologram Compiler. Ask me a complex question about JavaScript execution context, closures, prototypes, or events, or select one of my queries below."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Find if there is a preset match, else give generic response
    setTimeout(() => {
      const match = PRESETS.find(p => p.question.toLowerCase().includes(textToSend.toLowerCase()) || textToSend.toLowerCase().includes(p.question.toLowerCase()));
      let replyText = match 
        ? match.answer 
        : `Analyzing query: "${textToSend}"... Warning: External compiler offline. Direct sandbox synthesis: For advanced JavaScript questions, explore our celestial Chapters or select one of the pre-loaded telemetry templates below to unlock compiler answers.`;

      setMessages(prev => [...prev, { sender: 'mentor', text: replyText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-4xl mx-auto px-4 sm:px-6">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="space-y-3 border-b border-white/5 pb-8 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-[#7C3AED] font-display font-bold tracking-wider uppercase">
          <Cpu className="h-4 w-4" /> HOLOGRAM INTERFACE
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
          AI Compiler Mentor
        </h1>
        <p className="text-space-textSecondary text-xs sm:text-sm leading-relaxed max-w-xl">
          Query the virtual compilation node. Learn about advanced hoisting, lexical bindings, and event loop cycles.
        </p>
      </div>

      {/* Console Chat Wrapper */}
      <div className="glass-card-premium rounded-3xl border border-[#7C3AED]/25 bg-[#050816]/75 shadow-glow-purple overflow-hidden flex flex-col h-[500px]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            <span className="font-mono text-[10px] uppercase font-bold text-white tracking-wider">HOLOGRAM_LINK // STABLE</span>
          </div>
          <span className="font-mono text-[9px] text-[#7C3AED] uppercase font-bold">SYS_GRID: ON</span>
        </div>

        {/* Scrollable messages board */}
        <div className="flex-grow p-5 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 font-bold ${
                  isUser 
                    ? 'bg-white/5 border-white/10 text-space-yellow' 
                    : 'bg-[#7C3AED]/15 border-[#7C3AED]/35 text-[#c084fc]'
                }`}>
                  {isUser ? 'U' : <Cpu className="h-4.5 w-4.5" />}
                </div>

                {/* Bubble */}
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  isUser
                    ? 'bg-white/5 border-white/10 text-white rounded-tr-none'
                    : 'bg-[#7C3AED]/5 border-[#7C3AED]/15 text-space-textPrimary rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 bg-[#7C3AED]/15 border-[#7C3AED]/30 text-[#c084fc]">
                <Cpu className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl border bg-[#7C3AED]/5 border-[#7C3AED]/15 text-space-textSecondary rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Presets Row */}
        <div className="px-5 py-2.5 border-t border-white/5 bg-black/25 flex flex-wrap gap-1.5">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.question)}
              className="px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-space-textSecondary hover:text-white hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/5 transition-all"
            >
              {p.question.replace('?', '')}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3.5 border-t border-white/5 bg-[#050816]/50 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputText);
            }}
            placeholder="Ask the AI Compiler a custom question..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/5 text-white font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50"
          />
          <button
            onClick={() => handleSend(inputText)}
            className="p-2.5 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#FACC15] text-white shadow-glow-purple hover:scale-105 active:scale-95 transition-transform"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
