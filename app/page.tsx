'use client';

import { useState } from 'react';

type AcademicTier = 'undergrad' | 'graduate' | 'research';

interface SocraticSession {
  topic: string;
  tier: AcademicTier;
  syllabusContext: string;
  currentStep: number;
  aiResponse: string;
  suggestedResource: {
    title: string;
    platform: string;
    linkText: string;
  };
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tier, setTier] = useState<AcademicTier>('undergrad');
  const [syllabusContext, setSyllabusContext] = useState('');
  const [activeSession, setActiveSession] = useState<SocraticSession | null>(null);
  const [userAnswer, setUserAnswer] = useState('');

  const startSocraticSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    // Simulated intelligent grounding based on tier & topic
    let initialPrompt = "";
    let resource = { title: "MIT OCW 8.04 / 5.60 Lecture Module", platform: "MIT OpenCourseWare", linkText: "Access Precision Lecture Notes" };

    if (tier === 'graduate' || tier === 'research') {
      initialPrompt = `[Graduate Research Calibration] Let us deconstruct "${topic}" from first principles. Given your context: "${syllabusContext || 'Standard advanced framework'}": What is the fundamental Hamiltonian or governing tensor constraint, and where does standard approximation break down?`;
      resource = { title: "Advanced Statistical Mechanics & Boundary Value Problems", platform: "MIT OCW Graduate Course", linkText: "View Derivation & Problem Set" };
    } else {
      initialPrompt = `[Undergrad Engineering Calibration] Let's analyze "${topic}". Before diving into complex calculations, what is the core physical intuition or conservation law governing this system?`;
      resource = { title: "Foundational Engineering Principles & PV/Energy Dynamics", platform: "MIT OpenCourseWare / Targeted Lecture", linkText: "View Precision Lecture Reference" };
    }

    setActiveSession({
      topic,
      tier,
      syllabusContext,
      currentStep: 1,
      aiResponse: initialPrompt,
      suggestedResource: resource
    });
  };

  const submitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !activeSession) return;

    // Simulate Socratic step progression
    const nextStep = activeSession.currentStep + 1;
    let nextResponse = "";

    if (nextStep === 2) {
      nextResponse = `Your logic captures the baseline. Now, let's look at the mathematical formulation or boundary condition. How does changing the intensive parameters alter your state function here?`;
    } else {
      nextResponse = `Excellent synthesis. You've bridged the conceptual intuition with rigorous application. Ready to stress-test this against a boundary-value problem or edge case?`;
    }

    setActiveSession({
      ...activeSession,
      currentStep: nextStep,
      aiResponse: nextResponse
    });
    setUserAnswer('');
  };

  return (
    <div className="flex h-screen bg-[#111914] text-[#e8e4de] font-sans selection:bg-[#526b5d] selection:text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#24352b] p-6 flex flex-col justify-between hidden md:flex bg-[#0a100c] shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3.5 h-3.5 rounded-full bg-[#d4c5b9] shadow-[0_0_12px_rgba(212,197,185,0.4)]" />
            <h1 className="font-bold tracking-[0.2em] text-xs text-[#d4c5b9]">
              POLYMATH OS // SOCRATIC
            </h1>
          </div>
          <nav className="space-y-2 text-sm text-[#9cb0a2]">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1a2b21] text-[#f4f0ec] font-medium border border-[#344d3d] shadow-sm">
              <span>🧠</span> Socratic Engine
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#1a2b21]/40 hover:text-[#f4f0ec] transition">
              <span>📜</span> Curriculum & Source Matcher
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#1a2b21]/40 hover:text-[#f4f0ec] transition">
              <span>🪵</span> Research Archives
            </a>
          </nav>
        </div>
        <div className="text-xs text-[#6e8576] border-t border-[#24352b] pt-4 font-mono space-y-1">
          <p>Target Tier: <span className="text-[#d4c5b9] uppercase">{tier}</span></p>
          <p>Status: <span className="text-[#89a893]">Precision Engine Ready</span></p>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-[#111914] via-[#141f18] to-[#0d1410]">
        {/* Top Navbar */}
        <header className="h-16 border-b border-[#24352b] px-8 flex items-center justify-between bg-[#111914]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest text-[#d4c5b9] uppercase font-mono bg-[#1c2c23] px-3.5 py-1.5 rounded-lg border border-[#364f3e] shadow-sm">
              🎯 STEM Undergrad & Research Socratic Tutor
            </span>
          </div>
          <div className="text-xs text-[#9cb0a2] font-mono">
            Mode: <span className="text-[#d4c5b9]">Active Recall + MIT OCW Precision</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 max-w-4xl w-full mx-auto">
          {!activeSession ? (
            /* Calibration & Setup Form */
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#18261e] to-[#131d17] border border-[#324a3c] shadow-xl">
                <h2 className="text-3xl font-light tracking-tight mb-2 text-[#f4f0ec]">
                  Initialize Socratic Session, Commander.
                </h2>
                <p className="text-[#a8bdae] text-sm leading-relaxed">
                  Specify your topic, academic depth tier, and curriculum notes so the engine can calibrate its difficulty and source exact institutional references.
                </p>
              </div>

              <form onSubmit={startSocraticSession} className="space-y-6 bg-[#16231c] border border-[#324a3c] p-8 rounded-3xl shadow-lg">
                <div>
                  <label className="block text-xs font-bold text-[#d4c5b9] uppercase tracking-wider mb-2">
                    1. Target Topic / Chapter
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Partition Functions in Statistical Mechanics or Maxwell's Equations..."
                    className="w-full bg-[#111914] border border-[#344d3d] rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#d4c5b9] focus:ring-2 focus:ring-[#d4c5b9]/20 transition text-[#f4f0ec] placeholder-[#6b8273]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4c5b9] uppercase tracking-wider mb-2">
                    2. Select Academic Depth Tier
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['undergrad', 'graduate', 'research'] as AcademicTier[]).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTier(t)}
                        className={`py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition border ${
                          tier === t 
                            ? 'bg-[#d4c5b9] text-[#111914] border-[#d4c5b9] font-bold shadow-md' 
                            : 'bg-[#111914] text-[#9cb0a2] border-[#344d3d] hover:border-[#d4c5b9]/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4c5b9] uppercase tracking-wider mb-2">
                    3. Paste Syllabus / Course Notes Excerpt (Optional Context)
                  </label>
                  <textarea
                    rows={3}
                    value={syllabusContext}
                    onChange={(e) => setSyllabusContext(e.target.value)}
                    placeholder="Paste your specific problem statement, lecture excerpt, or syllabus curriculum points here..."
                    className="w-full bg-[#111914] border border-[#344d3d] rounded-2xl p-4 text-sm focus:outline-none focus:border-[#d4c5b9] focus:ring-2 focus:ring-[#d4c5b9]/20 transition text-[#f4f0ec] placeholder-[#6b8273]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d4c5b9] hover:bg-[#e4dcd3] text-[#111914] font-semibold py-4 rounded-2xl text-sm transition shadow-lg active:scale-95 border border-[#bcab9d]"
                >
                  Calibrate & Launch Socratic Tutor 🚀
                </button>
              </form>
            </div>
          ) : (
            /* Active Socratic Tutoring Interface */
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#16231c] border border-[#324a3c] px-6 py-4 rounded-2xl">
                <div>
                  <span className="text-xs text-[#d4c5b9] font-mono uppercase">Active Domain:</span>
                  <h3 className="text-lg font-bold text-[#f4f0ec]">{activeSession.topic}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-[#24352b] text-[#d4c5b9] border border-[#3b5242] px-3 py-1 rounded-lg font-mono uppercase">
                    Tier: {activeSession.tier}
                  </span>
                  <button
                    onClick={() => setActiveSession(null)}
                    className="text-xs text-[#9cb0a2] hover:text-[#f4f0ec] underline font-mono"
                  >
                    Reset Session
                  </button>
                </div>
              </div>

              {/* Precision MIT OCW / Video Resource Box */}
              <div className="bg-[#18261e] border border-[#3b5242] p-5 rounded-2xl flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎓</span>
                  <div>
                    <span className="text-xs font-bold text-[#d4c5b9] uppercase block font-mono">Mapped Source Material:</span>
                    <span className="text-sm text-[#f4f0ec] font-medium">{activeSession.suggestedResource.title}</span>
                  </div>
                </div>
                <span className="text-xs bg-[#d4c5b9] text-[#111914] px-3 py-1.5 rounded-xl font-mono font-semibold shadow-sm">
                  {activeSession.suggestedResource.linkText}
                </span>
              </div>

              {/* Socratic AI Dialogue Card */}
              <div className="bg-[#e8e0d5] text-[#1c2820] border border-[#d4c5b9] p-6 rounded-3xl shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <span className="font-bold uppercase tracking-wider text-xs font-mono text-[#2c3d31]">
                    Socratic Mentor (Gate Step {activeSession.currentStep})
                  </span>
                </div>
                <p className="text-base font-medium leading-relaxed">
                  {activeSession.aiResponse}
                </p>
              </div>

              {/* User Answer Form */}
              <form onSubmit={submitAnswer} className="space-y-4">
                <textarea
                  rows={4}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your structured reasoning, derivation step, or conceptual answer here..."
                  className="w-full bg-[#16231c] border border-[#344d3d] rounded-2xl p-5 text-sm focus:outline-none focus:border-[#d4c5b9] focus:ring-2 focus:ring-[#d4c5b9]/20 transition text-[#f4f0ec] placeholder-[#6b8273] shadow-inner"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#d4c5b9] hover:bg-[#e4dcd3] text-[#111914] font-semibold px-8 py-4 rounded-2xl text-sm transition shadow-lg active:scale-95 border border-[#bcab9d]"
                  >
                    Submit Active Recall Response ⚡
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
