import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import landingBg from '../assets/wp4358269.jpg';
import historyBg from '../assets/pokla.jpg';

/**
 * LANDING PAGE COMPONENT
 * Features a multi-view cinematic experience.
 * View 1: School of Athens (Landing)
 * View 2: Destruction (About)
 * View 3: History (Philosophical Library)
 */
const LandingPage = ({ onStart }) => {
    const [view, setView] = useState('landing'); // 'landing' | 'about' | 'history'

    // Common Pill Button Style
    const PillButton = ({ onClick, children, className = "" }) => (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`PillButton clicked: ${children}`);
                onClick();
            }}
            className={`px-10 py-3 rounded-full bg-white/10 border border-white/20 font-classic-heading text-[11px] tracking-[0.3em] text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer backdrop-blur-md shadow-2xl uppercase relative z-[100] ${className}`}
        >
            {children}
        </button>
    );

    const handleSetView = (newView) => {
        console.log(`Setting view to: ${newView}`);
        setView(newView);
    };

    const renderLanding = () => (
        <div className="relative h-screen w-full overflow-hidden flex flex-col animate-fade-in bg-[#050505]">
            {/* --- BACKGROUND (Greek Philosophers) --- */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center animate-slow-drift opacity-70 scale-110"
                style={{ backgroundImage: `url(${landingBg})` }}
            />

            <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

            {/* --- NAVIGATION (Upper Right) --- */}
            <nav className="relative z-[100] flex justify-end gap-12 p-8 md:p-12">
                <button
                    type="button"
                    onClick={() => handleSetView('about')}
                    className="font-classic-heading text-sm tracking-[0.2em] text-white/40 hover:text-white transition-opacity uppercase cursor-pointer bg-transparent border-none outline-none z-[100] px-6 py-3"
                >
                    about
                </button>
                <button
                    type="button"
                    onClick={() => handleSetView('history')}
                    className="font-classic-heading text-sm tracking-[0.2em] text-white/40 hover:text-white transition-opacity uppercase cursor-pointer bg-transparent border-none outline-none z-[100] px-6 py-3"
                >
                    history
                </button>
            </nav>

            {/* --- HERO CONTENT --- */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
                <div className="max-w-4xl space-y-12">
                    <p className="font-classic-body text-2xl md:text-5xl leading-tight tracking-wide text-white/90 font-light italic drop-shadow-2xl">
                        "The systematic, rational, and critical study of fundamental questions regarding existence, knowledge, ethics, reason, and reality"
                    </p>

                    <div className="space-y-4">
                        <h2 className="font-classic-heading text-xl md:text-2xl tracking-[0.5em] text-white/40 uppercase">
                            Welcome to Philosopher-AI
                        </h2>
                        <div className="h-[1px] w-24 bg-white/20 mx-auto" />
                    </div>

                    <button
                        type="button"
                        onClick={onStart}
                        className="group relative px-12 py-5 bg-white/5 border border-white/20 rounded-full font-classic-heading tracking-[0.3em] overflow-hidden transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 cursor-pointer text-white z-[100]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            GET STARTED
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                </div>
            </main>
        </div>
    );

    const renderAbout = () => (
        <div className="relative h-screen w-full overflow-hidden flex flex-col animate-zoom-in bg-[#080808]">
            {/* --- BACKGROUND (Destruction) --- */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center animate-slow-drift opacity-80 scale-110"
                style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/6/64/Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg')" }}
            />

            <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            {/* --- BACK BUTTON (Top Left) --- */}
            <div className="relative z-[100] p-8 md:p-12 flex justify-start">
                <PillButton onClick={() => handleSetView('landing')}>
                    BACK
                </PillButton>
            </div>

            {/* --- PHILOSOPHY OF AI CONTENT --- */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
                <div className="max-w-5xl space-y-12">
                    {/* Content Bubble (Matched to Chat Style) */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/20 p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden group">
                        {/* Subtle Inner Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent opacity-40" />

                        <p className="font-classic-body text-xl md:text-4xl leading-relaxed tracking-wide text-white/95 font-light">
                            Philosophy of AI explores the deep questions that arise from artificial intelligence message.
                            It asks what it means for a machine to "think," whether AI can truly understand
                            or only imitate intelligence, and how human values, ethics, and responsibility should guide AI development.
                            This field also examines the impact of AI on human identity, freedom, work, and decision-making,
                            challenging us to reflect on the relationship between human reason and machine intelligence in the modern world.
                        </p>
                    </div>

                    {/* --- NEXT BUTTON (Bottom Centered) --- */}
                    <div className="flex justify-center relative z-[100]">
                        <PillButton onClick={onStart} className="px-16 py-4 text-sm scale-110">
                            NEXT
                        </PillButton>
                    </div>
                </div>
            </main>
        </div>
    );

    const renderHistory = () => (
        <div className="relative h-screen w-full overflow-hidden flex flex-col animate-zoom-in bg-[#0a0a0a]">
            {/* --- BACKGROUND (Philosophical History) --- */}
            <div
                className="absolute inset-0 z-0 opacity-80 bg-cover bg-center animate-slow-drift scale-110"
                style={{ backgroundImage: `url(${historyBg})` }}
            />

            {/* Greek Meander Border (Top & Bottom Overlay) */}
            <div className="absolute top-0 left-0 w-full h-12 md:h-16 z-1 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Greek_Meander_Border.svg')] bg-[length:80px_auto] repeat-x" />
            <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 z-1 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Greek_Meander_Border.svg')] bg-[length:80px_auto] repeat-x rotate-180" />

            <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

            {/* --- BACK BUTTON (Top Left) --- */}
            <div className="relative z-[100] p-8 md:p-12 flex justify-start">
                <PillButton onClick={() => handleSetView('landing')}>
                    BACK
                </PillButton>
            </div>

            {/* --- HISTORY CONTENT --- */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
                <div className="max-w-5xl space-y-12">
                    {/* Content Bubble (Matched to Chat Style) */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/20 p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden group">
                        {/* Subtle Inner Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent opacity-40" />

                        <p className="font-classic-body text-lg md:text-3xl leading-relaxed tracking-wide text-white/95 font-light uppercase">
                            The philosophy of AI traces back to ancient ideas about thinking and logic from philosophers like Plato and Aristotle, developed further by thinkers such as Descartes and Leibniz, who believed reasoning could be mechanical. In the 20th century, Alan Turing sparked modern debates by asking if machines can think. As AI advanced, philosophers debated machine understanding and ethics, leading today to discussions about responsibility, consciousness, and AI's impact on human life.
                        </p>
                    </div>

                    {/* --- NEXT BUTTON (Bottom Centered) --- */}
                    <div className="flex justify-center relative z-[100]">
                        <PillButton onClick={onStart} className="px-16 py-4 text-sm scale-110">
                            NEXT
                        </PillButton>
                    </div>
                </div>
            </main>
        </div>
    );

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white/20 font-classic-body">
            {view === 'landing' && renderLanding()}
            {view === 'about' && renderAbout()}
            {view === 'history' && renderHistory()}

            {/* Subtle Grain Overlay */}
            <div className="absolute inset-0 z-2 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default LandingPage;
