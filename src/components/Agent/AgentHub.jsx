import React from 'react';
import { useAuth } from '../../context/useAuth';
import { activeLinks, conversionHistory, summary, tierConfig } from '../../data/agent/affiliateData';
import TierProgressCard from './TierProgressCard';
import MetricsGrid from './MetricsGrid';
import LinkGeneratorWidget from './LinkGeneratorWidget';
import CampaignTable from './CampaignTable';

const AgentHub = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')?.[0] || 'Agent';

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Agent Hub</p>
            <h1 className="font-serif text-2xl text-on-surface leading-tight">Welcome back, {firstName}</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Build referral momentum, monitor escrow-protected commissions, and level up your tier.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            Verified Sales Agent
          </span>
        </div>
      </section>

      <TierProgressCard summary={summary} tierConfig={tierConfig} />
      <MetricsGrid summary={summary} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5">
          <LinkGeneratorWidget defaultUrl={activeLinks[0]?.sourceUrl || ''} referralCode={summary.referralCode} />
        </div>
        <div className="xl:col-span-7 bg-white rounded-2xl border border-surface-container p-5 shadow-[0_2px_8px_rgba(48,51,49,0.04)]">
          <h3 className="font-bold text-on-surface">High-Conversion Playbook</h3>
          <p className="text-xs text-on-surface-variant mt-1 mb-4">
            Focus where trust and urgency are highest to keep conversion velocity strong.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: 'bolt',
                title: 'Digital Assets',
                sub: 'Fast decision cycles and lower buyer hesitation.',
              },
              {
                icon: 'verified_user',
                title: 'Escrow Clarity',
                sub: 'Explain that commission unlocks after buyer confirmation.',
              },
              {
                icon: 'schedule',
                title: '48h Follow-up',
                sub: 'Nudge interested leads before intent cools down.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-container bg-surface-container-lowest p-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                </div>
                <p className="text-sm font-bold text-on-surface">{item.title}</p>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CampaignTable activeLinks={activeLinks} conversionHistory={conversionHistory} />
    </div>
  );
};

export default AgentHub;

