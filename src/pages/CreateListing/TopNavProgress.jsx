import React from 'react';
import { cn } from '../../utils';

const steps = [
  { id: 1, label: 'Category' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Config' },
  { id: 4, label: 'Terms' },
  { id: 5, label: 'Commission' },
  { id: 6, label: 'Publish' },
];

const TopNavProgress = ({ currentStep, setCurrentStep }) => {
  return (
    <nav className="border-b border-surface-container sticky top-0 bg-surface z-[40] w-full">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="font-serif italic font-medium text-xl">The Curator</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-6 md:gap-12">
           {steps.map(step => (
             <button
               key={step.id}
               onClick={() => setCurrentStep(step.id)}
               className={cn(
                 "flex flex-col items-center gap-1.5 text-xs md:text-sm transition-colors font-medium",
                 currentStep === step.id ? "text-primary" : "text-outline-variant hover:text-on-surface"
               )}
             >
               <div className={cn(
                 "w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors",
                 currentStep === step.id ? "bg-primary text-white" : currentStep > step.id ? "bg-primary-container text-primary" : "bg-surface-container text-outline"
               )}>
                 {currentStep > step.id ? <span className="material-symbols-outlined text-[18px]">check</span> : step.id}
               </div>
               <span className="hidden sm:inline">{step.label}</span>
             </button>
           ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNavProgress;
