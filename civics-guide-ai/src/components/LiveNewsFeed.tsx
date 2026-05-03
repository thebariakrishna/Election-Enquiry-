import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, ExternalLink } from 'lucide-react';

const newsItems = [
  "ECI announces special summary revision of electoral rolls for 2026.",
  "New digital EPIC card downloads available on Voter Helpline App.",
  "Strict vigilance enforced for upcoming State Assembly bye-elections.",
  "National Voters' Day celebrations planned across all polling stations.",
  "Overseas (NRI) voting registration process simplified on NVSP portal.",
  "VVPAT verification awareness drive starts in rural constituencies."
];

export const LiveNewsFeed: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
      <div className="shrink-0 flex items-center gap-2 px-3 py-1 bg-red-600 text-white font-black text-[10px] uppercase">
        <Radio className="w-3 h-3 animate-pulse" />
        LIVE_DISPATCH
      </div>
      <div className="flex-1 overflow-hidden h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="font-bold text-sm uppercase tracking-tight truncate border-l-2 border-slate-200 pl-4"
          >
            {newsItems[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <a 
        href="https://eci.gov.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="View official ECI news portal"
        className="shrink-0 text-slate-400 hover:text-black transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};
