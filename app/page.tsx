'use client';

import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, input]);
    setInput('');
  };

  return (
    <div className="flex h-screen bg-[#111c16] text-[#e2ded9] font-sans selection:bg-[#4a6b5d] selection:text-white">
      {/* Zen Sidebar */}
      <aside className="w-64 border-r border-[#22352b] p-6 flex flex-col justify-between hidden md:flex bg-[#0b1410]/90 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 rounded-full bg-[#729b79] shadow-[0_0_10px_rgba(114,155,121,0.5)]" />
            <h1 className="font-medium tracking-[0.2em] text-sm text-[#c5d1c6]">
              ZENITH OS
            </h1>
          </div>
          <nav className="space-y-1.5 text-sm text-[#94a399]">
            <a href="#" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#1b2a22] text-[#e2ded9] font-medium border border-[#2c4235]">
              <span>🌲</span> Forest Sanctuary
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#1b2a22]/50 hover:text-[#e2ded9] transition">
              <span>🍵</span> Socratic Tea Room
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#1b2a22]/50 hover:text-[#e2ded9] transition">
              <span>📜</span> Canopy Map
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#1b2a22]/50 hover:text-[#e2ded9] transition">
              <span>🍃</span> Grove Circle
            </a>
          </nav>
        </div>
        <div className="text-xs text-[#526b5d] border-t border-[#22352b] pt-4 font-mono">
          State: <span className="text-[#87a992]">Deep Focus / Mist</span>
        </div>
      </aside>

      {/* Main Sanctuary Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-[#111c16] via-[#0d1611] to-[#090f0c]">
        {/* Top Navbar */}
        <header className="h-16 border-b border-[#22352b] px-8 flex items-center justify-between bg-[#111c16]/50 backdrop-blur-md">
          <h2 className="text-xs uppercase tracking-[0.15em] text-[#7a9485] font-medium">Environment: Silent Canopy</h2>
          <div className="text-xs bg-[#1b2a22] text-[#a3c1b0] border border-[#2c4235] px-3.5 py-1.5 rounded-lg font-mono">
            🌿 Active Recall Mode
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 max-w-3xl w-full mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-light tracking-tight mb-2 text-[#f1efe9]">
              Quiet the noise, Commander.
            </h2>
            <p className="text-[#84998c] text-sm">What single thought or domain shall we cultivate today?</p>
          </div>

          {/* Task Input Box */}
          <form onSubmit={addTask} className="flex gap-3 mb-10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Plant a task (e.g., Explore Thermodynamics)..."
              className="flex-1 bg-[#16241d] border border-[#293e33] rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#527963] transition text-[#f1efe9] placeholder-[#597062] shadow-sm"
            />
            <button
              type="submit"
              className="bg-[#354f3a] hover:bg-[#436449] text-[#e2ded9] font-medium px-6 py-3.5 rounded-xl text-sm transition shadow-md active:scale-95"
            >
              Plant Task
            </button>
          </form>

          {/* Task List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#688574] tracking-widest uppercase">Growing Queue</h3>
            {tasks.length === 0 ? (
              <div className="border border-dashed border-[#22352b] rounded-2xl p-12 text-center text-[#688574] text-sm bg-[#14201a]/40">
                The clearing is calm. Plant your first task above to begin growing.
              </div>
            ) : (
              tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between bg-[#16241d]/70 border border-[#293e33] p-4 rounded-xl text-sm shadow-sm backdrop-blur-sm transition">
                  <span className="text-[#e2ded9]">{task}</span>
                  <span className="text-xs text-[#87a992] bg-[#1f3328] border border-[#2e4d3c] px-3 py-1 rounded-md font-mono">Sprouting</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


  