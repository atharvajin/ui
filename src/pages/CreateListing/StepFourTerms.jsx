import React, { useState, useMemo } from 'react';

const SUGGESTED_TERMS = {
  'digital-assets': [
    'No refunds once code is revealed',
    'License is non-transferable',
    'Single-user license only',
    'No commercial redistribution',
    'Buyer must verify compatibility before purchase',
  ],
  'services': [
    'Maximum 2 revisions included',
    '100 Rs. cancellation fee',
    'Work begins within 24 hours of payment',
    'Delivery timeline may vary with scope changes',
    'Source files provided on Premium plan only',
  ],
  'physical-goods': [
    'Unboxing video required for returns',
    'Shipping charges non-refundable',
    'Returns accepted within 3 days of delivery',
    'Item sold as-is, no warranty implied',
    'Buyer bears return shipping cost',
  ],
  'events': [
    'Passes are non-refundable after purchase',
    'One entry per pass, no re-entry',
    'ID verification may be required at door',
    'Event may be postponed due to unforeseen circumstances',
    'No recording or livestreaming permitted',
  ],
  'art-craft': [
    'Unboxing video required for returns',
    'Custom orders are non-refundable',
    'Minor colour variations may occur',
    'Returns accepted within 3 days of delivery',
    'Handcrafted items may have slight imperfections',
  ],
};

const DEFAULT_SUGGESTIONS = [
  'Payment secured via escrow until delivery confirmed',
  'Disputes resolved through platform arbitration',
  'Seller must respond within 48 hours of order',
];

const StepFourTerms = ({ formData, setFormData }) => {
  const [termInput, setTermInput] = useState('');

  const suggestions = useMemo(() => {
    return SUGGESTED_TERMS[formData.category] || DEFAULT_SUGGESTIONS;
  }, [formData.category]);

  const terms = formData.customTerms || [];

  const addTerm = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (terms.includes(trimmed)) return; // no duplicates
    setFormData(prev => ({ ...prev, customTerms: [...(prev.customTerms || []), trimmed] }));
    setTermInput('');
  };

  const removeTerm = (index) => {
    setFormData(prev => ({
      ...prev,
      customTerms: prev.customTerms.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTerm(termInput);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up mt-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-serif text-4xl text-on-surface mb-3">Custom Terms & Conditions</h2>
        <p className="text-on-surface-variant font-body text-lg max-w-xl mx-auto">
          Define the rules of your transaction. These will be visible to buyers before they place an order.
        </p>
      </div>

      {/* Escrow Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-emerald-600 mt-0.5 text-[22px]">shield</span>
        <div>
          <h4 className="font-bold text-emerald-900 text-sm mb-0.5">Escrow-Backed Transaction</h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Your T&Cs are reviewed by the buyer before purchase. Funds are held in escrow until both parties confirm successful delivery. Clear terms reduce disputes significantly.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8 flex flex-col gap-8">

        {/* Input Row */}
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">
            Add a Custom Term
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={termInput}
              onChange={(e) => setTermInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Buyer must test before confirming delivery"
              className="flex-1 rounded-xl border border-outline-variant py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-surface"
            />
            <button
              onClick={() => addTerm(termInput)}
              className="px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Term
            </button>
          </div>
        </div>

        {/* Suggested Chips */}
        <div>
          <p className="text-xs font-bold text-outline-variant uppercase tracking-wider mb-3">
            Suggested for {formData.category ? formData.category.replace(/-/g, ' ') : 'your category'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => {
              const alreadyAdded = terms.includes(suggestion);
              return (
                <button
                  key={idx}
                  onClick={() => addTerm(suggestion)}
                  disabled={alreadyAdded}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1.5
                    ${alreadyAdded
                      ? 'border-primary/30 bg-primary-container text-primary cursor-default opacity-70'
                      : 'border-outline-variant/50 bg-surface-container-low text-on-surface-variant hover:border-primary hover:bg-primary-container hover:text-primary cursor-pointer active:scale-95'
                    }`}
                >
                  {alreadyAdded
                    ? <span className="material-symbols-outlined text-[13px]">check</span>
                    : <span className="material-symbols-outlined text-[13px]">add_circle</span>
                  }
                  {suggestion}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-container w-full" />

        {/* Active Terms List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-on-surface">
              Active Terms
              {terms.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary-container text-primary text-xs rounded-full font-bold">
                  {terms.length}
                </span>
              )}
            </h3>
          </div>

          {terms.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-surface-container rounded-xl text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2 block text-outline-variant/60">gavel</span>
              <p className="text-sm font-medium">No terms added yet.</p>
              <p className="text-xs mt-1">Use the input above or click a suggestion to get started.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {terms.map((term, idx) => (
                <li
                  key={idx}
                  className="flex items-start justify-between gap-3 bg-surface-container-lowest border border-surface-container rounded-xl px-4 py-3.5 shadow-[0_1px_4px_rgba(48,51,49,0.04)] group hover:border-outline-variant/50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">check_circle</span>
                    <p className="text-sm text-on-surface leading-relaxed">{term}</p>
                  </div>
                  <button
                    onClick={() => removeTerm(idx)}
                    aria-label="Remove term"
                    className="text-outline-variant hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFourTerms;
