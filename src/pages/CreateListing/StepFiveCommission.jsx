import React from 'react';

const StepFiveCommission = ({ formData, setFormData }) => {
  const agentEnabled = formData.allowAgents || false;
  const commission = formData.commissionPct || '';

  const toggleAgent = () => {
    setFormData(prev => ({
      ...prev,
      allowAgents: !prev.allowAgents,
      ...(prev.allowAgents ? { commissionPct: '' } : {})
    }));
  };

  const handleCommissionChange = (e) => {
    let val = e.target.value;
    // Clamp between 1 and 50
    if (val !== '' && (Number(val) < 1 || Number(val) > 50)) return;
    setFormData(prev => ({ ...prev, commissionPct: val }));
  };

  // Derived earnings preview
  const basePrice = parseFloat(formData.singlePrice) || 0;
  const pct = parseFloat(commission) || 0;
  const agentEarning = basePrice && pct ? ((basePrice * pct) / 100).toFixed(2) : null;

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up mt-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-serif text-4xl text-on-surface mb-3">Sales Agent Commission</h2>
        <p className="text-on-surface-variant font-body text-lg max-w-xl mx-auto">
          Supercharge your reach by letting verified agents promote and close this listing on your behalf.
        </p>
      </div>

      {/* Toggle Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8 flex flex-col gap-6">

        {/* Main Toggle Row */}
        <label
          htmlFor="agent-toggle"
          className="flex items-center justify-between gap-4 cursor-pointer group"
        >
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-tertiary-container rounded-xl shrink-0">
              <span className="material-symbols-outlined text-tertiary text-[24px]">campaign</span>
            </div>
            <div>
              <p className="font-bold text-on-surface text-base mb-0.5">Allow Sales Agents to promote this listing</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Verified agents on the platform can share a unique referral link. You only pay commission when a sale is confirmed through escrow.
              </p>
            </div>
          </div>
          {/* Toggle Switch */}
          <div className="relative inline-block w-14 shrink-0 select-none">
            <input
              type="checkbox"
              id="agent-toggle"
              checked={agentEnabled}
              onChange={toggleAgent}
              className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 border-surface-container appearance-none cursor-pointer transition-transform duration-200 ease-in-out peer checked:bg-primary checked:border-primary checked:translate-x-full"
            />
            <div className="toggle-label block overflow-hidden h-7 rounded-full bg-surface-container peer-checked:bg-primary/30 transition-colors duration-200" />
          </div>
        </label>

        {/* Expandable Commission Section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${agentEnabled ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-t border-surface-container pt-6 flex flex-col gap-6">

            {/* Commission Input */}
            <div className="max-w-sm">
              <label className="block text-sm font-bold text-on-surface mb-2">
                Commission Percentage (%)
              </label>
              <p className="text-xs text-on-surface-variant mb-3">
                Set a fair commission between 1% and 50%. Agents are more motivated at 10%+.
              </p>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={commission}
                  onChange={handleCommissionChange}
                  placeholder="e.g. 15"
                  className="w-full rounded-xl border border-outline-variant py-3 pl-4 pr-12 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface text-lg font-bold bg-surface"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-lg">%</span>
              </div>
            </div>

            {/* Quick-Pick Chips */}
            <div>
              <p className="text-xs font-bold text-outline-variant uppercase tracking-wider mb-2">Quick Select</p>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 20, 25].map(p => (
                  <button
                    key={p}
                    onClick={() => setFormData(prev => ({ ...prev, commissionPct: String(p) }))}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-200
                      ${String(p) === String(commission)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface-container-low border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary'
                      }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* Earnings Preview */}
            {agentEarning && (
              <div className="p-5 bg-tertiary-container rounded-xl border border-tertiary-fixed-dim flex items-center gap-4">
                <div className="p-2 bg-white/50 rounded-lg">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">monetization_on</span>
                </div>
                <div>
                  <p className="text-xs text-on-tertiary-container font-bold uppercase tracking-wider mb-0.5">Agent Earning Preview</p>
                  <p className="text-on-tertiary-container text-sm">
                    At {pct}% of ₹{Number(formData.singlePrice).toLocaleString('en-IN')}, an agent earns{' '}
                    <span className="font-bold text-base">₹{Number(agentEarning).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span> per successful sale.
                  </p>
                </div>
              </div>
            )}

            {/* Explainer Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'link', title: 'Unique Agent Link', desc: 'Each agent gets a traceable referral URL.' },
                { icon: 'shield', title: 'Escrow-Secured', desc: 'Commission released only after confirmed delivery.' },
                { icon: 'supervisor_account', title: 'Verified Agents', desc: 'Only KYC-verified agents can participate.' },
              ].map((item) => (
                <div key={item.icon} className="flex items-start gap-3 p-4 bg-surface-container-lowest rounded-xl border border-surface-container">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface mb-0.5">{item.title}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepFiveCommission;
