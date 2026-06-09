import React, { useState } from 'react';

const TermsAccordion = ({ terms }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!terms || terms.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-h3 font-headline mb-4">Terms & Conditions</h2>
      <div className="border border-surface-container rounded-xl overflow-hidden bg-white">
        {terms.map((term, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`border-b border-surface-container last:border-b-0`}>
              <button
                className="w-full flex items-center justify-between p-4 text-left focus-visible:outline-none focus-visible:bg-surface-container-low transition-colors hover:bg-surface-container-lowest"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span className="font-medium text-on-surface">{term.title}</span>
                <span className={`material-symbols-outlined text-outline transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="p-4 pt-0 text-on-surface-variant bg-surface-container-lowest">
                  {term.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TermsAccordion;
