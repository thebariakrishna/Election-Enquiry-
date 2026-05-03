import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, UserCheck, MapPin, Send } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList />,
    title: "Verify Identity",
    desc: "Check if you have a valid EPIC (Voter ID) card and your name is in the Electoral Roll.",
    id: "step-eligibility",
    details: "Visit voters.eci.gov.in or use the Voter Helpline App to search for your name in the National Electoral Roll. If not found, fill Form 6 to register."
  },
  {
    icon: <UserCheck />,
    title: "Register/Update",
    desc: "Register as a new voter or update your details on the National Voters Service Portal (NVSP).",
    id: "step-register",
    details: "New citizens aged 18+ can register online. You'll need proof of age (Aadhaar/Passport) and proof of residence. The BLO (Booth Level Officer) will verify your details."
  },
  {
    icon: <MapPin />,
    title: "Locate Booth",
    desc: "Find your specific polling station and booth number before the election day.",
    id: "step-locate",
    details: "Each area is assigned a specific polling booth. Use your EPIC number on the ECI portal to find your exact location, serial number, and booth officer contact."
  },
  {
    icon: <Send />,
    title: "The EVM Process",
    desc: "Understand how to use Electronic Voting Machines (EVM) and check the VVPAT slip.",
    id: "step-vote",
    details: "At the booth, identity is checked first. Then you press the button next to your candidate on the EVM. Verify the VVPAT slip that stays visible for 7 seconds."
  }
];

interface VotingStepsProps {
  onStepAction: (query: string) => void;
}

export const VotingSteps: React.FC<VotingStepsProps> = ({ onStepAction }) => {
  return (
    <div className="py-16" id="steps-container">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              id={step.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-all group"
            >
              <div className="mb-8 p-6 bg-slate-100 border-2 border-black inline-block group-hover:bg-red-600 group-hover:text-white transition-colors">
                <div className="w-8 h-8 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter italic">{step.title}</h3>
              <p className="text-slate-600 font-bold uppercase text-xs leading-tight mb-8">
                {step.desc}
              </p>
              <div className="pt-6 border-t-2 border-black flex items-center justify-between gap-2">
                <button 
                  onClick={() => onStepAction(step.details)}
                  className="flex-1 bg-black text-white px-3 py-2 text-[10px] font-black uppercase hover:bg-red-600 transition-colors"
                >
                  ASK AI
                </button>
                <a 
                  href="https://voters.eci.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-black text-center px-3 py-2 text-[10px] font-black uppercase hover:bg-slate-100 transition-colors"
                >
                  PORTAL
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


