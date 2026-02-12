import React, { useState, useEffect } from 'react';
import { User, Shield, Settings, Paperclip, Mic, ChevronUp, MessageSquare, Menu, X } from 'lucide-react';

// --- ENHANCED CHARACTER THEMES ---
const CHARACTER_DATA = {
  SOCRATES: {
    greeting: "Hi, Mark Jamil!",
    subtext: "I know nothing except the fact of my ignorance. How can I help you?",
    theme: "from-yellow-500/20 to-transparent",
    accent: "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    bgOpacity: "opacity-40",
    glow: "text-yellow-200/80",
    motto: "The Unexamined Life"
  },
  PLATO: {
    greeting: "Welcome, seeker.",
    subtext: "Let us step out of the cave and discuss the world of forms.",
    theme: "from-blue-500/20 to-transparent",
    accent: "border-blue-400/40 shadow-[0_0_15px_rgba(96,165,250,0.2)]",
    bgOpacity: "opacity-25",
    glow: "text-blue-200/80",
    motto: "The World of Forms"
  },
  ARISTOTLE: {
    greeting: "Greetings, Mark.",
    subtext: "Excellence is a habit. Shall we analyze your inquiry with logic?",
    theme: "from-orange-700/20 to-transparent",
    accent: "border-orange-500/30 shadow-[0_0_15px_rgba(194,65,12,0.2)]",
    bgOpacity: "opacity-60",
    glow: "text-orange-200/80",
    motto: "The Golden Mean"
  }
};

const PillButton = ({ label, active, onClick, fullWidth }) => (
  <button
    onClick={onClick}
    className={`
      relative overflow-hidden border border-gray-600 rounded-full py-3 px-6 text-[10px] font-mono tracking-widest transition-all duration-500
      hover:border-white hover:bg-white/5 uppercase group
      ${fullWidth ? 'w-full' : 'flex-1'}
      ${active ? 'border-white bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-gray-400'}
    `}
  >
    <span className={`relative z-10 ${active ? 'translate-x-1 inline-block' : ''} transition-transform`}>
      {label}
    </span>
    {active && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />}
  </button>
);

/**
 * UPDATED SIDEBAR: Added responsive classes and Close button
 */
const Sidebar = ({ currentTone, setTone, isOpen, setIsOpen }) => {
  const currentData = CHARACTER_DATA[currentTone];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:z-0
        flex flex-col h-screen w-80 bg-[#080808] text-white p-8 overflow-hidden font-mono border-r border-white/5 
        transition-transform duration-300 ease-in-out shrink-0 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 mb-12 group cursor-default">
          <h1 className="text-3xl tracking-tighter mb-1 font-light flex items-baseline gap-2">
            Philosopher<span className="text-white/30 text-xl font-mono">-AI</span>
          </h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-white/40 to-transparent transition-all duration-700" />

          <div className="flex items-center gap-4 mt-10">
            <div className="relative">
              <div className="bg-white/90 p-1.5 rounded-full ring-2 ring-white/10">
                <User size={20} className="text-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg tracking-widest lowercase opacity-90 leading-none">mark jamil</span>
              <span className="text-[9px] text-white/30 uppercase mt-1 tracking-[0.2em]">{currentData.motto}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-10 grow overflow-y-auto custom-scrollbar pr-2">
          <section>
            <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-bold opacity-50">Identitation Name</p>
            <PillButton label="Stoic" active={true} fullWidth />
          </section>

          <section>
            <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest font-bold opacity-50">Characters</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {['Aristotle', 'Plato'].map((char) => (
                <PillButton
                  key={char}
                  label={char}
                  active={currentTone === char.toUpperCase()}
                  onClick={() => { setTone(char.toUpperCase()); if (window.innerWidth < 1024) setIsOpen(false); }}
                />
              ))}
            </div>
            <div className="w-full">
              <PillButton
                label="Socrates"
                active={currentTone === 'SOCRATES'}
                onClick={() => { setTone('SOCRATES'); if (window.innerWidth < 1024) setIsOpen(false); }}
                fullWidth
              />
            </div>
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

        <div className="relative z-10 space-y-4 pt-8 border-t border-white/5 mt-auto">
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
 * CHAT INTERFACE: Added Mobile Header with Menu Toggle
 */
