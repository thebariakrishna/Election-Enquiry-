/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CivicChat, CivicChatHandle } from './components/CivicChat';
import { Timeline } from './components/Timeline';
import { VotingSteps } from './components/VotingSteps';
import { LiveNewsFeed } from './components/LiveNewsFeed';
import { Vote, ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';

export default function App() {
  const chatRef = useRef<CivicChatHandle>(null);

  const handleStepAction = (query: string) => {
    chatRef.current?.askQuestion(`Can you explain this step in more detail for India: ${query}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-x-hidden p-6 md:p-10">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end border-b-8 border-black pb-6 mb-12">
        <div className="flex flex-col mb-4 md:mb-0">
          <span className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-red-600">Civic Intelligence v1.0</span>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase">
            INDIAN VOTE<br />GUIDE
          </h1>
        </div>
        <div className="text-right w-full md:w-auto">
          <p className="text-sm font-bold uppercase mb-1">General Election Cycle</p>
          <div className="flex items-center justify-end gap-3">
             <p className="text-4xl md:text-5xl font-mono tracking-tighter">PHASE-READY</p>
             <Vote className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Non-Partisan AI Resource</p>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto">
        {/* Assistant Interface Wrapper */}
        <section id="assistant" className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-widest">AI Terminal Online</span>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <CivicChat ref={chatRef} />
            </div>
            
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-all">
                <h3 className="text-4xl font-black leading-none mb-6 italic tracking-tighter uppercase">VOTER<br />CHECKLIST</h3>
                <ul className="space-y-3 text-sm font-bold uppercase">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-black bg-black flex items-center justify-center text-white text-[10px]">X</div>
                    EPIC (Voter ID) / Aadhaar
                  </li>
                  <li className="flex items-center gap-3 text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-300 flex items-center justify-center text-[10px]">X</div>
                    Identity Proof (Passport/DL)
                  </li>
                  <li className="flex items-center gap-3 text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-300"></div>
                    Age Proof (10th Cert/DOB)
                  </li>
                </ul>
                <div className="mt-8 p-4 bg-yellow-400 border-2 border-black transform -rotate-1">
                  <p className="text-[10px] font-black uppercase leading-tight">
                    Notice: Document requirements are strictly enforced by ECI. Use the AI component to verify requirements for your specific state or category (e.g. NRI).
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <button onClick={() => chatRef.current?.askQuestion("How do I register as a first-time voter in India?")} className="w-full text-left p-3 border-2 border-black text-xs font-black uppercase hover:bg-slate-50 transition-colors">
                    [{'>'}] NEW REGISTRATION
                  </button>
                  <button onClick={() => chatRef.current?.askQuestion("How to check name in voter list India?")} className="w-full text-left p-3 border-2 border-black text-xs font-black uppercase hover:bg-slate-50 transition-colors">
                    [{'>'}] SEARCH ELECTORAL ROLL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <div className="border-t-4 border-black pt-20 mb-20">
          <div className="mb-12">
            <h2 className="text-6xl font-black tracking-tighter italic uppercase underline decoration-red-600 decoration-8 underline-offset-8">THE_PROCESS</h2>
          </div>
          <VotingSteps onStepAction={handleStepAction} />
        </div>

        <div className="border-t-4 border-black pt-20 mb-32">
          <div className="mb-12 text-right">
            <h2 className="text-6xl font-black tracking-tighter italic uppercase">Timeline</h2>
            <p className="text-sm font-bold uppercase text-red-600">Standard ECI Election Roadmap</p>
          </div>
          <Timeline onEventClick={handleStepAction} />
        </div>
      </main>

      {/* Live Updates Strip */}
      <div className="max-w-7xl mx-auto mb-10" role="complementary" aria-label="Live Election Dispatches">
        <LiveNewsFeed />
      </div>

      {/* Footer Interface */}
      <footer className="mt-20 border-t-8 border-black pt-8 pb-12 overflow-hidden" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest gap-6">
          <div className="flex items-center gap-4">
            <span className="bg-black text-white px-2 py-1">NON-PARTISAN</span>
            <span>Verified Civic Data / Open Intelligence Project</span>
          </div>
          <div className="flex gap-10">
            <a href="https://voters.eci.gov.in" target="_blank" aria-label="Official Voters Service Portal" className="hover:text-red-600 transition-colors">Voter Service Portal</a>
            <a href="https://eci.gov.in" target="_blank" aria-label="Official Election Commission of India website" className="hover:text-red-600 transition-colors">ECI Official</a>
            <a href="#" className="text-red-600 flex items-center gap-1" aria-label="Real-time system updates">
              <span className="animate-pulse">●</span> LIVE_UPDATES
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


