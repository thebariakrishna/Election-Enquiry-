import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Calendar, Filter } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  date?: string;
  status: 'completed' | 'current' | 'upcoming';
  category: 'process' | 'past' | 'future';
}

const steps: TimelineStep[] = [
  // Standard Process
  {
    title: 'Electoral Roll Revision',
    description: 'ECI opens registration window for new voters and updates existing data.',
    date: 'Annual Process',
    status: 'completed',
    category: 'process',
  },
  {
    title: 'Notification & Nominations',
    description: 'Official notification issued. Candidates file their papers with the Returning Officer.',
    date: 'Election - 25 Days',
    status: 'current',
    category: 'process',
  },
  {
    title: 'The Poll (Voting Day)',
    description: 'Voters across the constituency cast their votes using EVMs at polling booths.',
    date: 'The Big Day',
    status: 'upcoming',
    category: 'process',
  },
  // Past Major Events
  {
    title: '2024 General Elections',
    description: 'The largest democratic exercise globally. Resulted in the formation of the 18th Lok Sabha.',
    date: 'June 2024',
    status: 'completed',
    category: 'past',
  },
  {
    title: 'Maharashtra Assembly',
    description: 'Significant state election determining the leadership of India\'s financial hub.',
    date: 'Nov 2024',
    status: 'completed',
    category: 'past',
  },
  // Upcoming
  {
    title: 'Bihar State Assembly',
    description: 'Major upcoming election cycle for the Eastern heartland of India.',
    date: 'Late 2025',
    status: 'upcoming',
    category: 'future',
  },
  {
    title: 'West Bengal Assembly',
    description: 'Crucial state election cycle scheduled for the next major round.',
    date: 'Mid 2026',
    status: 'upcoming',
    category: 'future',
  },
];

interface TimelineProps {
  onEventClick: (query: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onEventClick }) => {
  const [filter, setFilter] = useState<'all' | 'process' | 'past' | 'future'>('process');

  const filteredSteps = steps.filter(s => filter === 'all' || s.category === filter);

  return (
    <div className="py-12" id="timeline-section" role="region" aria-label="Election Timeline">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-16 border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 px-3 py-1 bg-black text-white font-black text-xs uppercase mr-2">
          <Filter className="w-4 h-4" />
          Filter_View
        </div>
        {[
          { id: 'process', label: 'THE_PROCESS' },
          { id: 'past', label: 'RECENT_RESULTS' },
          { id: 'future', label: 'UPCOMING_2025-26' },
          { id: 'all', label: 'SHOW_ALL' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as any)}
            className={`px-4 py-2 text-xs font-black uppercase transition-all border-2 border-transparent ${
              filter === btn.id 
              ? 'bg-red-600 text-white border-black' 
              : 'hover:bg-slate-100 border-slate-100 hover:border-black'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Heavy Connection Line */}
        <div className="absolute left-4 top-0 bottom-0 w-2 bg-black md:left-1/2 md:-ml-1" />
        
        <div className="space-y-16">
          {filteredSteps.map((step, index) => (
            <motion.div 
              key={`${step.title}-${filter}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Boxy Marker */}
              <div className="absolute left-4 md:left-1/2 -ml-4 md:-ml-4 mt-2 w-8 h-8 bg-black border-4 border-white z-10 flex items-center justify-center">
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-white" aria-label="Status: Completed" />
                ) : step.status === 'current' ? (
                  <div className="w-3 h-3 bg-red-600 animate-pulse" aria-label="Status: Current Phase" />
                ) : (
                  <Circle className="w-4 h-4 text-white opacity-20" aria-label="Status: Upcoming" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 md:w-1/2">
                <div className={`pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <button 
                    onClick={() => onEventClick(`Explain the "${step.title}" election event in Indian context: ${step.description}`)}
                    aria-label={`Learn more about ${step.title}`}
                    className="w-full text-left bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-all transform hover:-translate-y-1 focus:ring-4 focus:ring-red-600/20 outline-none"
                  >
                    <span className="text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-3 block">
                      {step.date || 'SCHEDULE PENDING'}
                    </span>
                    <h3 className="text-3xl font-black text-black mb-3 uppercase tracking-tighter italic">{step.title}</h3>
                    <p className="text-slate-600 font-bold uppercase text-sm leading-tight">{step.description}</p>
                    <div className="mt-4 text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-1">
                      [CLICK_TO_ENQUIRE_WITH_AI]
                    </div>
                  </button>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

