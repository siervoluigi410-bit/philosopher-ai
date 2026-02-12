import React, { useState, useEffect } from 'react';
import { User, Shield, Settings, Paperclip, Mic, ChevronUp, MessageSquare, Menu, X } from 'lucide-react';
import { getChatResponse } from '../services/gemini';
import LandingPage from './LandingPage';

/**
 * Simple markdown-to-JSX renderer for chatbot responses.
 */
const FormattedText = ({ text = '' }) => {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <br />}
          {line.split(/(\*\*.*?\*\*|\*.*?\*)/).map((segment, segIdx) => {
            if (segment.startsWith('**') && segment.endsWith('**')) {
              return <strong key={segIdx} className="font-bold text-white">{segment.slice(2, -2)}</strong>;
            }
            if (segment.startsWith('*') && segment.endsWith('*')) {
              return <em key={segIdx}>{segment.slice(1, -1)}</em>;
            }
            return <span key={segIdx}>{segment}</span>;
          })}
        </React.Fragment>
      ))}
    </>
  );
};

/**
 * TYPEWRITER ANIMATION COMPONENT
 */
const TypewriterText = ({ text = '', speed = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return (
    <div className="relative">
      <FormattedText text={displayedText} />
      {index < text.length && (
        <span className="inline-block w-1.5 h-4 bg-white/60 ml-1 animate-pulse" />
      )}
    </div>
  );
};

const CHARACTER_DATA = {
  SOCRATES: {
    greeting: "Hi, Mark Jamil!",
    subtext: "I know nothing except the fact of my ignorance. How can I help you?",
    theme: "from-yellow-500/20 to-transparent",
    accent: "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    glow: "text-yellow-200/80",
    motto: "The Unexamined Life",
    bgImage: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/death-of-socrates?_a=BAVAZGID0",
    questions: ["What is justice?", "Can virtue be taught?", "What is the nature of the soul?"]
  },
  PLATO: {
    greeting: "Welcome, seeker.",
    subtext: "Let us step out of the cave and discuss the world of forms.",
    theme: "from-blue-500/20 to-transparent",
    accent: "border-blue-400/40 shadow-[0_0_15px_rgba(96,165,250,0.2)]",
    glow: "text-blue-200/80",
    motto: "The World of Forms",
    bgImage: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/death-of-socrates?_a=BAVAZGID0",
    questions: ["Tell me about the Allegory of the Cave.", "What are the Forms?", "What is the ideal state?"]
  },
  ARISTOTLE: {
    greeting: "Greetings, Mark.",
    subtext: "Excellence is a habit. Shall we analyze your inquiry with logic?",
    theme: "from-orange-700/20 to-transparent",
    accent: "border-orange-500/30 shadow-[0_0_15px_rgba(194,65,12,0.2)]",
    glow: "text-orange-200/80",
    motto: "The Golden Mean",
    bgImage: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/death-of-socrates?_a=BAVAZGID0",
    questions: ["What is the Golden Mean?", "How do we achieve Eudaimonia?", "Explain the Four Causes."]
  },
  SENECA: {
    greeting: "Greetings, friend.",
    subtext: "It is not that we have a short time to live, but that we waste a lot of it.",
    theme: "from-emerald-500/20 to-transparent",
    accent: "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    glow: "text-emerald-200/80",
    motto: "On the Shortness of Life",
    bgImage: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/death-of-socrates?_a=BAVAZGID0",
    questions: ["How should I deal with anxiety?", "Why is time so precious?", "How can I find tranquility?"]
  },
  MARCUS_AURELIUS: {
    greeting: "Welcome, fellow citizen.",
    subtext: "The universe is change; our life is what our thoughts make it.",
    theme: "from-purple-500/20 to-transparent",
    accent: "border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    glow: "text-purple-200/80",
    motto: "The Inner Citadel",
    bgImage: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/death-of-socrates?_a=BAVAZGID0",
    questions: ["How do I build internal strength?", "What is my duty to others?", "How do I accept what I cannot change?"]
  },
  EPICTETUS: {
    greeting: "Look within.",
    subtext: "We cannot choose our external circumstances, but we can always choose how we respond.",
    theme: "from-red-500/20 to-transparent",
    accent: "border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    glow: "text-red-200/80",
    motto: "Control vs Influence",
    bgImage: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_1080,h_540,g_auto/dpr_auto/f_auto/q_auto:eco/v1/death-of-socrates?_a=BAVAZGID0",
    questions: ["What is within my control?", "How do I handle insults?", "What is true freedom?"]
  }
};

/**
 * REUSABLE PILL BUTTON
 */
const PillButton = ({ label, active, onClick, fullWidth }) => (
  <button
    onClick={onClick}
    className={`
      relative overflow-hidden border border-gray-600 rounded-full py-3 px-6 text-[10px] font-classic-heading tracking-[0.2em] transition-all duration-500
      hover:border-white hover:bg-white/5 uppercase group flex items-center gap-3
      ${fullWidth ? 'w-full' : 'flex-1'}
      ${active ? 'border-white bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-gray-400'}
    `}
  >
    <span className={`relative z-10 ${active ? 'translate-x-1 inline-block' : ''} transition-transform whitespace-nowrap`}>
      {label}
    </span>
    {active && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />}
  </button>
);

/**
 * SIDEBAR COMPONENT — responsive with mobile slide-over
 */
const Sidebar = ({ currentTone, setTone, isOpen, setIsOpen, onClearChat }) => {
  const currentData = CHARACTER_DATA[currentTone] || CHARACTER_DATA.SOCRATES;

  return (
    <>
      {/* BACKDROP — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR PANEL */}
      <div className={`
        fixed md:relative z-50 flex flex-col h-screen w-72 md:w-80 bg-[#080808] text-white p-6 md:p-8 overflow-y-auto overflow-x-hidden font-classic-heading border-r border-white/5 shrink-0 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* CLOSE BUTTON — mobile only */}
        <button
          className="absolute top-4 right-4 z-20 md:hidden text-white/50 hover:text-white transition-colors p-2"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={22} />
        </button>

        <div className="relative z-10 mb-8 md:mb-12 group cursor-default">
          <h1 className="text-2xl md:text-3xl tracking-tighter mb-1 font-light flex items-baseline gap-2">
            Philosopher<span className="text-white/30 text-lg md:text-xl font-classic-heading">-AI</span>
          </h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-white/40 to-transparent transition-all duration-700" />

          <div className="flex items-center gap-4 mt-8 md:mt-10">
            <div className="relative">
              <div className="bg-white/90 p-1.5 rounded-full ring-2 ring-white/10">
                <User size={18} className="text-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg tracking-widest lowercase opacity-90 leading-none">mark jamil</span>
              <span className="text-[9px] text-white/30 uppercase mt-1 tracking-[0.2em]">{currentData.motto}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8 md:space-y-10 grow">
          <section>
            <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-bold opacity-50">Identitation Name</p>
            <PillButton label="Stoic" active={true} fullWidth />
          </section>

          <section>
            <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest font-bold opacity-50">Characters</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {['Aristotle', 'Plato', 'Socrates', 'Seneca', 'Marcus Aurelius', 'Epictetus'].map((char) => (
                <PillButton
                  key={char}
                  label={char}
                  active={currentTone === char.toUpperCase().replace(' ', '_')}
                  onClick={() => { setTone(char.toUpperCase().replace(' ', '_')); setIsOpen(false); }}
                />
              ))}
            </div>
          </section>

          <section className="group">
            <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-bold opacity-50">Tools</p>
            <button
              onClick={onClearChat}
              className="w-full p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer flex items-center gap-3 text-red-500/60 hover:text-red-500"
            >
              <X size={14} />
              <span className="text-[11px] uppercase tracking-widest">Clear Dialogue</span>
            </button>
          </section>

          <section className="group">
            <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-bold opacity-50">Recent Dialogues</p>
            <div className="w-full space-y-2">
              {["The Cave Allegory", "Virtue Ethics"].map((chat, i) => (
                <div key={i} className="w-full p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer flex items-center gap-3">
                  <MessageSquare size={14} className="opacity-30" />
                  <span className="text-[11px] text-white/50 lowercase">{chat}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="relative z-10 space-y-4 pt-8 border-t border-white/5">
          <button className="flex items-center gap-4 text-gray-500 hover:text-white transition-all group w-full">
            <Shield size={16} className="group-hover:scale-110 group-hover:text-blue-400 transition-all" />
            <span className="text-[11px] tracking-widest uppercase opacity-70">Privacy Vault</span>
          </button>
          <button className="flex items-center gap-4 text-gray-500 hover:text-white transition-all group w-full">
            <Settings size={16} className="group-hover:rotate-90 group-hover:text-yellow-400 transition-all" />
            <span className="text-[11px] tracking-widest uppercase opacity-70">Core System</span>
          </button>
        </div>
      </div>
    </>
  );
};

/**
 * CHAT INTERFACE COMPONENT
 */
const ChatInterface = ({ currentTone, onOpenSidebar, messages, setMessages }) => {
  const data = CHARACTER_DATA[currentTone] || CHARACTER_DATA.SOCRATES;
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    setVisible(false);
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setVisible(true);
      setIsTransitioning(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentTone]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getChatResponse(currentTone, messages, input);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: error.message || "Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex-1 h-screen overflow-hidden bg-black flex flex-col items-center justify-between p-4 md:p-10">

      {/* MOBILE HEADER BAR */}
      <div className="relative z-20 w-full flex items-center justify-between md:hidden mb-2">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg tracking-tighter font-light text-white/80">
          Philosopher<span className="text-white/30 text-sm">-AI</span>
        </h1>
        <span className={`font-classic-heading text-[10px] tracking-[0.3em] uppercase ${data.glow}`}>
          {currentTone.toLowerCase()}
        </span>
      </div>

      {/* --- DYNAMIC BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* Image Layer (Restored with Transition Effect) */}
      {data.bgImage && (
        <div
          key={currentTone}
          className={`absolute inset-0 z-1 bg-cover bg-center transition-all duration-[2000ms] ease-out opacity-40 animate-slow-drift ${isTransitioning ? 'animate-transition-flash blur-md' : ''}`}
          style={{ backgroundImage: `url('${data.bgImage}')` }}
        />
      )}

      {/* Character Aura Gradient */}
      <div className={`absolute inset-0 z-2 bg-gradient-to-br ${data.theme} opacity-30 transition-all duration-1000 animate-pulse pointer-events-none ${isTransitioning ? 'opacity-50' : ''}`} />

      {/* Subtle Master Vignette */}
      <div className="absolute inset-0 z-3 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* --- MESSAGES AREA --- */}
      <div className="relative z-10 w-full max-w-5xl flex-1 flex flex-col gap-6 md:gap-14 pt-4 md:pt-10 overflow-y-auto px-2 md:px-4 custom-scrollbar">

        {/* AI GREETING (Always visible first with Portal Animation) */}
        <div
          key={currentTone}
          className={`self-start w-fit max-w-[95%] md:max-w-[85%] transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} ${isTransitioning ? 'animate-portal-in' : ''}`}
        >
          <div className="bg-white/5 backdrop-blur-3xl border border-white/20 p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden group flex flex-col md:flex-row items-center gap-10">
            {/* Subtle Inner Glow */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${data.theme} opacity-40`} />

            <div className="flex flex-col text-center md:text-left space-y-4">
              <h2 className={`text-white text-2xl md:text-6xl font-classic-heading tracking-tight transition-colors duration-1000 ${data.glow}`}>
                {data.greeting}
              </h2>
              <p className="text-white/90 text-lg md:text-3xl font-classic-body tracking-tight leading-relaxed max-w-2xl italic">
                {data.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* DYNAMIC MESSAGES */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`
              ${msg.role === 'user' ? 'self-end w-fit max-w-[85%] md:max-w-[70%]' : 'self-start w-fit max-w-[95%] md:max-w-[85%]'}
              flex gap-3 md:gap-4 items-end
              transition-all duration-500 transform
            `}
          >
            <div className={`
              ${msg.role === 'user'
                ? 'bg-white/10 backdrop-blur-2xl border border-white/20 px-8 py-4 md:px-12 md:py-6 rounded-full shadow-xl'
                : 'bg-white/5 backdrop-blur-3xl border border-white/20 p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden'
              }
            `}>
              {msg.role !== 'user' && (
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${data.theme} opacity-40`} />
              )}
              <div className={`${msg.role === 'user'
                ? 'text-white/95 text-lg md:text-2xl font-classic-body tracking-wide italic'
                : 'text-white/95 text-lg md:text-2xl font-classic-body tracking-normal leading-relaxed'}`}>
                {msg.role === 'user' ? (
                  msg.text
                ) : (
                  // Only animate the very last message if it's from the model
                  idx === messages.length - 1 ? (
                    <TypewriterText text={msg.text} />
                  ) : (
                    <FormattedText text={msg.text} />
                  )
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="self-start w-fit max-w-[85%] animate-pulse">
            <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] rounded-tl-none">
              <span className="text-white/50 text-base md:text-xl font-classic-body italic">Contemplating...</span>
            </div>
          </div>
        )}

        {/* SUGGESTED QUESTIONS */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-wrap gap-2 md:gap-4 mt-4 duration-1000 delay-500">
            {data.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-classic-body text-white/40 hover:text-white/80 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* --- REFINED INPUT BOX --- */}
      <div className="relative z-10 w-full max-w-4xl mb-2 md:mb-6">
        <div className={`
          bg-black/60 backdrop-blur-3xl border-2 transition-all duration-1000
          ${data.accent} rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-2xl flex flex-col gap-3 md:gap-6
          hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]
        `}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:ring-0 text-white font-classic-body italic text-base md:text-2xl placeholder-white/20 resize-none h-10 md:h-14 leading-relaxed scrollbar-hide outline-none"
            placeholder="Tell me what you think..."
            disabled={isLoading}
          />

          <div className="flex items-center justify-between pt-3 md:pt-6 border-t border-white/5">
            <div className="flex items-center gap-4 md:gap-10 text-white/40">
              <div className="flex gap-3 md:gap-6">
                <button className="hover:text-white hover:scale-110 transition-all duration-300" aria-label="Attach"><Paperclip size={20} /></button>
                <button className="hover:text-white hover:scale-110 transition-all duration-300" aria-label="Voice"><Mic size={20} /></button>
              </div>
              <div className="h-5 w-[1px] bg-white/10 hidden md:block" />
              <span className={`font-classic-heading text-[10px] md:text-sm tracking-[0.4em] uppercase transition-colors duration-1000 ${data.glow} hidden md:inline`}>
                {currentTone.toLowerCase()} ultra
              </span>
            </div>

            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`
                group p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white/80
                hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-500
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
              `}
            >
              <ChevronUp size={22} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN APP ASSEMBLY
 */
export default function PhilosopherApp() {
  const [tone, setTone] = useState('SOCRATES');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showLanding, setShowLanding] = useState(true);

  // Load messages whenever tone changes
  useEffect(() => {
    const saved = localStorage.getItem(`philosopher_chat_${tone}`);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [tone]);

  // Helper to update messages AND save to localStorage
  const updateMessagesAndSave = (newMessages) => {
    setMessages(prev => {
      const messagesToSave = typeof newMessages === 'function' ? newMessages(prev) : newMessages;
      if (messagesToSave.length > 0) {
        localStorage.setItem(`philosopher_chat_${tone}`, JSON.stringify(messagesToSave));
      } else {
        localStorage.removeItem(`philosopher_chat_${tone}`);
      }
      return messagesToSave;
    });
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem(`philosopher_chat_${tone}`);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden selection:bg-white/20 transition-opacity duration-1000">
      <Sidebar
        currentTone={tone}
        setTone={setTone}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onClearChat={handleClearChat}
      />
      <ChatInterface
        currentTone={tone}
        onOpenSidebar={() => setSidebarOpen(true)}
        messages={messages}
        setMessages={updateMessagesAndSave}
      />
    </div>
  );
}