const ChatInterface = ({ currentTone, toggleMenu }) => {
  const data = CHARACTER_DATA[currentTone] || CHARACTER_DATA.SOCRATES;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    setVisible(false);
    setMessages([]);
    const timer = setTimeout(() => setVisible(true), 150);
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

    // Simulate API delay for demonstration
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'model', text: "The unexamined life is not worth living." }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex-1 h-screen overflow-hidden bg-black flex flex-col items-center justify-between p-4 md:p-10">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5">
        <button onClick={toggleMenu} className="text-white p-2">
          <Menu size={24} />
        </button>
        <span className="text-white/50 font-mono text-xs uppercase tracking-widest">
          {currentTone}
        </span>
        <div className="w-8" /> {/* Spacer for balance */}
      </div>

      <div
        className={`absolute inset-0 z-0 bg-cover bg-center grayscale-[30%] transition-all duration-[2000ms] ease-out ${data.bgOpacity}`}
        style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/David_-_The_Death_of_Socrates.jpg/1200px-David_-_The_Death_of_Socrates.jpg')` }}
      />
      <div className={`absolute inset-0 z-1 bg-gradient-to-b ${data.theme} transition-all duration-1000 mix-blend-color-dodge pointer-events-none`} />
      <div className="absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* MESSAGES AREA */}
      <div className="relative z-10 w-full max-w-5xl flex-1 flex flex-col gap-10 lg:gap-14 pt-16 lg:pt-10 overflow-y-auto px-2 md:px-4 custom-scrollbar">

        {/* AI GREETING */}
        <div className={`self-start w-fit max-w-[95%] lg:max-w-[85%] transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className={`bg-black/40 backdrop-blur-3xl border border-white/10 p-6 lg:p-12 rounded-3xl lg:rounded-[4rem] rounded-tl-none shadow-2xl relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${data.theme} opacity-50`} />
            <h2 className={`text-3xl lg:text-6xl font-mono tracking-tighter mb-4 ${data.glow}`}>
              {data.greeting}
            </h2>
            <p className="text-white/80 text-xl lg:text-3xl font-mono tracking-tight leading-tight italic">
              {data.subtext}
            </p>
          </div>
        </div>

        {/* DYNAMIC MESSAGES */}
        {messages.map((msg, idx) => (
          <div key={idx} className={`${msg.role === 'user' ? 'self-end w-fit max-w-[85%] lg:max-w-[70%]' : 'self-start w-fit max-w-[95%] lg:max-w-[85%]'}`}>
            <div className={`
              ${msg.role === 'user'
                ? 'bg-white/5 backdrop-blur-2xl border border-white/10 px-6 lg:px-12 py-3 lg:py-6 rounded-3xl lg:rounded-full'
                : 'bg-black/40 backdrop-blur-3xl border border-white/10 p-6 lg:p-12 rounded-3xl lg:rounded-[4rem] rounded-tl-none relative overflow-hidden'
              }
            `}>
              <p className={`${msg.role === 'user' ? 'text-white/90 text-lg lg:text-2xl font-mono' : 'text-white/80 text-xl lg:text-3xl font-mono italic'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BOX */}
      <div className="relative z-10 w-full max-w-4xl mb-4 lg:mb-6 mt-4">
        <div className={`bg-black/60 backdrop-blur-3xl border-2 ${data.accent} rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-8 flex flex-col gap-4 lg:gap-6`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:ring-0 text-white font-serif italic text-lg lg:text-2xl placeholder-white/20 resize-none h-12 lg:h-14"
            placeholder="Tell me what do you think?"
            disabled={isLoading}
          />
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4 lg:gap-10 text-white/40">
              <div className="flex gap-4 lg:gap-6">
                <button className="hover:text-white"><Paperclip size={20} /></button>
                <button className="hover:text-white"><Mic size={20} /></button>
              </div>
              <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
              <span className={`font-mono text-[10px] lg:text-sm tracking-[0.2em] uppercase ${data.glow} hidden sm:block`}>
                {currentTone}
              </span>
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 lg:p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
            >
              <ChevronUp size={24} />
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden selection:bg-white/20">
      <Sidebar
        currentTone={tone}
        setTone={setTone}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <ChatInterface
        currentTone={tone}
        toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
}